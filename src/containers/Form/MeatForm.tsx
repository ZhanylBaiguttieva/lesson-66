import {useCallback, useEffect, useState} from 'react';
import {ApiMeat, Meat} from '../../types';
import axiosApi from '../../axiosApi';
import ButtonSpinner from '../Spinner/ButtonSpinner';
import {useNavigate, useParams} from 'react-router-dom';

interface Props {
  isEdit?: boolean;
}
const MeatForm: React.FC<Props> = ({isEdit = false}) => {
  const [newMeat, setNewMeat] = useState<ApiMeat>({
    time: '',
    description: '',
    calories: '',
  });
  const [creating, setCreating] = useState(false);
  const navigate = useNavigate();
  const {meatId} = useParams();

  const changeMeat = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setNewMeat((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setCreating(true);
    try {
      if(meatId === undefined) {
        await axiosApi.post('meats.json', newMeat);
      } else {
        await axiosApi.put('meats/' + meatId + '.json', newMeat);
      }
      navigate('/');
    } finally {
      setCreating(false);
    }
  };

  const editMeat = useCallback(async () => {
    const url = 'meats/' + meatId + '.json';
    const response = await axiosApi.get(url);
    const data: Meat = response.data;
    setNewMeat(data);
  }, [meatId]);

  useEffect(() => {
    if(meatId) {
      void editMeat();
    }
  }, [meatId,editMeat]);


  const form = (
    <form onSubmit={onFormSubmit}>
      <div className="form-group">
        <label htmlFor="MeailTime" className="me-3">Select time: </label>
        <select className="form-control" id="time" name="time"  required value={newMeat?.time} onChange={changeMeat}>
          <option value=""> </option>
          <option value='breakfast'>Breakfast</option>
          <option value='snack'>Snack</option>
          <option value='lunch'>Lunch</option>
          <option value='dinner'>Dinner</option>
        </select>
      </div>
      <div className="form-group mt-3">
        <label htmlFor="Description">Description:</label>
        <input
          id="description" type="text" name="description" required
          className="form-control"
          value={newMeat?.description}
          onChange={changeMeat}
        />
      </div>
      <div className="form-group mt-3">
        <label htmlFor="Calories">Calories: </label>
        <input
          id="calories" type="number" name="calories" required
          className="form-control"
          value={newMeat?.calories}
          onChange={changeMeat}
        />
      </div>
      <button type="submit" className="btn btn-primary mt-2" disabled={creating}>
        {creating && <ButtonSpinner/>}
        {isEdit ? 'Edit' : 'Update'}
      </button>
    </form>
  );
  return (
    <div>
      {form}
    </div>
  );
};

export default MeatForm;