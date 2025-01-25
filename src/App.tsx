type DesignImage = {
  src: string;
  alt: string;
  width: string;
};
function App() {
  const images: DesignImage[] = [
    {
      src: 'requirements/designs/initial-views.jpeg',
      alt: 'Initial Views (screen 1 is start, then go to 2 or 3 based on alliance. Next 3 screens are versions of auto screens based on what the user is doing in auto.',
      width: '100%',
    },
    {
      src: 'requirements/designs/blue-auto-start.jpeg',
      alt: 'AUTO: Beginning of auto (fits into above)',
      width: '100%',
    },
    {
      src: 'requirements/designs/after-start.jpeg',
      alt: 'AUTO: Left - click score on reef; right: click score on algae',
      width: '100%',
    },
    {
      src: 'requirements/designs/general-auto-play.jpeg',
      alt: 'AUTO: Penalty options',
      width: '100%',
    },
    {
      src: 'requirements/designs/holding-both-auto.jpeg',
      alt: 'AUTO: Options when a user is holding both autos (shown to ensure that buttons fit)',
      width: '100%',
    },
    {
      src: 'requirements/designs/holding-teleop-with-defence.jpeg',
      alt: 'TELEOP regular screens - showing options available based on what is being held',
      width: '100%',
    },
    {
      src: 'requirements/designs/holding-teleop.jpeg',
      alt: 'TELEOP: once score is pressed, gives score options',
      width: '100%',
    },
    {
      src: 'requirements/designs/teleop3.jpeg',
      alt: 'TELEOP: Shows penalties for teleop AND Shows pickup coral; shows coral pickup locations (ignore "holding algae" title); shows defence timer; ',
      width: '100%',
    },
    {
      src: 'requirements/designs/endgame-comments1.jpeg',
      alt: 'Endgame flow + comemnt flow',
      width: '100%',
    },
    {
      src: 'requirements/designs/endgame-comment2.jpeg',
      alt: 'Endgame flow + comemnt flow (second screen of each)',
      width: '100%',
    },
    {
      src: 'requirements/designs/endgame-comments-3.jpeg',
      alt: 'Endgame flow + comemnt flow (third screen of each)',
      width: '100%',
    },
    {
      src: 'requirements/designs/overall-comments.jpeg',
      alt: 'Final human-entered comments, shows ranking points, arbitrary rating)',
      width: '100%',
    },
    {
      src: 'requirements/designs/mindmap1.jpeg',
      alt: 'Mindmap 1 (for inspriation, not solid requirements)',
      width: '100%',
    },
    {
      src: 'requirements/designs/mindmap2.jpeg',
      alt: 'Mindmap 2 (for inspriation, not solid requirements)',
      width: '100%',
    },
    {
      src: 'requirements/designs/mindmap-three.jpeg',
      alt: 'Mindmap Three (for inspriation, not solid requirements)',
      width: '100%',
    },
  ];
  return (
    <>
      <img src="images/logo.png" alt="Runnymede Robotics" width="100%" />
      <h1>Team 1310 Runnymede Robotics Data Scouting App</h1>
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

export default App;
