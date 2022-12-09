import './App.css';
import { Route, Routes } from 'react-router-dom';
import Customerlist from './components/contents/Customerlist';
import Traininglist from './components/contents/Traininglist';
import HeaderBar from './components/layout/HeaderBar';

function App() {
  return (
    <div className="App">
      <HeaderBar />
      <div style={{margin: 10}}>
        <Routes>
            <Route path="/" element={<Customerlist/>}/>
            <Route path="/customers" element={<Customerlist/>}/>
            <Route path="/trainings" element={<Traininglist/>}/>
        </Routes>
      </div>
    </div>
  );
};

export default App;
