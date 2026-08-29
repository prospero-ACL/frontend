import { Table } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { Document } from '@/shared/dto/document';
import { DocumentsSelectFormValues } from '../hooks/use-documents-select-modal';
import DocumentsSelectTableRow from './documents-select-table-row';

export type DocumentsSelectTableProps = {
  documents: Array<Document>;
  form: UseFormReturnType<DocumentsSelectFormValues>;
};

export default function DocumentsSelectTable({ documents, form }: DocumentsSelectTableProps) {
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
            <DocumentsSelectTableRow key={doc.id} doc={doc} form={form} />
          ))}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
