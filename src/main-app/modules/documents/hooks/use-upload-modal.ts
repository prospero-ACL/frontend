import { useEffect, useState } from 'react';
import api from '@/config/api';
import { closeModal } from '@/config/reducers/modals.reducer';
import { useAppDispatch, useAppSelector } from '@/config/store';
import { BOOK_POSITIONS, BookPosition } from '@/shared/dto/document';
import { useModal } from '@/shared/hooks/use-modal';
import { UPLOAD_TRILOGY_CACHE_KEY } from './use-docs';

type BookFiles = Record<BookPosition, File | null>;

const EMPTY_BOOKS: BookFiles = { 1: null, 2: null, 3: null };

function toErrorMessage(err: unknown): string {
  if (err && typeof err === 'object' && 'status' in err) {
    const { status, data } = err as { status?: number; data?: unknown };
    if (status === 413) {
      return 'The files are too large to upload.';
    }
    // 400 / 403 / 422 carry a human-readable reason from the backend
    if (typeof data === 'string' && data.trim()) {
      return data;
    }
  }
  return 'Upload failed. Please try again.';
}

export function useUploadModal() {
  const dispatch = useAppDispatch();
  const { opened, close } = useModal('uploadTrilogy');
  const isLoading = useAppSelector((state) => state.loading.isLoading);
  const [uploadTrilogy] = api.useUploadTrilogyMutation({ fixedCacheKey: UPLOAD_TRILOGY_CACHE_KEY });

  const [trilogyName, setTrilogyName] = useState('');
  const [books, setBooks] = useState<BookFiles>(EMPTY_BOOKS);
  const [error, setError] = useState<string | null>(null);

  // Leaving the page must not leave the modal open for the next visit.
  useEffect(() => {
    return () => {
      dispatch(closeModal('uploadTrilogy'));
    };
  }, [dispatch]);

  const canSubmit =
    trilogyName.trim().length > 0 && BOOK_POSITIONS.every((position) => books[position]);

  function setBook(position: BookPosition, file: File | null) {
    setBooks((current) => ({ ...current, [position]: file }));
  }

  function handleClose() {
    setTrilogyName('');
    setBooks(EMPTY_BOOKS);
    setError(null);
    close();
  }

  async function handleSubmit() {
    if (!canSubmit) {
      return;
    }
    setError(null);
    try {
      await uploadTrilogy({
        trilogyName: trilogyName.trim(),
        books: BOOK_POSITIONS.map((position) => ({ position, file: books[position]! })),
      }).unwrap();
      handleClose();
    } catch (err) {
      setError(toErrorMessage(err));
    }
  }

  return {
    opened,
    isLoading,
    trilogyName,
    setTrilogyName,
    books,
    setBook,
    canSubmit,
    error,
    handleClose,
    handleSubmit,
  };
}
