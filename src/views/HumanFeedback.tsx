import { useState } from 'react';
import { saveFeedback } from '../functions/saveFeedback.ts';
import { SetPhaseButton } from '../functions/setPhase.tsx';
import { human_feedback } from '../modes/human_feedback.ts';
import { Phase } from '../common/phase.ts';
import Star from '../icons/Star.tsx';

function HumanFeedback() {
  const [comment, setComment] = useState('');
  const [auto, setAuto] = useState(false);
  const [coral, setCoral] = useState(false);
  const [barge, setBarge] = useState(false);
  const [stars, setStars] = useState(0);

  return (
    <>
      <h1>Human Feedback</h1>
      <input
        type={'text'}
        id={'comment'}
        placeholder={'type here'}
        onChange={e => setComment(e.target.value)}
      />
      <br />
      <p>Ranking Points</p>
      <label htmlFor={'auto'}>
        <input
          type={'checkbox'}
          checked={auto}
          id={'auto'}
          onChange={() => setAuto(!auto)}
        />
        Auto
      </label>
      <label htmlFor={'coral'}>
        <input
          type={'checkbox'}
          checked={coral}
          id={'coral'}
          onChange={() => setCoral(!coral)}
        />
        Coral
      </label>
      <label htmlFor={'barge'}>
        <input
          type={'checkbox'}
          checked={barge}
          id={'barge'}
          onChange={() => setBarge(!barge)}
        />
        Barge
      </label>
      <br />
      Rating:
      <input
        type={'checkbox'}
        checked={stars >= 1}
        id={'star1'}
        onChange={() => setStars(1)}
      />
      <input
        type={'checkbox'}
        checked={stars >= 2}
        id={'star2'}
        onChange={() => setStars(2)}
      />
      <input
        type={'checkbox'}
        checked={stars >= 3}
        id={'star3'}
        onChange={() => setStars(3)}
      />
      <input
        type={'checkbox'}
        checked={stars >= 4}
        id={'star4'}
        onChange={() => setStars(4)}
      />
      <input
        type={'checkbox'}
        checked={stars >= 5}
        id={'star5'}
        onChange={() => setStars(5)}
      />
      <br />
      <span className={'gold'}>
        <Star />
      </span>
      <SetPhaseButton
        currentMode={human_feedback}
        desiredPhase={Phase.pre_match}
        label={'Done --->'}
        callback={saveFeedback(comment, auto, coral, barge, stars)}
      />
      <br />
      <img
        src={'/requirements/screens/human-feedback.jpeg'}
        width={'25%'}
        alt={'Human Feedback'}
      />
    </>
  );
}
export default HumanFeedback;
