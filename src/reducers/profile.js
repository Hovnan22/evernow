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
  meditation: [
    {
      name: '1 meditation',
      icon: "yog",
    },
    {
      name: '2 meditation',
      icon: "yog",
    },
    {
      name: '3 meditation',
      icon: "yog",
    },
    {
      name: '4 meditation',
      icon: "yog",
    },
    {
      name: '5 meditation',
      icon: "yog",
    },
  ],
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
