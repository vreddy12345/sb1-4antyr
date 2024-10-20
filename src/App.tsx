import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Popup from './components/Popup';
import Options from './components/Options';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Popup />} />
      <Route path="/options" element={<Options />} />
    </Routes>
  );
}

export default App;