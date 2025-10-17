import { useEffect, FC } from "react";
import { useParams } from "react-router-dom";
import { selectCarsLoading, selectCarsError, selectSelectedCar } from '../../redux/cars/carsSelectors';
import { fetchCarById } from "../../redux/cars/carsOperations";

import css from './CarDetailsPage.module.css';
import BookingForm from "../../components/BookingForm/BookingForm";
import CarInfoSections from "../../components/CarInfoSections/CarInfoSections";
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Loader from '../../components/Loader/Loader';
import defaultImg from "../../constants/images";
import { shortId } from "../../utils/shortId";
import { formatNumber } from "../../utils/formatNumber";
import Icon from '../../components/Icon/Icon'
import { useAppDispatch, useAppSelector } from "../../redux/store";

const CarDetailsPage:FC = () => {

    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const car = useAppSelector(selectSelectedCar);
    const isLoading = useAppSelector(selectCarsLoading);
    const isError = useAppSelector(selectCarsError);

    useEffect(() => {
        if (id) {
            dispatch(fetchCarById(id));
        }
    }, [dispatch, id]);


    const imageUrl = car?.img || defaultImg;
    const isCarReady = !isLoading && !isError && car;

    return (
        <div className={css.container}>
            {isLoading && <Loader />}
            {isError && <NotFoundPage />}
            {isCarReady && (<>
                <div className={css.imgFormCover}>
                        <img src={imageUrl} alt={`${car.brand} ${car.model}`} className={css.carImage} />
                        <BookingForm/>
                </div>
                <div className={css.detailsCover}>
                    <div className={css.details}>
                        <div className={css.textWrapper}>
                            <h2>{car.brand} {car.model}, {car.year}</h2> 
                            <span className={css.carID}>Id: {shortId(car.id)}</span> 
                        </div>
                        <div className={css.textWrapper}>
                            <p className={css.addressText}><Icon name="icon-Location" className={css.icon} width={16} height={16} /> {car.address}</p>
                            <p>Mileage: {formatNumber(car.mileage)}km</p>
                        </div>
                        <span className={css.price}>${car.rentalPrice}</span>
                        <p>{car.description}</p>
                    </div>
                    <CarInfoSections car={car} />
                </div>
                  
            </>)}
        </div>
    );
}

export default CarDetailsPage;
