import { lazy, Suspense } from 'react'
import { Routes, Route} from 'react-router-dom';
import Header from './components/Header/Header';

const HomePage = lazy(()=> import ('./pages/HomePage/HomePage'));
const CatalogPage = lazy(()=> import ('./pages/CatalogPage/CatalogPage'));
const CarDetailsPage = lazy(()=> import ('./pages/CarDetailsPage/CarDetailsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));


const App: React.FC = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<p>Loading page ...</p>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/:id" element={<CarDetailsPage />}>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
          </Routes>
      </Suspense>
    </>
  )
}

export default App
