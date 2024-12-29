import { Route,Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home.jsx'
import Chat from './pages/Chat.jsx'

function App() {
  return (
    <div>
    <div className="App">
    <Routes>
      <Route path= '/' element={<Home/>}/>
      <Route path= '/chats' element={<Chat/>}/>
    </Routes>
    </div>
    </div>
  );
}

export default App;
