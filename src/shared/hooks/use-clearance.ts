import api from '@/config/api';

// Clearance is assigned server-side and only read here. Hiding a control is a UX courtesy — the
// backend still rejects a non-patrician upload, and Postgres still filters what each tier reads.
export function useClearance() {
  const { data, isLoading, isFetching } = api.useGetSecurityLevelQuery();
  const securityLevel = data?.securityLevel;

  return {
    securityLevel,
    isPatrician: securityLevel === 'PATRICIAN',
    isLoading: isLoading || isFetching,
  };
}
