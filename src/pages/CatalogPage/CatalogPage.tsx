import css from './CatalogPage.module.css';
import CarList from '../../components/CarList/CarList';
import FiltersPanel from '../../components/FiltersPanel/FiltersPanel';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Loader from '../../components/Loader/Loader';
import LoadMoreButton from '../../components/LoadMoreButton/LoadMoreButton';
import { FC, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { fetchCars } from '../../redux/cars/carsOperations';
import { selectAppliedFilters } from '../../redux/filters/filtersSelectors';
import { selectCarsLoading, selectCarsError, selectCars, selectHasNextPage, selectCurrentPage } from '../../redux/cars/carsSelectors';


const CatalogPage: FC = ()=> {
  const dispatch = useAppDispatch();
  const cars = useAppSelector(selectCars);

  const isLoading = useAppSelector(selectCarsLoading);
  const isError = useAppSelector(selectCarsError);

  const appliedFilters = useAppSelector(selectAppliedFilters);
  const hasNextPage = useAppSelector(selectHasNextPage);
  const currentPage = useAppSelector(selectCurrentPage);

  const handleLoadMore = ():void => {
    if (!hasNextPage || isLoading) return;
    dispatch(fetchCars({ ...(appliedFilters|| {}), page: String(currentPage + 1) }));
  };
  
    useEffect(() => {
    dispatch(fetchCars({ ...(appliedFilters || {}), page: 1 }));
  }, [dispatch, appliedFilters]);


  const listEndRef = useRef<HTMLDivElement | null>(null);

  const prevPageRef = useRef(currentPage);

  useEffect(() => {
    if (!isLoading && currentPage > 1 && currentPage > prevPageRef.current) {
      listEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      prevPageRef.current = currentPage;
    }
  }, [cars, currentPage, isLoading]);



  const noResults = !isLoading && !isError && cars.length === 0;
  const showLoadMore = hasNextPage && !isLoading && cars.length > 0;  

   return (
    <div className={css.container}>
      <FiltersPanel />
      {isLoading && <Loader />}
      {isError && <NotFoundPage />}
      {noResults && <p className={css.noResults}>No results found</p>}
      {!isLoading && !isError && cars.length > 0 && <CarList cars={cars}/>}
      <div ref={listEndRef} />
      {showLoadMore&& <LoadMoreButton onClick={handleLoadMore} isLoading={isLoading} />}
    </div>
  );
}

export default CatalogPage;
