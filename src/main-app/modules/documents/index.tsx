import { Button, LoadingOverlay, Stack, Text } from '@mantine/core';
import { useAppSelector } from '@/config/store';
import IngestionProgress from './components/ingestion-progress';
import Table from './components/table';
import UploadModal from './components/upload-modal';
import { useDocs } from './hooks/use-docs';

export default function Docs() {
  const {
    trilogies,
    canUpload,
    job,
    handleUpload,
    isUploadModalOpened,
    openUploadModal,
    closeUploadModal,
  } = useDocs();
  const isLoading = useAppSelector((state) => state.loading.isLoading);

  return (
    <Stack pos="relative">
      <LoadingOverlay visible={isLoading} />
      <Text>Trilogies</Text>
      <Text size="sm" c="dimmed">
        Every title is listed for everyone. How much of each trilogy is used to answer you depends
        on your clearance.
      </Text>
      <Table trilogies={trilogies} />
      {job && <IngestionProgress job={job} />}
      {canUpload && (
        <>
          <Button onClick={openUploadModal}>Upload trilogy</Button>
          <UploadModal
            isLoading={isLoading}
            opened={isUploadModalOpened}
            onClose={closeUploadModal}
            onSubmit={handleUpload}
          />
        </>
      )}
    </Stack>
  );
}
