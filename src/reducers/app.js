import {
  SET_AUTH,
  SET_SETTINGS,
  SET_USER,
  CHANGE_SETTING,
  CHANGE_USER_DATA,
  SET_IS_LOGGEDIN,
} from '../actions/actionTypes';

const initialState = {
  maditations: {},
  auth: {},
  settings: {},
  user: {},
  isLoggedIn: true,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_AUTH: {
      return {
        ...state,
        auth: payload,
      }
    }
    case SET_SETTINGS: {
      return {
        ...state,
        settings: payload,
      }
    }
    case SET_USER: {
      return {
        ...state,
        user: payload,
      }
    }
    case CHANGE_SETTING: {
      return {
        ...state,
        settings: {
          ...state.settings,
          ...payload,
        },
      }
    }
    case CHANGE_USER_DATA: {
      return {
        ...state,
        user: {
          ...state.user,
          ...payload,
        },
      }
    }
    case SET_IS_LOGGEDIN: {
      return {
        ...state,
        isLoggedIn: payload,
      }
    }

    default:
      return state;
  }
};
