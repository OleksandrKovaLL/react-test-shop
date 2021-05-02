const _get = (obj, path) => {
  const [firstKey, ...keys] = path.split('.');
  return keys.reduce((val, key) => {
    return val[key];
  }, obj[firstKey]);
};

const getTotalSum = (obj, path) => {
  return Object.values(obj).reduce((sum, obj) => {
    const value = _get(obj, path);
    return sum + value;
  }, 0);
};

const setInLocalStorage = (key, obj) => {
  window.localStorage.setItem(key, JSON.stringify(obj));
};

const getObjFromLocalStorage = (key) => {
  return JSON.parse(window.localStorage.getItem(key) || '[]')
};

const itemFromLocalStorage = getObjFromLocalStorage('cartData');

const initialState = {
  items: itemFromLocalStorage,
  totalCount: getTotalSum(itemFromLocalStorage, 'items.length'),
  totalPrice: getTotalSum(itemFromLocalStorage, 'totalPrice')
};

const getTotalPrice = (arr) => arr.reduce((sum, obj) => {
  if (obj.hasOwnProperty('price')) {
    return obj.price + sum
  } else {
    return sum + 0;
  }
}, 0)



const cart = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_DETECTOR_CART': {
      const currentDetectorItems = !state.items[action.payload.id]
        ? [action.payload]
        : [...state.items[action.payload.id].items, action.payload];

      const newItems = {
        ...state.items,
        [action.payload.id]: {
          items: currentDetectorItems,
          totalPrice: getTotalPrice(currentDetectorItems,),
        },
      };

      const totalCount = getTotalSum(newItems, 'items.length');
      const totalPrice = getTotalSum(newItems, 'totalPrice');

      setInLocalStorage('cartData', newItems);

      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
      };
    }

    case 'REMOVE_CART_ITEM': {
      const newItems = {
        ...state.items,
      };
      const currentTotalPrice = newItems[action.payload].totalPrice;
      const currentTotalCount = newItems[action.payload].items.length;
      delete newItems[action.payload];

      setInLocalStorage('cartData', newItems);

      return {
        ...state,
        items: newItems,
        totalPrice: state.totalPrice - currentTotalPrice,
        totalCount: state.totalCount - currentTotalCount,
      };
    }

    case 'PLUS_CART_ITEM': {
      const newObjItems = [
        ...state.items[action.payload].items,
        state.items[action.payload].items[0],
      ];
      const newItems = {
        ...state.items,
        [action.payload]: {
          items: newObjItems,
          totalPrice: getTotalPrice(newObjItems),
        },
      };
      const totalCount = getTotalSum(newItems, 'items.length');
      const totalPrice = getTotalSum(newItems, 'totalPrice');

      setInLocalStorage('cartData', newItems);

      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
      };
    }

    case 'MINUS_CART_ITEM': {
      const oldItems = state.items[action.payload].items;
      const newObjItems = state.items[action.payload].items.slice(1);

      if (oldItems.length === 1) {
        delete state.items[action.payload];
      }

      const newItems = {
        ...state.items,
        [action.payload]: {
          items: newObjItems,
          totalPrice: getTotalPrice(newObjItems),
        },
      };

      const totalCount = getTotalSum(newItems, 'items.length');
      const totalPrice = getTotalSum(newItems, 'totalPrice');

      setInLocalStorage('cartData', newItems);

      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
      };
    }

    case 'CLEAR_CART':

      setInLocalStorage('cartData', {});

      return { totalPrice: 0, totalCount: 0, items: {} };

    default:
      return state;
  }
};

export default cart;
