import { useNavigate } from 'react-router-dom';

import { EndgameStatus, endgameStatus } from '../functions/endgameStatus.ts';
import { useState } from 'react';

function Endgame() {
  const navigate = useNavigate();
  const [climbed, setClimbed] = useState(EndgameStatus.none);

  return (
    <>
      <h1>Endgame</h1>
      <br />

      <button
        id={'none'}
        onClick={() => {
          setClimbed(EndgameStatus.none);
        }}
        disabled={climbed == EndgameStatus.none}
      >
        Did not Park
      </button>
      <button
        id={'park'}
        onClick={() => {
          setClimbed(EndgameStatus.park);
        }}
        disabled={climbed == EndgameStatus.park}
      >
        Park
      </button>
      <br />
      <button
        id={'shallow'}
        onClick={() => {
          setClimbed(EndgameStatus.shallow);
        }}
        disabled={climbed == EndgameStatus.shallow}
      >
        Shallow Climb
      </button>
      <button
        id={'deep'}
        onClick={() => {
          setClimbed(EndgameStatus.deep);
        }}
        disabled={climbed == EndgameStatus.deep}
      >
        Deep Climb
      </button>
      <br />
      <button onClick={() => navigate(endgameStatus(climbed).url)}>
        Next ---&gt;
      </button>
      <br />
      <img
        src={'/requirements/screens/simple-endgame.jpeg'}
        width={'25%'}
        alt={'Endgame'}
      />
    </>
  );
}

export default Endgame;
