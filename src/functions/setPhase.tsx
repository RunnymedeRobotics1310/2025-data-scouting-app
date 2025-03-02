import { Mode } from '../common/mode.ts';
import { start_line } from '../modes/start_line.ts';
import { match_select } from '../modes/match_select.ts';
import { checklist } from '../modes/checklist.ts';
import { endgame } from '../modes/endgame.ts';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import Button from '../common/Button.tsx';
import { Phase } from '../common/phase.ts';
import Loading from '../common/Loading.tsx';
import GameContext from '../context/GameContext.tsx';

export type SetPhaseRetVal = {
  mode: Mode;
  phase: Phase;
};

function getNextMode(currentMode: Mode, desiredPhase: Phase): Mode {
  console.log('Proceeding to ' + desiredPhase);
  // todo: save phase
  if (desiredPhase === Phase.pre_match) {
    return match_select;
  }
  if (desiredPhase === Phase.auto) {
    return start_line;
  }
  if (desiredPhase === Phase.teleop) {
    return currentMode;
  }
  if (desiredPhase === Phase.endgame) {
    return endgame;
  }
  if (desiredPhase === Phase.comments) {
    return checklist;
  }
  console.error('No More Phases');
  return match_select;
}

export type SetPhaseButtonType = {
  currentMode: Mode;
  desiredPhase: Phase;
  label: string;
  callback?: any;
};

export function SetPhaseButton(props: SetPhaseButtonType) {
  const { gamestate, saveGamestate } = useContext(GameContext);
  const navigate = useNavigate();

  if (!saveGamestate) return <Loading />;
  return (
    <Button
      label={props.label}
      callback={() => {
        props.callback;
        saveGamestate({ ...gamestate, currentPhase: props.desiredPhase });
        navigate(getNextMode(props.currentMode, props.desiredPhase).url);
      }}
    />
  );
}
