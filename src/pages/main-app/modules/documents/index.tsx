import { Button, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Table from './components/table';
import UploadModal from './components/upload-modal';
import { useDocs } from './hooks/use-docs';

export default function Docs() {
  const { handleUpload, isLoading, docs } = useDocs();
  const [opened, { open, close }] = useDisclosure(false);

  console.log('docs', docs);
  return (
    <>
      <Text>Docs</Text>
      <Table userDocs={docs} />
      <Button onClick={open}>Upload document</Button>
      <UploadModal opened={opened} onClose={close} onSubmit={handleUpload} isLoading={isLoading} />
    </>
  );
}
