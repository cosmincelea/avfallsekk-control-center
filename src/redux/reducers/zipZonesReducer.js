import { handleActions } from 'redux-actions';
import { fetchZipZonesError, fetchZipZonesRequest, fetchZipZonesSuccess } from '../actions/directusActions';

const defaultState = {
  zip_zones: [],
  isFetching: false,
  error: null,
};

export default handleActions(
  {
    [fetchZipZonesRequest](state) {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    },
    [fetchZipZonesSuccess](state, { payload }) {
      return {
        ...state,
        zip_zones: payload,
        isFetching: false,
        error: null,
      };
    },
    [fetchZipZonesError](state, { payload }) {
      return {
        ...state,
        isFetching: false,
        error: payload,
      };
    },
  },
  defaultState,
);
