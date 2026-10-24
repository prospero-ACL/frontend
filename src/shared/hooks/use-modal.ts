import { closeModal, ModalName, openModal } from '@/config/reducers/modals.reducer';
import { useAppDispatch, useAppSelector } from '@/config/store';

export function useModal(name: ModalName) {
  const dispatch = useAppDispatch();
  const opened = useAppSelector((state) => state.modals[name]);

  function open() {
    dispatch(openModal(name));
  }

  function close() {
    dispatch(closeModal(name));
  }

  return { opened, open, close };
}
