import { FC } from "react";
import css from './LoadMoreButton.module.css';
import Loader from '../Loader/Loader';

interface LoadMoreButtonProps {
  onClick: ()=> void;
  isLoading: boolean;
}

const LoadMoreButton:FC <LoadMoreButtonProps> = ({ onClick, isLoading }) => {
    return <div className={css.wrapper}>
      <button 
        onClick={onClick} 
        disabled={isLoading}
        className={css.loadMoreBtn}
      >
        {isLoading ? <Loader/> : "Load more"}
      </button>
    </div>
}

export default LoadMoreButton;