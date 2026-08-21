import { Button, FileButton, Group, Modal, Slider, Stack, Text } from '@mantine/core';
import { useState } from 'react';
import { DocumentScope } from '@/shared/dto/document';

const scopeMarks: Array<{ value: number; label: DocumentScope }> = [
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

export type UploadModalProps = {
  opened: boolean;
  onClose: () => void;
  onSubmit: (file: File, scope: DocumentScope) => Promise<void>;
  isLoading: boolean;
};

export default function UploadModal({ opened, onClose, onSubmit, isLoading }: UploadModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [scope, setScope] = useState<DocumentScope>('PUBLIC');
  const [error, setError] = useState<string | null>(null);

  const handleClose = () => {
    setSelectedFile(null);
    setScope('PUBLIC');
    setError(null);
    onClose();
  };

  const handleSubmit = async () => {
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
  };

  return (
    <Modal opened={opened} onClose={handleClose} title="Upload document" centered>
      <Stack>
        <Slider
          min={0}
          max={100}
          step={50}
          restrictToMarks
          marks={scopeMarks}
          value={scopeToValue(scope)}
          onChange={(value) => setScope(valueToScope(value))}
          label={(value) => valueToScope(value)}
        />
        <Group>
          <FileButton onChange={setSelectedFile} accept="application/pdf">
            {(props) => <Button {...props}>Select file</Button>}
          </FileButton>
          <Text size="sm">{selectedFile?.name ?? 'No file selected'}</Text>
        </Group>
        {error && (
          <Text size="sm" c="red">
            {error}
          </Text>
        )}
        <Group justify="flex-end">
          <Button variant="default" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!selectedFile || isLoading} loading={isLoading}>
            OK
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
