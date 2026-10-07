import { useState } from 'react';
import { BOOK_POSITIONS, BookPosition, TrilogyUpload } from '@/shared/dto/document';

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

export type UseUploadModalArgs = {
  onSubmit: (upload: TrilogyUpload) => Promise<void>;
  onClose: () => void;
};

export function useUploadModal({ onSubmit, onClose }: UseUploadModalArgs) {
  const [trilogyName, setTrilogyName] = useState('');
  const [books, setBooks] = useState<BookFiles>(EMPTY_BOOKS);
  const [error, setError] = useState<string | null>(null);

  const canSubmit =
    trilogyName.trim().length > 0 && BOOK_POSITIONS.every((position) => books[position]);

  function setBook(position: BookPosition, file: File | null) {
    setBooks((current) => ({ ...current, [position]: file }));
  }

  function handleClose() {
    setTrilogyName('');
    setBooks(EMPTY_BOOKS);
    setError(null);
    onClose();
  }

  async function handleSubmit() {
    if (!canSubmit) {
      return;
    }
    setError(null);
    try {
      await onSubmit({
        trilogyName: trilogyName.trim(),
        books: BOOK_POSITIONS.map((position) => ({ position, file: books[position]! })),
      });
      handleClose();
    } catch (err) {
      setError(toErrorMessage(err));
    }
  }

  return {
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
