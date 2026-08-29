import { useForm } from '@mantine/form';

export type DocumentsSelectFormValues = {
  selectedIds: Record<string, boolean>;
};

export type UseDocumentsSelectModalArgs = {
  onConfirm: (documentIds: Array<string>) => void;
  onClose: () => void;
};

export function useDocumentsSelectModal({ onConfirm, onClose }: UseDocumentsSelectModalArgs) {
  const form = useForm<DocumentsSelectFormValues>({
    initialValues: { selectedIds: {} },
  });

  const selectedIds = Object.entries(form.values.selectedIds)
    .filter(([, checked]) => checked)
    .map(([id]) => id);

  function handleClose() {
    form.reset();
    onClose();
  }

  function handleConfirm() {
    onConfirm(selectedIds);
    handleClose();
  }

  return {
    form,
    selectedIds,
    handleClose,
    handleConfirm,
  };
}
