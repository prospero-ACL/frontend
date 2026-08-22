import { KeyboardEvent, useState } from 'react';
import { ChatMessage } from '@/shared/dto/chat';

export default function useChat() {
  const [messages, setMessages] = useState<Array<ChatMessage>>([]);
  const [input, setInput] = useState('');

  function sendMessage() {
    const content = input.trim();
    if (!content) {
      return;
    }
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: 'user', content }]);
    setInput('');
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  }

  return {
    messages,
    input,
    setInput,
    sendMessage,
    handleKeyDown,
  };
}
