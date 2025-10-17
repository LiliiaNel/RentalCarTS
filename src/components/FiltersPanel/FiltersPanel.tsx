import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { selectFilters } from "../../redux/filters/filtersSelectors";
import { setBrand, setRentalPrice, setMinMileage, setMaxMileage, applyFilters } from "../../redux/filters/filtersSlice";
import BrandDropdown from "../BrandsDropdown/BrandsDropdown";
import PriceDropdown from "../PriceDropdown/PriceDropdown";
import MileageFilter from "../MileageFilter/MileageFilter";
import css from './FiltersPanel.module.css'


const FiltersPanel: FC = () => {
  const dispatch = useAppDispatch();
  const { brand, rentalPrice, minMileage, maxMileage } = useAppSelector(selectFilters);

  const handleBrandChange = (value:string) => dispatch(setBrand(value));
  const handleRentalPriceChange = (value:string) => dispatch(setRentalPrice(value));
  const handleMinMileageChange = (value:string) => dispatch(setMinMileage(value));
  const handleMaxMileageChange = (value:string) => dispatch(setMaxMileage(value));

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

export default FiltersPanel;
