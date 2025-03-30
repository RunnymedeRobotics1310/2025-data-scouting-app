import { useRole } from '../storage/util.ts';
import HomeMenu from './sub/HomeMenu.tsx';
import Login from './sub/Login.tsx';

export default function Home() {
  const { isMember } = useRole();

  if (isMember) {
    return <HomeMenu />;
  } else {
    return <Login />;
  }
}
