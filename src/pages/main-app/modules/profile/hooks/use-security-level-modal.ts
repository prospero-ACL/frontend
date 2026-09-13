import { useState } from 'react';
import { SecurityLevel } from '@/shared/dto/security-level';

export const securityLevelMarks: Array<{ value: number; label: SecurityLevel }> = [
  { value: 0, label: 'PLEBIAN' },
  { value: 50, label: 'EQUES' },
  { value: 100, label: 'PATRICIAN' },
];

function levelToValue(level: SecurityLevel) {
  return securityLevelMarks.find((mark) => mark.label === level)!.value;
}

function valueToLevel(value: number) {
  return securityLevelMarks.find((mark) => mark.value === value)!.label;
}

export type UseSecurityLevelModalArgs = {
  currentLevel: SecurityLevel;
  onSubmit: (level: SecurityLevel) => Promise<void>;
  onClose: () => void;
};

export function useSecurityLevelModal({
  currentLevel,
  onSubmit,
  onClose,
}: UseSecurityLevelModalArgs) {
  const [level, setLevel] = useState<SecurityLevel>(currentLevel);
  const [error, setError] = useState<string | null>(null);

  function handleClose() {
    setLevel(currentLevel);
    setError(null);
    onClose();
  }

  async function handleSubmit() {
    setError(null);
    try {
      await onSubmit(level);
      handleClose();
    } catch {
      setError('Update failed. Please try again.');
    }
  }

  function handleLevelChange(value: number) {
    setLevel(valueToLevel(value));
  }

  return {
    levelValue: levelToValue(level),
    error,
    handleClose,
    handleSubmit,
    handleLevelChange,
  };
}
