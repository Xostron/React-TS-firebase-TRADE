import React, { FC } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { TradeDetailPage } from './pages/TradeDetailPage';
import { TradesPage } from './pages/TradesPage';


export const App: FC = () => {
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


