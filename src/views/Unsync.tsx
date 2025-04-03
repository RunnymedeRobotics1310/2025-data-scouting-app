import { useState } from 'react';
import { useUnsynchronizeEverything } from '../storage/local.ts';
import Spinner from '../common/Spinner.tsx';

function Unsync() {
  const [proceed, setProceed] = useState(false);
  return (
    <div>
      <h1>Unsynchronize Data</h1>
      <p>
        In cases of emergency, an administrator working with the developer may
        need to unsynchronize data in the app. This will remove all data from
        the app and require the content to be re-synchronized. Note, no data
        will be changed on the server when un-synchronizing, but the server is
        smart enough to not record duplicate records.
      </p>
      <p className={'syncRed'}>
        <strong>
          Are you sure you want to do this? If you aren't sure, stop now.
        </strong>
      </p>
      <button
        disabled={proceed}
        onClick={() => setProceed(true)}
        className={'syncRed'}
      >
        <strong>Yes, unsynchronize</strong>
      </button>
      {proceed && (
        <div>
          <hr />
          <Proceed />
        </div>
      )}
    </div>
  );
}

function Proceed() {
  const { loading, error } = useUnsynchronizeEverything();
  if (loading) {
    return (
      <div>
        <Spinner />
        Unsynchronizing...
      </div>
    );
  }
  if (error) {
    return <p className={'syncRed'}>Error: {error}</p>;
  }
  return <p>Unsynchronization complete</p>;
}
export default Unsync;
