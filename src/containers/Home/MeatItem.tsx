import React from 'react';
import {Meat} from '../../types';
import {Link} from 'react-router-dom';

interface Props {
  meat: Meat;
  onDelete: React.MouseEventHandler;
}
const MeatItem: React.FC<Props>  = ({meat, onDelete}) => {

  return (
    <div className="card  p-0 mb-2 d-flex">
      <div className="d-flex">
        <div className="card-body text-start">
          <h5 className="card-title">{meat.time}</h5>
          <p className="card-text">{meat.description}</p>
          <p className="card-text">{meat.calories} kcal</p>
        </div>
        <div>
          <p className="d-flex gap-2 p-3">
            <button className="btn btn-danger" onClick={onDelete}>Delete</button>
            <Link to={'/edit-meat/' + meat.id} className='btn btn-primary'>Edit</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MeatItem;