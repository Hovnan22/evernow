import {
  SET_AUTH,
  SET_SETTINGS,
  SET_USER,
  SET_MEDITATION,
} from '../actions/actionTypes';

const initialState = {
  auth: {},
  settings: {},
  user: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_MEDITATION: {
      return {
        ...state,
        meditation: payload,
      }
    }
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

    default:
      return state;
  }
};
