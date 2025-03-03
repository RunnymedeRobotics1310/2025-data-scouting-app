import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { saveChecklist } from '../functions/saveChecklist.ts';
import gameContext from '../context/GameContext.tsx';

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
  const { gamestate } = useContext(gameContext);
  const { scoutingSessionId } = gamestate;
  const isRed = scoutingSessionId.alliance == 'red';

  return (
    <div className={'general-layout'}>
      <div className={'comments-checklist'}>
        <label id={'external-team-number'}>
          <span className={isRed ? 'team allianceRed' : 'team allianceBlue'}>
            Team {scoutingSessionId.teamNumber}
          </span>
        </label>

        <h1>Did the robot...</h1>

        <div className={'checkboxes'}>
          <section className={'checklist'}>
            <label className={'checkbox-and-label shared '}>
              <input
                type={'checkbox'}
                checked={fall}
                id={'fall-over'}
                onChange={() => setFall(!fall)}
              />
              <span>Fall over</span>
            </label>
            {fall && (
              <label className={'checkbox-and-label shared'}>
                <input
                  type={'checkbox'}
                  checked={recover}
                  id={'recover'}
                  onChange={() => setRecover(!recover)}
                />
                <span>Recover</span>
              </label>
            )}
          </section>

          <section className={'checklist'}>
            <label className={'checkbox-and-label'}>
              <input
                type={'checkbox'}
                checked={shutDown}
                id={'shut-down'}
                onChange={() => setShutDown(!shutDown)}
              />
              <span>Shut down</span>
            </label>
          </section>

          <section className={'checklist'}>
            <label className={'checkbox-and-label shared '}>
              <input
                type={'checkbox'}
                checked={defence}
                id={'defence'}
                onChange={() => setDefence(!defence)}
              />
              <span>Play defence</span>
            </label>
            {defence && (
              <label className={'checkbox-and-label shared'}>
                <input
                  type={'checkbox'}
                  checked={effectively}
                  id={'effectively'}
                  onChange={() => setEffectively(!effectively)}
                />
                <span>Effectively</span>
              </label>
            )}
          </section>

          <section className={'checklist'}>
            <label className={'checkbox-and-label '}>
              <input
                type={'checkbox'}
                checked={collector}
                id={'collector'}
                onChange={() => setCollector(!collector)}
              />
              <span>Play collector</span>
            </label>
          </section>

          <section className={'checklist'}>
            <label className={'checkbox-and-label '}>
              <input
                type={'checkbox'}
                checked={foul}
                id={'foul'}
                onChange={() => setFoul(!foul)}
              />
              <span>Foul often</span>
            </label>
          </section>

          <section className={'checklist'}>
            <label className={'checkbox-and-label '}>
              <input
                type={'checkbox'}
                checked={score}
                id={'score'}
                onChange={() => setScore(!score)}
              />
              <span>Score consistently</span>
            </label>
          </section>

          <section className={'checklist'}>
            <label className={'checkbox-and-label '}>
              <input
                type={'checkbox'}
                checked={fast}
                id={'fast'}
                onChange={() => setFast(!fast)}
              />
              <span>Drive fast</span>
            </label>
          </section>
        </div>

        <label className={'next-button'} id={'checklist'}>
          <button
            onClick={() =>
              navigate(
                saveChecklist(
                  scoutingSessionId,
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
        </label>

        {/*<img*/}
        {/*  src={'/requirements/screens/checklist.jpeg'}*/}
        {/*  width={'25%'}*/}
        {/*  alt={'Did the robot...'}*/}
        {/*/>*/}
      </div>
    </div>
  );
}

export default Checklist;
