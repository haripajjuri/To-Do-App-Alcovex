import './index.css';
import SideBar from './components/SideBar';
import { Routes,Route } from 'react-router-dom';
import Tasks from './components/Tasks';

function App() {
  

  return (
    <div className="grid grid-cols-[2fr,9fr]">

      <SideBar/>
      <div>
      

        <Routes>
          <Route path='/:id' element={<Tasks/>}></Route>
        </Routes>
      </div>

    </div>
  );
}

export default App;
