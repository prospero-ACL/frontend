import { Checkbox, Table } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { Document } from '@/shared/dto/document';
import { DocumentsSelectFormValues } from '../hooks/use-documents-select-modal';

export type DocumentsSelectTableRowProps = {
  doc: Document;
  form: UseFormReturnType<DocumentsSelectFormValues>;
};

export default function DocumentsSelectTableRow({ doc, form }: DocumentsSelectTableRowProps) {
  return (
    <Table.Tr>
      <Table.Td>
        <Checkbox {...form.getInputProps(`selectedIds.${doc.id}`, { type: 'checkbox' })} />
      </Table.Td>
      <Table.Td>{doc.name}</Table.Td>
      <Table.Td>{doc.uploadedAt}</Table.Td>
    </Table.Tr>
  );
}
