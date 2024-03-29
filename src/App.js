import React, { Suspense } from 'react';

import './style.css';
import AssetScene from './AssetScene';


function App() {
  return (
    <>
      <Suspense fallback={null}>
        <AssetScene />
      </Suspense>
    </>
  );
}

export default App;
