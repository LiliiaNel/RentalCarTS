import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { selectFilters, selectBrands, selectBrandsLoading } from "../../redux/filters/filtersSelectors";
import { setBrand, setRentalPrice, setMinMileage, setMaxMileage, applyFilters } from "../../redux/filters/filtersSlice";
import { fetchBrands } from "../../redux/filters/filtersOperations";
import BrandDropdown from "../BrandsDropdown/BrandsDropdown";
import PriceDropdown from "../PriceDropdown/PriceDropdown";
import MileageFilter from "../MileageFilter/MileageFilter";
import css from './FiltersPanel.module.css'


const FiltersPanel: FC = () => {
  const dispatch = useAppDispatch();
  const { selectedBrand, rentalPrice, minMileage, maxMileage } = useAppSelector(selectFilters);
  const brands = useAppSelector(selectBrands);
  const brandsLoading = useAppSelector(selectBrandsLoading);

  useEffect(() => {
    if (!brands.length && !brandsLoading) {
      dispatch(fetchBrands());
    }
  }, [dispatch, brands.length, brandsLoading]);

  const handleBrandChange = (value:string) => dispatch(setBrand(value));
  const handleClearBrand = () => {
    dispatch(setBrand(""));
    dispatch(applyFilters());
  };
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
          <BrandDropdown  
            value={selectedBrand}
            options={brands}
            onChange={handleBrandChange}
            onClear={handleClearBrand}
            isLoading={brandsLoading} />
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
