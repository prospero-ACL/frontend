import { Button, LoadingOverlay, Stack, Text } from '@mantine/core';
import { useAppSelector } from '@/config/store';
import Table from './components/table';
import UploadModal from './components/upload-modal';
import { useDocs } from './hooks/use-docs';

export default function Docs() {
  const { handleUpload, docs, isUploadModalOpened, openUploadModal, closeUploadModal } = useDocs();
  const isLoading = useAppSelector((state) => state.loading.isLoading);

  return (
    <Stack pos="relative">
      <LoadingOverlay visible={isLoading} />
      <Text>Docs</Text>
      <Table userDocs={docs} />
      <Button onClick={openUploadModal}>Upload document</Button>
      <UploadModal
        isLoading={isLoading}
        opened={isUploadModalOpened}
        onClose={closeUploadModal}
        onSubmit={handleUpload}
      />
    </Stack>
  );
}
