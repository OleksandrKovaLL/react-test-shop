import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Categories, SortPopup, MDBlock, MDLoadingBlock } from '../components';

import { setCategory, setSortBy } from '../redux/actions/filters';
import { fetchDetectors } from '../redux/actions/metalDetectors';


const categoryNames = ['Aka', 'Whites', 'Minelab ', 'Gauss', 'Tesoro'];

const sortIems = [
  { name: 'популярности', type: 'popular', order: 'desc' },
  { name: 'цене', type: 'price', order: 'desc' },
  { name: 'алфавит', type: 'name', order: 'asc' },
];

function Home() {
  const dispatch = useDispatch();
  const items = useSelector(({ metalDetectors }) => metalDetectors.items);
  const cartItems = useSelector(({ cart }) => cart.items);
  const isLoaded = useSelector(({ metalDetectors }) => metalDetectors.isLoaded);
  const { category, sortBy } = useSelector(({ filters }) => filters);

  React.useEffect(() => {
    dispatch(fetchDetectors(sortBy, category));
  }, [category, sortBy]);


  const onSelectCategory = React.useCallback((index) => {
    dispatch(setCategory(index));
  }, []);


  const onSelectSortType = React.useCallback((type) => {
    dispatch(setSortBy(type));
  }, []);


  const handleAddDetectorToCart = (obj) => {
    dispatch({
      type: 'ADD_DETECTOR_CART',
      payload: obj,
    });
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeCategory={category}
          onClickCategory={onSelectCategory}
          items={categoryNames}
        />
        <SortPopup
          activeSortType={sortBy.type}
          items={sortIems}
          onClickSortType={onSelectSortType}
        />
      </div>
      <h2 className="content__title">Все металлоискатели</h2>
      <div className="content__items">
        {isLoaded
          ? items.map((obj) => (
            <MDBlock
              onClickAddDetector={handleAddDetectorToCart}
              key={obj.id}
              addedCount={cartItems[obj.id] && cartItems[obj.id].items.length}
              {...obj}
            />
          ))
          : Array(12)
            .fill(0)
            .map((_, index) => <MDLoadingBlock key={index} />)}
      </div>
    </div>
  );
}

export default Home;
