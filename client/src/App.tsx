import React, { FC, useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { firebaseContext } from '.';
import { Navbar } from './components/navbar/Navbar';
import { Loader } from './components/UI/loader/Loader';
import { AboutPage } from './pages/AboutPage';
import { DetailPage } from './pages/DetailPage';
import { MainPage } from './pages/MainPage';


export const App: FC = () => {
  const { auth } = useContext(firebaseContext)
  const [user, loading] = useAuthState(auth)
  return (


    <BrowserRouter>
      {loading ?
        <div><Loader /></div>
        :
        <>
          <Navbar />
          <main>
            <Routes>
              <Route path='/' element={<MainPage />} />
              <Route path='/main/:id' element={<DetailPage />} />
              <Route path='/about' element={<AboutPage />} />
              <Route path="*" element={<Navigate to="/about" />} />
            </Routes>
          </main>
        </>
      }
    </BrowserRouter>

  )
}


