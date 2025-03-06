import * as React from 'react';

export interface Mode {
  label: string;
  url: string;
  view: () => React.JSX.Element;
}
