import { FC } from "react";
import { PulseLoader } from "react-spinners";
import css from './Loader.module.css'; 

const Loader:FC = () => {
    return <div className={css.container}>
        <PulseLoader
            color={'#3470FF'}
            size={14}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    </div>;
};

export default Loader;