import {Meat} from '../../types';
import MeatItem from './MeatItem';
import {NavLink} from 'react-router-dom';

interface Props {
  meats: Meat[];
  deleteMeat:(id: string) => void;
  meatsLoading: boolean;
}

const Home: React.FC<Props> = ({meats, deleteMeat}) => {

  return (
    <>
      <div className="text-end mb-3">
        <NavLink className="btn btn-success" to="/new-meat" >Add new meat</NavLink>
      </div>
      <div>
        <h4>Meats</h4>
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