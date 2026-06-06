import { Table } from '@mantine/core';
import { Document } from '@/shared/dto/document';

export type TableRowProps = {
  position: number;
  userDoc: Document;
};
export default function TableRow(props: TableRowProps) {
  const { position, userDoc } = props;

  return (
    <Table.Tr key={userDoc.name}>
      <Table.Td>{position}</Table.Td>
      <Table.Td>{userDoc.name}</Table.Td>
      <Table.Td>{userDoc.uploadedAt.toLocaleString()}</Table.Td>
    </Table.Tr>
  );
}
