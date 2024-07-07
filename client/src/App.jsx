import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import NavigationBar from './components/NavigationBar'
import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'
import CreateCategory from './pages/Admin/CreateCategory'
import CreateProduct from './pages/Admin/CreateProduct'

function App() {

  return (
    <>
      <NavigationBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/admin'>
            <Route path='category' element={<CreateCategory/>}/>
            <Route path='product' element={<CreateProduct/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
