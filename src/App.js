import './App.css';
import {createStore} from 'redux'
import { Home } from './components/Home';
import { Navbar } from './components/Navbar';
import { Cart } from './components/Cart';
import { UserLogin } from './components/UserLogin';
function App() {
 
  
  
  return (
  
    <div className='container m-t-5 text-white'>
      
    <Navbar/> 
    <Home/>
    <Cart/>
    <UserLogin/>
    </div>
    
   
  );
}

export default App;
