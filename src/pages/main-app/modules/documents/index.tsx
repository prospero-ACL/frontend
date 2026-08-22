import { Button, LoadingOverlay, Stack, Text } from '@mantine/core';
import Table from './components/table';
import UploadModal from './components/upload-modal';
import { useDocs } from './hooks/use-docs';

export default function Docs() {
  const { handleUpload, isLoading, docs, isUploadModalOpened, openUploadModal, closeUploadModal } =
    useDocs();

  return (
    <Stack pos="relative">
      <LoadingOverlay visible={isLoading} />
      <Text>Docs</Text>
      <Table userDocs={docs} />
      <Button onClick={openUploadModal} disabled={isLoading}>
        Upload document
      </Button>
      <UploadModal
        opened={isUploadModalOpened}
        onClose={closeUploadModal}
        onSubmit={handleUpload}
        isLoading={isLoading}
      />
    </Stack>
  );
}
