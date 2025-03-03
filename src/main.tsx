import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { MyType } from './types/myType.ts';
import './assets/css/global.css';
import './assets/css/typography.css';
import './assets/css/colors.css';
import './assets/css/layout.css';
import './assets/css/components.css';

console.log('Hiya here we go');
let thingString = localStorage.getItem('the-thing');
console.log('The thing is', thingString);

if (thingString) {
  const thing: MyType = JSON.parse(thingString);
  thing.count++;
  thing.time = new Date();
  thing.msg = 'I am old';
  console.log('The actual thing', thing);
  thingString = JSON.stringify(thing);
} else {
  const thing = {
    a: 'Hello',
    b: 'World',
    time: new Date(),
    count: 0,
    msg: 'I am new!',
  };
  thingString = JSON.stringify(thing);
}

localStorage.setItem('the-thing', thingString);

console.log('Stringified stringThing', thingString);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
