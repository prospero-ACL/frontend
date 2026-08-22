import { Table } from '@mantine/core';
import { Document } from '@/shared/dto/document';
import DocumentsSelectTableRow from './documents-select-table-row';

export type DocumentsSelectTableProps = {
  documents: Array<Document>;
  selectedIds: Set<string>;
  onToggle: (id: string) => void;
};

export default function DocumentsSelectTable({
  documents,
  selectedIds,
  onToggle,
}: DocumentsSelectTableProps) {
  return (
    <Table.ScrollContainer minWidth={500} maxHeight={300}>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th />
            <Table.Th>Filename</Table.Th>
            <Table.Th>Uploaded at</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {documents.map((doc) => (
            <DocumentsSelectTableRow
              key={doc.id}
              doc={doc}
              checked={selectedIds.has(doc.id)}
              onToggle={onToggle}
            />
          ))}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
