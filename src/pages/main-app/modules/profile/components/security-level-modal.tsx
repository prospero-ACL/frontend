import { Button, Group, LoadingOverlay, Modal, Slider, Stack, Text } from '@mantine/core';
import { SecurityLevel } from '@/shared/dto/security-level';
import { securityLevelMarks, useSecurityLevelModal } from '../hooks/use-security-level-modal';

export type SecurityLevelModalProps = {
  opened: boolean;
  currentLevel: SecurityLevel;
  onClose: () => void;
  onSubmit: (level: SecurityLevel) => Promise<void>;
  isLoading: boolean;
};

export default function SecurityLevelModal({
  isLoading,
  opened,
  currentLevel,
  onClose,
  onSubmit,
}: SecurityLevelModalProps) {
  const { levelValue, error, handleClose, handleSubmit, handleLevelChange } = useSecurityLevelModal(
    { currentLevel, onSubmit, onClose }
  );

  return (
    <Modal opened={opened} onClose={handleClose} title="Change security level" centered>
      <Stack gap="md" h={200} justify="space-evenly" align="center" pos="relative">
        <LoadingOverlay visible={isLoading} />
        <Slider
          miw={200}
          min={0}
          max={100}
          step={50}
          restrictToMarks
          marks={securityLevelMarks}
          value={levelValue}
          onChange={handleLevelChange}
          label={(value) =>
            securityLevelMarks.find((mark) => mark.value === value)!.label.toLowerCase()
          }
        />
        {error && (
          <Text size="sm" c="red">
            {error}
          </Text>
        )}
        <Group justify="flex-end">
          <Button onClick={handleSubmit}>OK</Button>
          <Button variant="default" onClick={handleClose}>
            Cancel
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
