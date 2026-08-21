import { Box, Button, LoadingOverlay, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Table from './components/table';
import UploadModal from './components/upload-modal';
import { useDocs } from './hooks/use-docs';

export default function Docs() {
  const { handleUpload, isLoading, docs } = useDocs();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Box pos="relative">
      <LoadingOverlay visible={isLoading} />
      <Text>Docs</Text>
      <Table userDocs={docs} />
      <Button onClick={open} disabled={isLoading}>
        Upload document
      </Button>
      <UploadModal opened={opened} onClose={close} onSubmit={handleUpload} isLoading={isLoading} />
    </Box>
  );
}
