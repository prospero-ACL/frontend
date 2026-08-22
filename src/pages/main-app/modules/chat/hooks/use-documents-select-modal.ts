import { useState } from 'react';

export type UseDocumentsSelectModalArgs = {
  onConfirm: (documentIds: Array<string>) => void;
  onClose: () => void;
};

export function useDocumentsSelectModal({ onConfirm, onClose }: UseDocumentsSelectModalArgs) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  function toggleDocument(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function handleClose() {
    setSelectedIds(new Set());
    onClose();
  }

  function handleConfirm() {
    onConfirm(Array.from(selectedIds));
    handleClose();
  }

  return {
    selectedIds,
    toggleDocument,
    handleClose,
    handleConfirm,
  };
}
