import React from 'react';

import { Players } from './players';
import { PlaceHolderGame } from './PlaceHolderGame';

export function Play(props) {
  return (
    <main className='bg-secondary'>
      <Players userName={props.userName} />
      <PlaceHolderGame userName={props.userName} />
    </main>
  );
}
