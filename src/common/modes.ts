import { LazyExoticComponent } from 'react';

interface Mode {
  label: string;
  url: string;
  view: LazyExoticComponent<any>;
}

export default Mode;
