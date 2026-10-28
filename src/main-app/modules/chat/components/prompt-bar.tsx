import { Button, Group, Textarea } from '@mantine/core';

export type PromptBarProps = {
  input: string;
  setInput: (value: string) => void;
  handleKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  sendMessage: () => void;
  isLoading: boolean;
  sendError: string | null;
};

export default function PromptBar(props: PromptBarProps) {
  const { input, setInput, handleKeyDown, sendMessage, isLoading, sendError } = props;

  return (
    <Group align="flex-start">
      <Textarea
        disabled={isLoading || !!sendError}
        flex={1}
        placeholder="Type your message here..."
        autosize
        minRows={1}
        maxRows={4}
        value={input}
        onChange={(event) => setInput(event.currentTarget.value)}
        onKeyDown={handleKeyDown}
      />
      <Button
        variant="outline"
        loading={isLoading}
        color="blue"
        onClick={sendMessage}
        disabled={!input.trim()}
      >
        Send
      </Button>
    </Group>
  );
}
