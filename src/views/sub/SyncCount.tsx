import { useUnsynchronizedItemCount } from '../../storage/useUnsynchronizedItemCount.ts';

function SyncCount() {
  const unsyncCount = useUnsynchronizedItemCount();
  const syncCountMessage = unsyncCount < 0 ? '(CALCULATING...)' : unsyncCount;

  return (
    <p>
      You have <strong>{syncCountMessage}</strong> items to sync.{' '}
    </p>
  );
}

export default SyncCount;
