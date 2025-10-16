import { useDispatch, useSelector } from "react-redux";
import { selectFilters } from "../../redux/filters/filtersSelectors";
import { setBrand, setRentalPrice, setMinMileage, setMaxMileage, applyFilters } from "../../redux/filters/filtersSlice";
import BrandDropdown from "../BrandsDropdown/BrandsDropdown";
import PriceDropdown from "../PriceDropdown/PriceDropdown";
import MileageFilter from "../MileageFilter/MileageFilter";
import css from './FiltersPanel.module.css'

export default function FiltersPanel() {
  const dispatch = useDispatch();
  const { brand, rentalPrice, minMileage, maxMileage } = useSelector(selectFilters);

  const handleBrandChange = (value) => dispatch(setBrand(value));
  const handleRentalPriceChange = (value) => dispatch(setRentalPrice(value));
  const handleMinMileageChange = (value) => dispatch(setMinMileage(value));
  const handleMaxMileageChange = (value) => dispatch(setMaxMileage(value));

  const handleSearch = () => {
    dispatch(applyFilters());
  };

  return (
    <div className={css.filtersPanel}>
      <div className={css.filtersWrapper}>
        <div className={css.dropdownBox}>
          <BrandDropdown value={brand} onChange={handleBrandChange} />
          <PriceDropdown value={rentalPrice} onChange={handleRentalPriceChange} />
        </div>
        <MileageFilter
          valueFrom={minMileage}
          valueTo={maxMileage}
          onChangeFrom={handleMinMileageChange}
          onChangeTo={handleMaxMileageChange}
        />
      </div>
      <button className={css.searchBtn} onClick={handleSearch}>Search</button>
    </div>
  );
}
