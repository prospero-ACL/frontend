import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import api from '@/config/api';
import { setGlobalLoading } from '@/config/reducers/loading.reducer';
import { useAppDispatch } from '@/config/store';
import { isIngestionFinished, TrilogyUpload } from '@/shared/dto/document';
import { useClearance } from '@/shared/hooks/use-clearance';

const INGESTION_POLL_MS = 2000;

export function useDocs() {
  const dispatch = useAppDispatch();
  const { isPatrician, isLoading: isClearanceLoading } = useClearance();

  const { data, isLoading: isGetTrilogiesLoading } = api.useGetTrilogiesQuery();
  const trilogies = data || [];
  const [uploadTrilogy, { isLoading: isUploadLoading }] = api.useUploadTrilogyMutation();
  const [isUploadModalOpened, { open: openUploadModal, close: closeUploadModal }] =
    useDisclosure(false);

  // Embedding runs server-side after the upload returns, so the job is polled until it ends.
  const [jobId, setJobId] = useState<string | null>(null);
  const [pollingInterval, setPollingInterval] = useState(INGESTION_POLL_MS);
  const { data: job } = api.useGetIngestionQuery(jobId ?? '', {
    skip: !jobId,
    pollingInterval,
  });

  useEffect(() => {
    if (!job || !isIngestionFinished(job)) {
      return;
    }
    setPollingInterval(0);
    if (job.status === 'COMPLETED') {
      dispatch(api.util.invalidateTags(['Docs']));
    }
  }, [job, dispatch]);

  async function handleUpload(upload: TrilogyUpload) {
    const queued = await uploadTrilogy(upload).unwrap();
    setPollingInterval(INGESTION_POLL_MS);
    setJobId(queued.id);
  }

  const isLoading = isGetTrilogiesLoading || isClearanceLoading || isUploadLoading;

  useEffect(() => {
    dispatch(setGlobalLoading(isLoading));
  }, [isLoading, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(setGlobalLoading(false));
    };
  }, [dispatch]);

  return {
    trilogies,
    canUpload: isPatrician,
    job,
    handleUpload,
    isUploadModalOpened,
    openUploadModal,
    closeUploadModal,
  };
}
