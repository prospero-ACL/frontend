import { Button, FileButton, Text } from '@mantine/core';
import Table from './components/table';
import { useDocs } from './hooks/use-docs';

export default function Docs() {
  const { dummyDocs, handleFile, isLoading, docs } = useDocs();
  console.log('docs', docs);
  return (
    <>
      <Text>Docs</Text>
      <Table userDocs={dummyDocs} />
      <Table userDocs={docs} />
      <FileButton onChange={handleFile} accept="application/pdf">
        {(props) => (
          <Button loading={isLoading} disabled={isLoading} {...props}>
            Upload document
          </Button>
        )}
      </FileButton>
    </>
  );
}
