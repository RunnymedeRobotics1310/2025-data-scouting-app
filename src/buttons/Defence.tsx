import { toggleDefence } from '../functions/toggleDefence.ts';

function Defence() {
  return <button onClick={() => toggleDefence()}>Defence</button>;
}
export default Defence;
