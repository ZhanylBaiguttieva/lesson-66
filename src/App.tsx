
import './App.css';
import {Route, Routes} from 'react-router-dom';
import Home from './containers/Home/Home';
import {useCallback, useEffect, useState} from 'react';
import {Meat, MeatsList} from './types';
import axiosApi from './axiosApi';
import MeatForm from './containers/Form/MeatForm';


function App() {
  const [meats, setMeats] = useState<Meat[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMeats = useCallback(async () => {
    try {
      setLoading(true);

      const meatsResponse = await axiosApi.get<MeatsList | null>('meats.json');
      const meats = meatsResponse.data;

      if (!meats) {
        setMeats([]);
        return;
      }
      const newMeats = Object.entries(meats).map(([meatId, meat]) => {
        return {
          id: meatId,
          time: meat.time,
          description: meat.description,
          calories: meat.calories,
        };
      });

      setMeats(newMeats);
    } finally {
      setLoading(false);
    }
  },[]);

  useEffect(() => {
    void fetchMeats();
  }, [fetchMeats]);

  const deleteMeat = async (id: string) => {
    if(window.confirm('Do you really want to delete?')) {
      await axiosApi.delete('meats/' + id + '.json');
      await fetchMeats();
    }
  };

  return (
    <>
      <div className="w-50">
        <Routes>
          <Route path='/' element={(<Home
            meatsLoading={loading}
            meats={meats}
            deleteMeat={deleteMeat}
          />)}></Route>
          <Route path='/meats' element={(<Home
            meatsLoading={loading}
            meats={meats}
            deleteMeat={deleteMeat}
          />)}></Route>
          <Route path="/new-meat" element={(<MeatForm/>)} />
          <Route path="/edit-meat/:meatId" element={<MeatForm/>}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
