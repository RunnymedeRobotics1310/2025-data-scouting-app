import { useContext, useState } from 'react';
import { saveFeedback } from '../functions/saveFeedback.ts';
import { SetPhaseButton } from '../functions/setPhase.tsx';
import { human_feedback } from '../modes/human_feedback.ts';
import { Phase } from '../common/phase.ts';
import Star from '../icons/Star.tsx';
import GameContext from '../context/GameContext.tsx';
import { DEFAULT_GAME_STATE } from '../context/GS.ts';
import {
  getScoutingSessionId,
  setMatchNumber,
  setScoutingSessionId,
  setTeam,
} from '../storage/util.ts';
import NotFound from './NotFound.tsx';

function HumanFeedback() {
  const [mistake, setMistake] = useState(false);
  const [comment, setComment] = useState('');
  const [auto, setAuto] = useState(false);
  const [coral, setCoral] = useState(false);
  const [barge, setBarge] = useState(false);
  const [stars, setStars] = useState(0);
  const { gamestate, saveGamestate } = useContext(GameContext);
  const scoutingSessionId = getScoutingSessionId();
  if (!scoutingSessionId) return <NotFound />;
  const isRed = scoutingSessionId.alliance == 'red';

  function processHumanFeedback(
    mistake: boolean,
    comment: string,
    auto: boolean,
    coral: boolean,
    barge: boolean,
    stars: number,
  ) {
    if (!scoutingSessionId) return null;
    const target = saveFeedback(
      scoutingSessionId,
      gamestate.currentPhase,
      mistake,
      comment,
      auto,
      coral,
      barge,
      stars,
    );
    saveGamestate(DEFAULT_GAME_STATE);
    setMatchNumber(0);
    setTeam(-1310);
    setScoutingSessionId('red');
    return target;
  }

  return (
    <div className={'general-layout'}>
      <div className={'human-feedback'}>
        <label id={'external-team-number'}>
          <span className={isRed ? 'team allianceRed' : 'team allianceBlue'}>
            Team {scoutingSessionId.teamNumber}
          </span>
        </label>
        <h1>Comments</h1>

        <label className={'checkbox-and-label'}>
          <input
            type={'checkbox'}
            checked={mistake}
            id={'mistake'}
            onChange={() => setMistake(!mistake)}
          />
          <span>Mistake!</span>
        </label>

        <textarea
          rows={5}
          cols={40}
          id={'comment'}
          placeholder={mistake ? 'report happy accident here' : 'type here'}
          onChange={e => setComment(e.target.value)}
        />
        <div>
          <h3 className={'sub-title'}>Ranking Points</h3>
          <label className={'checkbox-and-label rp-label'}>
            <input
              type={'checkbox'}
              checked={auto}
              id={'auto'}
              onChange={() => setAuto(!auto)}
            />
            <span>Auto</span>
          </label>
          <label className={'checkbox-and-label rp-label'}>
            <input
              type={'checkbox'}
              checked={coral}
              id={'coral'}
              onChange={() => setCoral(!coral)}
            />
            <span>Coral</span>
          </label>
          <label className={'checkbox-and-label rp-label'}>
            <input
              type={'checkbox'}
              checked={barge}
              id={'barge'}
              onChange={() => setBarge(!barge)}
            />
            <span>Barge</span>
          </label>
        </div>
        <div>
          <h3 className={'sub-title'}>Rating:</h3>
          <button
            className={'camoButton starButton'}
            id={'star1'}
            onClick={() => setStars(1)}
          >
            <Star filled={stars >= 1} />
          </button>
          <button
            className={'camoButton starButton'}
            id={'star2'}
            onClick={() => setStars(2)}
          >
            <Star filled={stars >= 2} />
          </button>
          <button
            className={'camoButton starButton'}
            id={'star3'}
            onClick={() => setStars(3)}
          >
            <Star filled={stars >= 3} />
          </button>
          <button
            className={'camoButton starButton'}
            id={'star4'}
            onClick={() => setStars(4)}
          >
            <Star filled={stars >= 4} />
          </button>
          <button
            className={'camoButton starButton'}
            id={'star5'}
            onClick={() => setStars(5)}
          >
            <Star filled={stars >= 5} />
          </button>
        </div>
        <SetPhaseButton
          currentMode={human_feedback}
          desiredPhase={Phase.pre_match}
          label={'Done --->'}
          disabled={stars <= 0}
          callback={() =>
            processHumanFeedback(mistake, comment, auto, coral, barge, stars)
          }
        />
      </div>
    </div>
  );
}
export default HumanFeedback;
