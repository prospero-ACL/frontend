import { Group, Marquee, Paper, Stack, Text } from '@mantine/core';
import { ChatCircleTextIcon } from '@phosphor-icons/react';
import { EXAMPLE_QUESTIONS_BOTTOM, EXAMPLE_QUESTIONS_TOP } from './example-questions';
import classes from './example-marquee.module.css';

export type QuestionRowProps = {
  questions: string[];
  reverse?: boolean;
};

function QuestionRow({ questions, reverse }: QuestionRowProps) {
  return (
    <Marquee
      reverse={reverse}
      pauseOnHover
      duration={50000}
      fadeEdgeSize="10%"
      classNames={{ content: classes.content }}
    >
      {questions.map((question) => (
        <Paper key={question} withBorder radius="xl" px="md" py={6} className={classes.pill}>
          <Group gap="xs" wrap="nowrap">
            <ChatCircleTextIcon size={18} />
            <Text size="sm">{question}</Text>
          </Group>
        </Paper>
      ))}
    </Marquee>
  );
}

export default function ExampleMarquee() {
  return (
    <Stack gap="sm">
      <Text c="dimmed" ta="center" size="sm" tt="uppercase" fw={700}>
        Things you can ask
      </Text>
      <QuestionRow questions={EXAMPLE_QUESTIONS_TOP} />
      <QuestionRow questions={EXAMPLE_QUESTIONS_BOTTOM} reverse />
    </Stack>
  );
}
