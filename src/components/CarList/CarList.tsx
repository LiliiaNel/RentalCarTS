import css from './CarList.module.css';
import CarItem from '../CarItem/CarItem';
import { Car } from '../../types';
import { FC } from 'react'


interface CarListProps {
  cars: Car[];
};

const CarList: FC<CarListProps>=({cars}) => {
  
  return <div className={css.listWrapper}>
    <ul className={css.list}>
      {cars.map((car) => (
        <li className={css.listItem} key={car.id}>
          <CarItem car={car}/>
          </li>
      ))}
    </ul>
    </div>
};

export default CarList;