import { Table } from '@mantine/core';

export type TrilogiesTableProps = { trilogies: Array<string> };

export default function TrilogiesTable({ trilogies }: TrilogiesTableProps) {
  return (
    <Table.ScrollContainer minWidth={500} maxHeight={300}>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th> </Table.Th>
            <Table.Th>Trilogy</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {trilogies.map((trilogy, index) => (
            <Table.Tr key={trilogy}>
              <Table.Td>{index + 1}</Table.Td>
              <Table.Td>{trilogy}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
