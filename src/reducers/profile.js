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
      name: '1 meditation'
    },
    {
      name: '2 meditation'
    },
    {
      name: '3 meditation'
    },
    {
      name: '4 meditation'
    },
    {
      name: '5 meditation'
    },
    {
      name: '6 meditation'
    },
    {
      name: '7 meditation'
    },
    {
      name: '8 meditation'
    },
    {
      name: '9 meditation'
    }
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
