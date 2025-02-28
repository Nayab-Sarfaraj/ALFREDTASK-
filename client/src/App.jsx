import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './screens/Home'

import { useContext, useEffect } from 'react'

import Navbar from './components/Navbar'
import { AuthContext } from './context/AuthContext'
import { FlashcardContext } from './context/FlashCardContext'
import { ThemeContext } from './context/themeContext'
import Login from './screens/Login'
import ProtectedRoute from './screens/ProtectedRoute'
import Registerater from './screens/Registerater'
import ReviewPage from './screens/ReviewPage'

function App() {
  const { theme } = useContext(ThemeContext);
  const { getAllFlashCard } = useContext(FlashcardContext)
  const { user } = useContext(AuthContext)

  useEffect(() => {
    const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    document.documentElement.classList.toggle('dark', currentTheme === 'light');
    document.documentElement.classList.toggle('light', currentTheme === 'dark');


  }, [theme]);

  useEffect(() => {
    if (user) getAllFlashCard(user._id)
  }, [])

  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<Login />} path='/login' />
        <Route element={<Registerater />} path='/sign-up' />
        <Route element={<ProtectedRoute />} path='/'>


          <Route element={<Home />} path='/' />
          <Route element={<ReviewPage />} path='/review' />

          <Route path="*" element={<Navigate to="/" />} />
        </Route>/

      </Routes>

    </>
  )
}

export default App
