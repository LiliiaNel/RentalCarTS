import { FC } from 'react';
import css from './HomePage.module.css';
import Banner from '../../components/Banner/Banner';

const HomePage: FC = () => {

    return <div className={css.container} >
        <Banner/>
    </div >
}


export default HomePage