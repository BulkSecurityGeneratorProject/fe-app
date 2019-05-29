import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IDeviceDetails, defaultValue } from 'app/shared/model/device-details.model';

export const ACTION_TYPES = {
  SEARCH_DEVICEDETAILS: 'deviceDetails/SEARCH_DEVICEDETAILS',
  FETCH_DEVICEDETAILS_LIST: 'deviceDetails/FETCH_DEVICEDETAILS_LIST',
  FETCH_DEVICEDETAILS: 'deviceDetails/FETCH_DEVICEDETAILS',
  CREATE_DEVICEDETAILS: 'deviceDetails/CREATE_DEVICEDETAILS',
  UPDATE_DEVICEDETAILS: 'deviceDetails/UPDATE_DEVICEDETAILS',
  DELETE_DEVICEDETAILS: 'deviceDetails/DELETE_DEVICEDETAILS',
  RESET: 'deviceDetails/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDeviceDetails>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type DeviceDetailsState = Readonly<typeof initialState>;

// Reducer

export default (state: DeviceDetailsState = initialState, action): DeviceDetailsState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_DEVICEDETAILS):
    case REQUEST(ACTION_TYPES.FETCH_DEVICEDETAILS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_DEVICEDETAILS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_DEVICEDETAILS):
    case REQUEST(ACTION_TYPES.UPDATE_DEVICEDETAILS):
    case REQUEST(ACTION_TYPES.DELETE_DEVICEDETAILS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_DEVICEDETAILS):
    case FAILURE(ACTION_TYPES.FETCH_DEVICEDETAILS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_DEVICEDETAILS):
    case FAILURE(ACTION_TYPES.CREATE_DEVICEDETAILS):
    case FAILURE(ACTION_TYPES.UPDATE_DEVICEDETAILS):
    case FAILURE(ACTION_TYPES.DELETE_DEVICEDETAILS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_DEVICEDETAILS):
    case SUCCESS(ACTION_TYPES.FETCH_DEVICEDETAILS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_DEVICEDETAILS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_DEVICEDETAILS):
    case SUCCESS(ACTION_TYPES.UPDATE_DEVICEDETAILS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_DEVICEDETAILS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/device-details';
const apiSearchUrl = 'api/_search/device-details';

// Actions

export const getSearchEntities: ICrudSearchAction<IDeviceDetails> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_DEVICEDETAILS,
  payload: axios.get<IDeviceDetails>(`${apiSearchUrl}?query=${query}`)
});

export const getEntities: ICrudGetAllAction<IDeviceDetails> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_DEVICEDETAILS_LIST,
  payload: axios.get<IDeviceDetails>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IDeviceDetails> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_DEVICEDETAILS,
    payload: axios.get<IDeviceDetails>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IDeviceDetails> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_DEVICEDETAILS,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IDeviceDetails> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_DEVICEDETAILS,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IDeviceDetails> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_DEVICEDETAILS,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
