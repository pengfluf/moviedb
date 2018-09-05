/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { Fragment } from 'react';

import MainPage from 'containers/MainPage';
import SvgSprite from 'components/SvgSprite';

function App() {
  return (
    <Fragment>
      <MainPage />
      <SvgSprite />
    </Fragment>
  );
}

export default App;
