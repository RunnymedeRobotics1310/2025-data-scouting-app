import { Link } from 'react-router-dom';
import { scout_select } from '../modes/scout_select.ts';

export default function Home() {
  return (
    <>
      <h1>Welcome!</h1>
      <Link to={scout_select.url}>Select Match</Link>
    </>
  );
}
