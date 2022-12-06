import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { TradeDetailPage } from './pages/TradeDetailPage';
import { TradesPage } from './pages/TradesPage';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<TradesPage />} />
          <Route path='/trades/:id' element={<TradeDetailPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
