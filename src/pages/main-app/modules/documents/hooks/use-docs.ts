import { useState } from 'react';
import api from '@/config/api';
import { useAppSelector } from '@/config/store';
import { Document, DocumentScope, UploadDocument } from '@/shared/dto/document';
import { extractTextFromPdf } from '@/shared/utils/pdf-parser';

export function useDocs() {
  const dummyDocs: Array<Document> = [
    { name: 'test', uploadedAt: '2010-12-11' },
    { name: 'test1', uploadedAt: '2010-12-12' },
    { name: 'test2', uploadedAt: '2020-12-12' },
  ];
  const user = useAppSelector((state) => state.auth.user);

  const [uploadText] = api.useUploadUserDocumentMutation();
  const { data, isLoading: isGetDocsLoading } = api.useGetUserDocumentsQuery(user!.id);
  const docs = data || [];
  const [isPdfInputLoading, setIsPdfInputLoading] = useState(false);

  async function handleUpload(file: File, scope: DocumentScope) {
    setIsPdfInputLoading(true);
    try {
      const extractedText = await extractTextFromPdf(file);
      const payload: UploadDocument = {
        name: file.name,
        text: extractedText,
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
    dummyDocs,
    handleUpload,
  };
}
