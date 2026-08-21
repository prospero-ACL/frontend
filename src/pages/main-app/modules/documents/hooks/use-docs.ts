import { useState } from 'react';
import api from '@/config/api';
import { useAppSelector } from '@/config/store';
import { Document, UploadDocument } from '@/shared/dto/document';
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

  async function handleFile(file: File | null) {
    if (!file) return;
    setIsPdfInputLoading(true);
    console.log('file from use state', file);
    try {
      const extractedText = await extractTextFromPdf(file);
      const payload: UploadDocument = {
        name: file.name,
        text: extractedText,
        userId: user!.id,
      };
      console.log('payload', payload);
      uploadText(payload);
    } catch (error) {
      console.error(error);
    } finally {
      setIsPdfInputLoading(false);
    }
  }
  const isLoading = isPdfInputLoading || isGetDocsLoading;
  return {
    docs,
    isLoading,
    dummyDocs,
    handleFile,
  };
}
