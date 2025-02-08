import { LazyExoticComponent } from 'react';

export interface Mode {
  label: string;
  url: string;
  view: LazyExoticComponent<() => JSX.Element>;
}
