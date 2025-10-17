import css from './CarInfoSections.module.css';
import Icon from '../Icon/Icon'
import { FC } from 'react';
import { Car } from '../../types';

interface CarInfoSectionsProps {
  car: Car;
}

const CarInfoSections: FC<CarInfoSectionsProps> = ({ car }) => {
  return (
    <div className={css.infoSections}>
      <div className={css.section}>
        <h3>Rental Conditions:</h3>
        <ul>
          {car.rentalConditions?.map((item, i) => <li key={i}><Icon name="icon-check-circle" className={css.icon} width={16} height={16} /> {item}</li>)}
        </ul>
      </div>

      <div className={css.section}>
        <h3>Car Specifications:</h3>
        <ul>
          <li><Icon name="icon-calendar" className={css.icon} width={16} height={16} /> Year: {car.year}</li>
          <li><Icon name="icon-car" className={css.icon} width={16} height={16} />Type: {car.type}</li>
          <li><Icon name="icon-fuel-pump" className={css.icon} width={16} height={16} />Fuel Consumption: {car.fuelConsumption}</li>
          <li><Icon name="icon-gear" className={css.icon} width={16} height={16} />Engine Size: {car.engineSize}</li>
        </ul>
      </div>

      <div className={css.section}>
        <h3>Accessories and functionalities:</h3>
        <ul>
          {[...(car.accessories || []), ...(car.functionalities || [])].map((item, i) => (
            <li key={i}><Icon name="icon-check-circle" className={css.icon} width={16} height={16} /> {item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}


export default CarInfoSections;