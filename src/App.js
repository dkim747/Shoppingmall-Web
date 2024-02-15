import MainPage from './components/MainPage';
import Layout from './components/Layout';
import {Routes, Route} from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Cart from './components/Cart';
import { LoginProvider } from './contexts/LoginContext';
import PrivateRoute from './routes/PrivateRoute';
import MakeProducts from './components/MakeProducts';
import Product from './components/Product';
import { ConfirmDialog } from './contexts/ConfirmContext';
import Orders from './components/Orders';

function App() {
  return (
    <>
      <LoginProvider>
      <ConfirmDialog> 
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route path='/' element={<MainPage/>}/>             
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/product' element={<Product/>}/>            
            <Route element={<PrivateRoute/>}>
              <Route path='/cart' element={<Cart/>}/>
              <Route path='/makeproduct' element={<MakeProducts/>}/>
              <Route path='/order' element={<Orders/>}/>
            </Route>            
          </Route>      
        </Routes>
      </ConfirmDialog>
      </LoginProvider>
    </>             
  );
}

export default App;
