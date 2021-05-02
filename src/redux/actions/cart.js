export const addDetectorToCart = (detectorObj) => ({
  type: 'ADD_DETECTOR_CART',
  payload: detectorObj,
});

export const clearCart = () => ({
  type: 'CLEAR_CART',
});

export const removeCartItem = (id) => ({
  type: 'REMOVE_CART_ITEM',
  payload: id,
});

export const plusCartItem = (id) => ({
  type: 'PLUS_CART_ITEM',
  payload: id,
});

export const minusCartItem = (id) => ({
  type: 'MINUS_CART_ITEM',
  payload: id,
});

export const minusDeleteCartItem = (id) => ({
  type: 'MINUS_DELETE_ITEM',
  payload: id,
});


export const setLocalStorage = () => ({
  type: 'SET_LOCAL_STORAGE',
});

