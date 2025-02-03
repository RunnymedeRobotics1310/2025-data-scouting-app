import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { saveChecklist } from '../functions/saveChecklist.ts';

function Checklist() {
  const navigate = useNavigate();
  const [fall, setFall] = useState(false);
  const [recover, setRecover] = useState(false);
  const [shutDown, setShutDown] = useState(false);
  const [defence, setDefence] = useState(false);
  const [effectively, setEffectively] = useState(false);
  const [collector, setCollector] = useState(false);
  const [foul, setFoul] = useState(false);
  const [score, setScore] = useState(false);
  const [fast, setFast] = useState(false);

  return (
    <>
      <h1>Did the robot...</h1>

      <label htmlFor={'fall-over'}>
        <input
          type={'checkbox'}
          checked={fall}
          id={'fall-over'}
          onChange={() => setFall(!fall)}
        />
        Fall over
      </label>

      {fall && (
        <label htmlFor={'recover'}>
          <input
            type={'checkbox'}
            checked={recover}
            id={'recover'}
            onChange={() => setRecover(!recover)}
          />
          Recover
        </label>
      )}

      <label htmlFor={'shut-down'}>
        <input
          type={'checkbox'}
          checked={shutDown}
          id={'shut-down'}
          onChange={() => setShutDown(!shutDown)}
        />
        Shut down
      </label>

      <label htmlFor={'defence'}>
        <input
          type={'checkbox'}
          checked={defence}
          id={'defence'}
          onChange={() => setDefence(!defence)}
        />
        Play defence
      </label>

      {defence && (
        <label htmlFor={'effectively'}>
          <input
            type={'checkbox'}
            checked={effectively}
            id={'effectively'}
            onChange={() => setEffectively(!effectively)}
          />
          Effectively
        </label>
      )}

      <label htmlFor={'collector'}>
        <input
          type={'checkbox'}
          checked={collector}
          id={'collector'}
          onChange={() => setCollector(!collector)}
        />
        Play collector
      </label>

      <label htmlFor={'foul'}>
        <input
          type={'checkbox'}
          checked={foul}
          id={'foul'}
          onChange={() => setFoul(!foul)}
        />
        Foul often
      </label>

      <label htmlFor={'score'}>
        <input
          type={'checkbox'}
          checked={score}
          id={'score'}
          onChange={() => setScore(!score)}
        />
        Score consistently
      </label>

      <label htmlFor={'fast'}>
        <input
          type={'checkbox'}
          checked={fast}
          id={'fast'}
          onChange={() => setFast(!fast)}
        />
        Drive fast
      </label>

      <button
        onClick={() =>
          navigate(
            saveChecklist(
              fall,
              recover,
              shutDown,
              defence,
              effectively,
              collector,
              foul,
              score,
              fast,
            ).url,
          )
        }
      >
        Next ---&gt;
      </button>
      <br />
      <img
        src={'/requirements/screens/checklist.jpeg'}
        width={'25%'}
        alt={'Did the robot...'}
      />
    </>
  );
}
export default Checklist;
