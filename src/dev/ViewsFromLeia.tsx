import initialViewsUrl from '../assets/requirements/designs/initial-views.jpeg';
import blueAutoStartUrl from '../assets/requirements/designs/blue-auto-start.jpeg';
import afterStartUrl from '../assets/requirements/designs/after-start.jpeg';
import generalAutoPlayUrl from '../assets/requirements/designs/general-auto-play.jpeg';
import holdingBothAutoUrl from '../assets/requirements/designs/holding-both-auto.jpeg';
import holdingTeleopWithDefenceUrl from '../assets/requirements/designs/holding-teleop-with-defence.jpeg';
import holdingTeleopUrl from '../assets/requirements/designs/holding-teleop.jpeg';
import teleop3Url from '../assets/requirements/designs/teleop3.jpeg';
import endgameComments1Url from '../assets/requirements/designs/endgame-comments1.jpeg';
import endgameComment2Url from '../assets/requirements/designs/endgame-comment2.jpeg';
import endgameComments3Url from '../assets/requirements/designs/endgame-comments-3.jpeg';
import overallCommentsUrl from '../assets/requirements/designs/overall-comments.jpeg';
import mindmap1Url from '../assets/requirements/designs/mindmap1.jpeg';
import mindmap2Url from '../assets/requirements/designs/mindmap2.jpeg';
import mindmapThreeUrl from '../assets/requirements/designs/mindmap-three.jpeg';

type DesignImage = {
  src: string;
  alt: string;
  width: string;
};

function ViewsFromLeia() {
  const images: DesignImage[] = [
    {
      src: initialViewsUrl,
      alt: 'Initial Views (screen 1 is start, then go to 2 or 3 based on alliance. Next 3 screens are versions of auto screens based on what the user is doing in auto.',
      width: '100%',
    },
    {
      src: blueAutoStartUrl,
      alt: 'AUTO: Beginning of auto (fits into above)',
      width: '100%',
    },
    {
      src: afterStartUrl,
      alt: 'AUTO: Left - click score on reef; right: click score on algae',
      width: '100%',
    },
    {
      src: generalAutoPlayUrl,
      alt: 'AUTO: Penalty options',
      width: '100%',
    },
    {
      src: holdingBothAutoUrl,
      alt: 'AUTO: Options when a user is holding both autos (shown to ensure that buttons fit)',
      width: '100%',
    },
    {
      src: holdingTeleopWithDefenceUrl,
      alt: 'TELEOP regular screens - showing options available based on what is being held',
      width: '100%',
    },
    {
      src: holdingTeleopUrl,
      alt: 'TELEOP: once score is pressed, gives score options',
      width: '100%',
    },
    {
      src: teleop3Url,
      alt: 'TELEOP: Shows penalties for teleop AND Shows pickup coral; shows coral pickup locations (ignore "holding algae" title); shows defence timer; ',
      width: '100%',
    },
    {
      src: endgameComments1Url,
      alt: 'Endgame flow + comemnt flow',
      width: '100%',
    },
    {
      src: endgameComment2Url,
      alt: 'Endgame flow + comemnt flow (second screen of each)',
      width: '100%',
    },
    {
      src: endgameComments3Url,
      alt: 'Endgame flow + comemnt flow (third screen of each)',
      width: '100%',
    },
    {
      src: overallCommentsUrl,
      alt: 'Final human-entered comments, shows ranking points, arbitrary rating)',
      width: '100%',
    },
    {
      src: mindmap1Url,
      alt: 'Mindmap 1 (for inspriation, not solid requirements)',
      width: '100%',
    },
    {
      src: mindmap2Url,
      alt: 'Mindmap 2 (for inspriation, not solid requirements)',
      width: '100%',
    },
    {
      src: mindmapThreeUrl,
      alt: 'Mindmap Three (for inspriation, not solid requirements)',
      width: '100%',
    },
  ];
  return (
    <>
      <p>Here are some designs of what the app might look like someday.</p>
      <ul>
        {images.map((image, index) => (
          <li key={index}>
            <h3>{image.alt}:</h3>
            <img src={image.src} width={image.width} alt={image.alt} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default ViewsFromLeia;
