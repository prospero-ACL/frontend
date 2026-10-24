import {
  Button,
  FileInput,
  Group,
  LoadingOverlay,
  Modal,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { BOOK_POSITIONS } from '@/shared/dto/document';
import { useUploadModal } from '../hooks/use-upload-modal';

export default function UploadModal() {
  const {
    opened,
    isLoading,
    trilogyName,
    setTrilogyName,
    books,
    setBook,
    canSubmit,
    error,
    handleClose,
    handleSubmit,
  } = useUploadModal();

  return (
    <Modal opened={opened} onClose={handleClose} title="Upload trilogy" centered>
      <Stack gap="md" pos="relative">
        <LoadingOverlay visible={isLoading} />
        <TextInput
          label="Trilogy title"
          placeholder="The Lord of the Rings"
          required
          value={trilogyName}
          onChange={(event) => setTrilogyName(event.currentTarget.value)}
        />
        {/* The position decides the clearance needed to read a book: 1 plebian, 2 eques, 3 patrician */}
        {BOOK_POSITIONS.map((position) => (
          <FileInput
            key={position}
            label={`Book ${position}`}
            placeholder="Select PDF"
            accept="application/pdf"
            required
            clearable
            value={books[position]}
            onChange={(file) => setBook(position, file)}
          />
        ))}
        {error && (
          <Text size="sm" c="red">
            {error}
          </Text>
        )}
        <Group justify="flex-end">
          <Button onClick={handleSubmit} disabled={!canSubmit}>
            Upload
          </Button>
          <Button variant="default" onClick={handleClose}>
            Cancel
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
