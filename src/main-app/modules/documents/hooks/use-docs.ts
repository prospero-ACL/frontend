import { useEffect, useState } from 'react';
import api from '@/config/api';
import { setGlobalLoading } from '@/config/reducers/loading.reducer';
import { useAppDispatch } from '@/config/store';
import { isIngestionFinished } from '@/shared/dto/document';
import { useClearance } from '@/shared/hooks/use-clearance';
import { useModal } from '@/shared/hooks/use-modal';

const INGESTION_POLL_MS = 2000;

// Shared with use-upload-modal, so the queued job started by the modal is visible here.
export const UPLOAD_TRILOGY_CACHE_KEY = 'upload-trilogy';

export function useDocs() {
  const dispatch = useAppDispatch();
  const { isPatrician, isLoading: isClearanceLoading } = useClearance();
  const { open: openUploadModal } = useModal('uploadTrilogy');

  const { data, isLoading: isGetTrilogiesLoading } = api.useGetTrilogiesQuery();
  const trilogies = data || [];
  const [, { data: queuedJob, isLoading: isUploadLoading }] = api.useUploadTrilogyMutation({
    fixedCacheKey: UPLOAD_TRILOGY_CACHE_KEY,
  });

  // Embedding runs server-side after the upload returns, so the job is polled until it ends.
  const jobId = queuedJob?.id;
  const [pollingInterval, setPollingInterval] = useState(INGESTION_POLL_MS);
  const { data: job } = api.useGetIngestionQuery(jobId ?? '', {
    skip: !jobId,
    pollingInterval,
  });

  useEffect(() => {
    setPollingInterval(INGESTION_POLL_MS);
  }, [jobId]);

  useEffect(() => {
    if (!job || !isIngestionFinished(job)) {
      return;
    }
    setPollingInterval(0);
    if (job.status === 'COMPLETED') {
      dispatch(api.util.invalidateTags(['Docs']));
    }
  }, [job, dispatch]);

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
    openUploadModal,
  };
}
