import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import NavigationBar from './components/NavigationBar'
import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'

function App() {

  return (
    <>
      <NavigationBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
      </Routes>
    </>
  )
}

export default App
