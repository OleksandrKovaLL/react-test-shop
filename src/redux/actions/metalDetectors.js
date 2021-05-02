import axios from 'axios';

export const setLoaded = (payload) => ({
  type: 'SET_LOADED',
  payload,
});

export const fetchDetectors = (sortBy, category) => (dispatch) => {
  dispatch({
    type: 'SET_LOADED',
    payload: false,
  });

  axios
    .get(
      `/detectors?${category !== null ? `category=${category}` : ''}&_sort=${sortBy.type}&_order=${sortBy.order
      }`,
    )
    .then(({ data }) => {
      dispatch(setDetectors(data));
    });
};

export const setDetectors = (items) => ({
  type: 'SET_DETECTORS',
  payload: items,
});
