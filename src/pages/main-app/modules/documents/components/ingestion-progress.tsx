import { Paper, Progress, Stack, Text } from '@mantine/core';
import { IngestionJob } from '@/shared/dto/document';

export type IngestionProgressProps = { job: IngestionJob };

const STATUS_COLOR = {
  PENDING: 'gray',
  RUNNING: 'blue',
  COMPLETED: 'green',
  FAILED: 'red',
} as const;

export default function IngestionProgress({ job }: IngestionProgressProps) {
  const percent = job.booksTotal > 0 ? (job.booksDone / job.booksTotal) * 100 : 0;

  return (
    <Paper p="sm" withBorder>
      <Stack gap="xs">
        <Text size="sm">
          Ingesting “{job.trilogy}” — {job.status.toLowerCase()}
        </Text>
        <Progress
          value={percent}
          color={STATUS_COLOR[job.status]}
          animated={job.status === 'RUNNING'}
        />
        <Text size="xs" c="dimmed">
          {job.booksDone} of {job.booksTotal} books, {job.chunksWritten} chunks written
        </Text>
        {job.status === 'FAILED' && job.error && (
          <Text size="xs" c="red">
            {job.error}
          </Text>
        )}
      </Stack>
    </Paper>
  );
}
