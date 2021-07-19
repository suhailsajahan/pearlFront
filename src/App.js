import Main from './components/Main';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import axios from 'axios';

axios.defaults.withCredentials = true;  //This is what helps browser to get the cookie

function App() {
  return (
    <BrowserRouter>
      <div className="App"> 
        <Main/>
      </div>
    </BrowserRouter>
  );
}

export default App;
