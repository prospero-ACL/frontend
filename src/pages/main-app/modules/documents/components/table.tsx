import { Table } from '@mantine/core';
import { Document } from '@/shared/dto/document';
import TableRow from './table-row';

export type DocsTableProps = { userDocs: Array<Document> };

export default function DocsTable(props: DocsTableProps) {
  const { userDocs } = props;
  return (
    <Table.ScrollContainer minWidth={500} maxHeight={300}>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th> </Table.Th>
            <Table.Th>Filename</Table.Th>
            <Table.Th>Uploaded at</Table.Th>
            <Table.Th>Scope</Table.Th>
            <Table.Th>Owner</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {userDocs.map((userDoc) => (
            <TableRow key={userDoc.name} position={userDocs.indexOf(userDoc)} userDoc={userDoc} />
          ))}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
