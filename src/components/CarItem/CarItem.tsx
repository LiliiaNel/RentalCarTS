import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { FC, MouseEvent } from 'react'

import css from './CarItem.module.css';
import defaultImg from '../../constants/images';
import { toggleFavorite, selectFavorites } from "../../redux/favorites/favoritesSlice";
import { formatNumber } from "../../utils/formatNumber";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import Icon from "../Icon/Icon";
import { Car } from '../../types';


interface CarItemProps {
    car: Car;
}

const CarItem: FC<CarItemProps> = ({ car }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const favorites = useAppSelector(selectFavorites);
    const isFavourite = favorites.includes(car.id);

    const handleReadMOreClick = ():void => {
        navigate(`/catalog/${car.id}`);
    };

    const handleFavoriteClick = (event: MouseEvent<HTMLButtonElement>):void => {
        event.stopPropagation();
        dispatch(toggleFavorite(car.id));
    };


    const addressParts = car.address.split(',').map(part => part.trim());
    const [city, country] = addressParts.slice(-2);



    return (
        <div className={css.cardBox}>
            <div className={css.imgWrapper}>
                <img
                    className={css.imgPoster}
                    src={car.img || defaultImg}
                    width={250}
                    alt={`${car.brand} ${car.model}`}
                />
                <button
                    type="button"
                    className={css.favButton}
                    onClick={handleFavoriteClick}
                    aria-label={isFavourite ? "Remove from favorites" : "Add to favorites"}
                >
                    <Icon
                        name={isFavourite ? "icon-heart-filled" : "icon-heart"}
                        width={16}
                        height={16}
                    />
                </button>
            </div>

            <div className={css.description}>
                <div className={css.titleWrapper}>
                    <div className={css.carInfo}>
                        <h3>{car.brand} </h3>
                        <h3 className={css.carModel}>{car.model}, </h3>
                        <span>{car.year}</span>
                    </div>
                    <span className={css.carPrice}>${car.rentalPrice}</span>
                </div>
                <div className={css.textCover}>
                    <span className={css.carDetails}>{city}</span>
                    <span className={css.carDetails}>{country}</span>
                    <span className={css.carDetails}>{car.rentalCompany}</span>
                </div>
                <div className={css.carTypeMileageCover}>
                    <span className={css.carDetails}>{car.type}</span>
                    <span className={clsx(css.carDetails, css.noDivider)}>{formatNumber(car.mileage)} km</span>
                </div>
            </div>

            <button type="button" className={css.readMoreBtn} onClick={handleReadMOreClick}>
                Read more
            </button>
        </div>
    );
}


export default CarItem;