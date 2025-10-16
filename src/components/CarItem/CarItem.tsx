import { useSelector, useDispatch } from "react-redux";
import css from './CarItem.module.css';
import defaultImg from '../../constants/images';
import { useNavigate } from "react-router-dom";
import Icon from "../Icon/Icon";
import { toggleFavorite, selectFavorites } from "../../redux/favorites/favoritesSlice";
import { formatNumber } from "../../utils/formatNumber";
import clsx from "clsx";

export default function CarItem({ car }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const favorites = useSelector(selectFavorites);
    const isFavourite = favorites.includes(car.id);

    const handleClick = () => {
        navigate(`/catalog/${car.id}`);
    };

    const handleFavoriteClick = (e) => {
        e.stopPropagation();
        dispatch(toggleFavorite(car.id));
    };

    const fullAddress = car.address;
    const addressParts = fullAddress.split(',').map(part => part.trim());
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

            <button type="button" className={css.readMoreBtn} onClick={handleClick}>
                Read more
            </button>
        </div>
    );
}
