import { useState } from 'react';
import { DocumentScope } from '@/shared/dto/document';

export const scopeMarks: Array<{ value: number; label: DocumentScope }> = [
  { value: 0, label: 'PUBLIC' },
  { value: 50, label: 'RESTRICTED' },
  { value: 100, label: 'ELEVATED' },
];

function scopeToValue(scope: DocumentScope) {
  return scopeMarks.find((mark) => mark.label === scope)!.value;
}

function valueToScope(value: number) {
  return scopeMarks.find((mark) => mark.value === value)!.label;
}

export type UseUploadModalArgs = {
  onSubmit: (file: File, scope: DocumentScope) => Promise<void>;
  onClose: () => void;
};

export function useUploadModal({ onSubmit, onClose }: UseUploadModalArgs) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [scope, setScope] = useState<DocumentScope>('PUBLIC');
  const [error, setError] = useState<string | null>(null);

  function handleClose() {
    setSelectedFile(null);
    setScope('PUBLIC');
    setError(null);
    onClose();
  }

  async function handleSubmit() {
    if (!selectedFile) {
      return;
    }
    setError(null);
    try {
      await onSubmit(selectedFile, scope);
      handleClose();
    } catch {
      setError('Upload failed. Please try again.');
    }
  }

  function handleScopeChange(value: number) {
    setScope(valueToScope(value));
  }

  return {
    selectedFile,
    setSelectedFile,
    scope,
    scopeValue: scopeToValue(scope),
    error,
    handleClose,
    handleSubmit,
    handleScopeChange,
  };
}
