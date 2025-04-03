import { useState } from 'react';
import {
  addQuickComment,
  getScoutName,
  usePrimaryRole,
} from '../storage/local.ts';
import Loading from '../common/Loading.tsx';
import { home } from '../modes/home.ts';
import { useNavigate } from 'react-router-dom';
import { QuickComment as QC } from '../types/QuickComment.ts';
function QuickComment() {
  const navigate = useNavigate();
  const [teamNumber, setTeamNumber] = useState(-1310);
  const [quickComment, setQuickComment] = useState('');
  const { primaryRole, loading, error } = usePrimaryRole();
  const scoutName = getScoutName();

  if (loading) {
    return <Loading />;
  }
  if (error || !primaryRole || !scoutName) {
    return <div>An error has occured {error}</div>;
  }

  const qc: QC = {
    timestamp: new Date(),
    name: scoutName,
    role: primaryRole,
    team: teamNumber,
    quickComment: quickComment,
  };

  return (
    <>
      <h1>Quick Comment</h1>

      <div>
        <p>
          <input
            className={'center'}
            type={'number'}
            id={'quick-comment-team-number'}
            placeholder={'team #'}
            onChange={e => {
              if (e.target.valueAsNumber > 0) {
                setTeamNumber(e.target.valueAsNumber);
              } else {
                setTeamNumber(-1310);
              }
            }}
          />
        </p>

        <p>
          <textarea
            rows={5}
            id={'quick-comment-comment'}
            placeholder={
              'I have a comment but I don`t feel like talking to a scout about it because i`m on the field. Also I don`t want to forget this comment because it`s important but im likely to forget about it because robotics tournaments are usually a bit chaotic.'
            }
            onChange={e => {
              setQuickComment(e.target.value);
            }}
          />
        </p>

        <p>
          <button
            onClick={() => {
              addQuickComment(qc);
              navigate(home.url);
            }}
            disabled={teamNumber <= 0 || !quickComment}
          >
            Submit
          </button>
        </p>
      </div>
    </>
  );
}

export default QuickComment;
