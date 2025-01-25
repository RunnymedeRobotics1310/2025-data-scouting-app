type DesignImage = {
  src: string;
  alt: string;
  width: string;
};
function App() {
  const images: DesignImage[] = [
    {
      src: 'requirements/designs/initial-views.jpeg',
      alt: 'Initial Views',
      width: '100%',
    },
    {
      src: 'requirements/designs/blue-auto-start.jpeg',
      alt: 'Blue Auto Start',
      width: '100%',
    },
    {
      src: 'requirements/designs/after-start.jpeg',
      alt: 'After Start',
      width: '100%',
    },
    {
      src: 'requirements/designs/general-auto-play.jpeg',
      alt: 'General Auto Play',
      width: '100%',
    },
    {
      src: 'requirements/designs/holding-both-auto.jpeg',
      alt: 'Holding Both Auto',
      width: '100%',
    },
    {
      src: 'requirements/designs/holding-teleop-with-defence.jpeg',
      alt: 'Holding Teleop with Defence',
      width: '100%',
    },
    {
      src: 'requirements/designs/holding-teleop.jpeg',
      alt: 'Holding Teleop',
      width: '100%',
    },
    {
      src: 'requirements/designs/teleop3.jpeg',
      alt: 'Teleop 3',
      width: '100%',
    },
    {
      src: 'requirements/designs/endgame-comments1.jpeg',
      alt: 'Endgame Comments 1',
      width: '100%',
    },
    {
      src: 'requirements/designs/endgame-comment2.jpeg',
      alt: 'Endgame Comment 2',
      width: '100%',
    },
    {
      src: 'requirements/designs/endgame-comments-3.jpeg',
      alt: 'Endgame Comments 3',
      width: '100%',
    },
    {
      src: 'requirements/designs/mindmap1.jpeg',
      alt: 'Mindmap 1',
      width: '100%',
    },
    {
      src: 'requirements/designs/mindmap2.jpeg',
      alt: 'Mindmap 2',
      width: '100%',
    },
    {
      src: 'requirements/designs/mindmap-three.jpeg',
      alt: 'Mindmap Three',
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
