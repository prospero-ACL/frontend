import { Button, FileButton, Group, Modal, Slider, Stack, Text } from '@mantine/core';
import { DocumentScope } from '@/shared/dto/document';
import { scopeMarks, useUploadModal } from '../hooks/use-upload-modal';

export type UploadModalProps = {
  opened: boolean;
  onClose: () => void;
  onSubmit: (file: File, scope: DocumentScope) => Promise<void>;
  isLoading: boolean;
};

export default function UploadModal({ opened, onClose, onSubmit, isLoading }: UploadModalProps) {
  const {
    selectedFile,
    setSelectedFile,
    scopeValue,
    error,
    handleClose,
    handleSubmit,
    handleScopeChange,
  } = useUploadModal({ onSubmit, onClose });

  return (
    <Modal opened={opened} onClose={handleClose} title="Upload document" centered>
      <Stack gap="md" h={200} justify="space-evenly" align="center">
        <Slider
          miw={200}
          min={0}
          max={100}
          step={50}
          restrictToMarks
          marks={scopeMarks}
          value={scopeValue}
          onChange={handleScopeChange}
          label={(value) => scopeMarks.find((mark) => mark.value === value)!.label.toLowerCase()}
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
          <Button onClick={handleSubmit} disabled={!selectedFile || isLoading} loading={isLoading}>
            OK
          </Button>
          <Button variant="default" onClick={handleClose}>
            Cancel
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
