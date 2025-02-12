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
      <button className={'camoButton'} id={'star1'} onClick={() => setStars(1)}>
        <Star filled={stars >= 1} />
      </button>
      <button className={'camoButton'} id={'star2'} onClick={() => setStars(2)}>
        <Star filled={stars >= 2} />
      </button>
      <button className={'camoButton'} id={'star3'} onClick={() => setStars(3)}>
        <Star filled={stars >= 3} />
      </button>
      <button className={'camoButton'} id={'star4'} onClick={() => setStars(4)}>
        <Star filled={stars >= 4} />
      </button>
      <button className={'camoButton'} id={'star5'} onClick={() => setStars(5)}>
        <Star filled={stars >= 5} />
      </button>
      <br />
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
