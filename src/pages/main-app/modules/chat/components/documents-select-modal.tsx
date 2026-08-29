import { Button, Group, Modal } from '@mantine/core';
import { Document } from '@/shared/dto/document';
import { useDocumentsSelectModal } from '../hooks/use-documents-select-modal';
import DocumentsSelectTable from './documents-select-table';

export type DocumentsSelectModalProps = {
  opened: boolean;
  onClose: () => void;
  onConfirm: (documentIds: Array<string>) => void;
  documents: Array<Document>;
};

export default function DocumentsSelectModal({
  opened,
  onClose,
  onConfirm,
  documents,
}: DocumentsSelectModalProps) {
  const { form, selectedIds, handleClose, handleConfirm } = useDocumentsSelectModal({
    onConfirm,
    onClose,
  });

  return (
    <Modal opened={opened} onClose={handleClose} title="Select documents" centered>
      <DocumentsSelectTable documents={documents} form={form} />
      <Group justify="flex-end" mt="md">
        <Button onClick={handleConfirm} disabled={selectedIds.length === 0}>
          OK
        </Button>
        <Button variant="default" onClick={handleClose}>
          Cancel
        </Button>
      </Group>
    </Modal>
  );
}
