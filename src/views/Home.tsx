import { Link } from 'react-router-dom';
import { match_select } from '../modes/match_select.ts';

export default function Home() {
  return (
    <>
      <h1>Welcome!</h1>
      <Link to={match_select.url}>Select Match</Link>
    </>
  );
}
