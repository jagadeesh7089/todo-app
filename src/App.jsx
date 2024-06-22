import logo from './logo.svg';
import './App.css';
import Login from './features/login/login';
import { useSelector } from 'react-redux';
import { loginSlice } from './features/login/loginslice';
import Home from './features/home/home';

function App() {
  var {isloggedin}= useSelector(state=>state.loginReducer)
      
     return (
      <div>
          {isloggedin && <Home></Home> }
          {!isloggedin && <Login></Login>}
      </div>
     )
}

export default App;
