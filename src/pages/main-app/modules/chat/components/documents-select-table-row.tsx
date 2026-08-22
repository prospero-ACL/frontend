import { Checkbox, Table } from '@mantine/core';
import { Document } from '@/shared/dto/document';

export type DocumentsSelectTableRowProps = {
  doc: Document;
  checked: boolean;
  onToggle: (id: string) => void;
};

export default function DocumentsSelectTableRow({
  doc,
  checked,
  onToggle,
}: DocumentsSelectTableRowProps) {
  return (
    <Table.Tr>
      <Table.Td>
        <Checkbox checked={checked} onChange={() => onToggle(doc.id)} />
      </Table.Td>
      <Table.Td>{doc.name}</Table.Td>
      <Table.Td>{doc.uploadedAt}</Table.Td>
    </Table.Tr>
  );
}
