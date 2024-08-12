import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import NavigationBar from './components/NavigationBar'
import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'
import CreateCategory from './pages/Admin/CreateCategory'
import CreateProduct from './pages/Admin/CreateProduct'
import ProductDetailse from './pages/Product/ProductDetailse'
import Product from './pages/Product/Product'
import Cart from './pages/Cart'
import OrderProduct from './pages/order/OrderProduct'
import User from './pages/User'
import 'toastify-js/src/toastify.css';

function App() {
  return (
    <>
      <NavigationBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/product/:id' element={<ProductDetailse/>}/>
        <Route path='/products' element={<Product/>}/>
        <Route path='/cart/:id' element={<Cart/>}/>
        <Route path='/order/:id' element={<OrderProduct/>}/>
        <Route path='/user/:id' element={<User/>}/>
        <Route path='/admin'>
            <Route path='category' element={<CreateCategory/>}/>
            <Route path='product' element={<CreateProduct/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
