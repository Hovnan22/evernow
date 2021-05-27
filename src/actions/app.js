import {
  SET_AUTH,
  SET_SETTINGS,
  SET_USER,
  CHANGE_SETTING,
  CHANGE_USER_DATA,
  SET_IS_LOGGEDIN,
  SET_MEDITATION,
} from './actionTypes';

export const setMeditation = meditation => ({
  type: SET_MEDITATION,
  payload: meditation,
});

export const setAuth = auth => ({
  type: SET_AUTH,
  payload: auth,
});

export const setSettings = settings => ({
  type: SET_SETTINGS,
  payload: settings,
});

export const setUser = user => ({
  type: SET_USER,
  payload: user,
})

export const changeSetting = setting => ({
  type: CHANGE_SETTING,
  payload: setting,
})

export const changeUserData = data => ({
  type: CHANGE_USER_DATA,
  payload: data,
})

export const setIsLoggedIn = isLoggedIn => ({
  type: SET_IS_LOGGEDIN,
  payload: isLoggedIn,
})

// export const setProducts = () => {
//   return async (dispatch, getState) => {
//     const { main: { page } } = getState();

//     const { data } = await Products.getProducts({ page });
//     const products = data.slice(0, -1);
//     const pageCount = Math.ceil(data[data.length - 1]["COUNT(*)"] / 12);

//     dispatch({
//       type: SET_PAGE_COUNT,
//       payload: pageCount,
//     });
//     dispatch({
//       type: SET_PRODUCTS,
//       payload: products,
//     });
//   };
// };
