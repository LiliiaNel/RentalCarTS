import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { selectFilters, selectBrands, selectBrandsLoading } from "../../redux/filters/filtersSelectors";
import { setBrand, setRentalPrice, setMinMileage, setMaxMileage, applyFilters } from "../../redux/filters/filtersSlice";
import { fetchBrands } from "../../redux/filters/filtersOperations";
import { selectPrices } from "../../redux/cars/carsSelectors";
import CustomDropdown from "../CustomDropdown/CustomDropdown";
import MileageFilter from "../MileageFilter/MileageFilter";
import css from './FiltersPanel.module.css'


const FiltersPanel: FC = () => {

  const dispatch = useAppDispatch();
  const { selectedBrand, rentalPrice, minMileage, maxMileage } = useAppSelector(selectFilters);
  const brands = useAppSelector(selectBrands);
  const brandsLoading = useAppSelector(selectBrandsLoading);
  const prices = useAppSelector(selectPrices);
  console.log('Available prices:', prices);

  useEffect(() => {
    if (!brands.length && !brandsLoading) {
      dispatch(fetchBrands());
    }
  }, [dispatch, brands.length, brandsLoading]);

    const handleBrandChange = (option: string) => {
    dispatch(setBrand(option));
  };
    const handleRentalPriceChange = (option: string) => {
    dispatch(setRentalPrice(option));
  };
  const handleClearBrand = () => {
    dispatch(setBrand(""));
    dispatch(applyFilters());
  };
  const handleClearPrice = () => {
    dispatch(setRentalPrice(""));
  };

  const handleMinMileageChange = (value:string) => dispatch(setMinMileage(value));
  const handleMaxMileageChange = (value:string) => dispatch(setMaxMileage(value));

  const handleSearch = () => {
    dispatch(applyFilters());
  };

  return (
    <div className={css.filtersPanel}>
      <div className={css.filtersWrapper}>
        <div className={css.dropdownBox}>
           {/* Car brand dropdown */}
          <CustomDropdown
            label="Car brand"
            placeholder="Choose a brand"
            value={selectedBrand}
            options={brands}
            onChange={handleBrandChange}
            onClear={handleClearBrand}
          />
          {/* Rental price dropdown */}
          <CustomDropdown
            label="Price / 1hour"
            placeholder="Choose a price"
            value={rentalPrice}
            options={prices.map(String)}
            formatOptionLabel={(option) => `To $${option}`}
            onChange={handleRentalPriceChange}
            onClear={handleClearPrice}
          />
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
