import React from 'react';
import './index.css';
import { Route, Routes } from 'react-router-dom';
import Articles from './components/Articles';
import ArticlesDetail from './components/ArticlesDetail';

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="/:id" element={<ArticlesDetail />} />
      </Routes>
    </div>
  )
}

export default App