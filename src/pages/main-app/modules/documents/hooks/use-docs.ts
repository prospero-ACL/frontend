import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import api from '@/config/api';
import { useAppSelector } from '@/config/store';
import { DocumentScope, UploadDocument } from '@/shared/dto/document';

export function useDocs() {
  const user = useAppSelector((state) => state.auth.user);

  const [uploadText] = api.useUploadUserDocumentMutation();
  const { data, isLoading: isGetDocsLoading } = api.useGetUserDocumentsQuery(user!.id);
  const docs = data || [];
  const [isPdfInputLoading, setIsPdfInputLoading] = useState(false);
  const [isUploadModalOpened, { open: openUploadModal, close: closeUploadModal }] =
    useDisclosure(false);

  async function handleUpload(file: File, scope: DocumentScope) {
    setIsPdfInputLoading(true);
    try {
      const payload: UploadDocument = {
        file,
        userId: user!.id,
        scope,
      };
      await uploadText(payload).unwrap();
    } finally {
      setIsPdfInputLoading(false);
    }
  }
  const isLoading = isPdfInputLoading || isGetDocsLoading;
  return {
    docs,
    isLoading,
    handleUpload,
    isUploadModalOpened,
    openUploadModal,
    closeUploadModal,
  };
}
