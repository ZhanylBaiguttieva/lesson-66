import {Meat, MeatsList} from '../../types';
import MeatItem from './MeatItem';
import {NavLink} from 'react-router-dom';
import {useCallback, useEffect, useState} from 'react';
import axiosApi from '../../axiosApi';

const Home: React.FC= () => {

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

  const total = meats.reduce((sum, meat) => {
    return sum + parseFloat(meat.calories);
  }, 0);

  return (
    <>
      <div className="text-end mb-3">
        {!loading &&
          <NavLink className="btn btn-success" to="/new-meat" >Add new meat</NavLink>
        }
      </div>
      <div>
        <h4>Meats</h4>
        <div> <strong>Total calories:</strong> {total} kcal</div>
        {meats.map((meat) => (
          <MeatItem
            key={meat.id}
            meat={meat}
            onDelete={() => deleteMeat(meat.id)}
          />
        ))}
      </div>
    </>
  );
};

export default Home;