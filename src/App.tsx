import './App.css';
import {Route, Routes} from 'react-router-dom';
import Home from './containers/Home/Home';
import MeatForm from './containers/Form/MeatForm';


function App() {
  return (
    <>
      <div className="w-50">
        <Routes>
          <Route path='/' element={(<Home/>)}></Route>
          <Route path='/meats' element={(<Home/>)}></Route>
          <Route path="/new-meat" element={(<MeatForm/>)} />
          <Route path="/edit-meat/:meatId" element={<MeatForm/>}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
