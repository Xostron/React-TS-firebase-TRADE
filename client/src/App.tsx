import React, { FC } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Navbar } from './components/navbar/Navbar';
import { AboutPage } from './pages/AboutPage';
import { DetailPage } from './pages/DetailPage';
import { MainPage } from './pages/MainPage';


export const App: FC = () => {
  return (
    <main>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/main/:id' element={<DetailPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path="*" element={<Navigate to="/about" />} />
        </Routes>
      </BrowserRouter>
    </main>
  )
}


