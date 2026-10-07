import { useEffect } from 'react';
import { setGlobalLoading } from '@/config/reducers/loading.reducer';
import { useAppDispatch } from '@/config/store';
import { useClearance } from '@/shared/hooks/use-clearance';

export function useProfile() {
  const dispatch = useAppDispatch();
  const { securityLevel, isLoading } = useClearance();

  useEffect(() => {
    dispatch(setGlobalLoading(isLoading));
  }, [isLoading, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(setGlobalLoading(false));
    };
  }, [dispatch]);

  return {
    securityLevel,
  };
}
