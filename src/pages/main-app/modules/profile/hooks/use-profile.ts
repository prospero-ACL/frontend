import { useDisclosure } from '@mantine/hooks';
import { useEffect } from 'react';
import api from '@/config/api';
import { setGlobalLoading } from '@/config/reducers/loading.reducer';
import { useAppDispatch } from '@/config/store';
import { SecurityLevel } from '@/shared/dto/security-level';

export function useProfile() {
  const dispatch = useAppDispatch();

  const {
    data,
    isLoading: isGetLoading,
    isFetching: isGetFetching,
  } = api.useGetSecurityLevelQuery();
  const [updateSecurityLevel, { isLoading: isUpdateLoading }] =
    api.useUpdateSecurityLevelMutation();
  const [isModalOpened, { open: openModal, close: closeModal }] = useDisclosure(false);

  async function handleUpdate(securityLevel: SecurityLevel) {
    await updateSecurityLevel({ securityLevel }).unwrap();
  }

  const isLoading = isGetLoading || isGetFetching || isUpdateLoading;

  useEffect(() => {
    dispatch(setGlobalLoading(isLoading));
  }, [isLoading, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(setGlobalLoading(false));
    };
  }, [dispatch]);

  return {
    securityLevel: data?.securityLevel,
    handleUpdate,
    isModalOpened,
    openModal,
    closeModal,
  };
}
