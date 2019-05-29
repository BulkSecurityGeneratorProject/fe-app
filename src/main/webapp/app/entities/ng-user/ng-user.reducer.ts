import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { INGUser, defaultValue } from 'app/shared/model/ng-user.model';

export const ACTION_TYPES = {
  SEARCH_NGUSERS: 'nGUser/SEARCH_NGUSERS',
  FETCH_NGUSER_LIST: 'nGUser/FETCH_NGUSER_LIST',
  FETCH_NGUSER: 'nGUser/FETCH_NGUSER',
  CREATE_NGUSER: 'nGUser/CREATE_NGUSER',
  UPDATE_NGUSER: 'nGUser/UPDATE_NGUSER',
  DELETE_NGUSER: 'nGUser/DELETE_NGUSER',
  RESET: 'nGUser/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<INGUser>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type NGUserState = Readonly<typeof initialState>;

// Reducer

export default (state: NGUserState = initialState, action): NGUserState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_NGUSERS):
    case REQUEST(ACTION_TYPES.FETCH_NGUSER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_NGUSER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_NGUSER):
    case REQUEST(ACTION_TYPES.UPDATE_NGUSER):
    case REQUEST(ACTION_TYPES.DELETE_NGUSER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_NGUSERS):
    case FAILURE(ACTION_TYPES.FETCH_NGUSER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_NGUSER):
    case FAILURE(ACTION_TYPES.CREATE_NGUSER):
    case FAILURE(ACTION_TYPES.UPDATE_NGUSER):
    case FAILURE(ACTION_TYPES.DELETE_NGUSER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_NGUSERS):
    case SUCCESS(ACTION_TYPES.FETCH_NGUSER_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_NGUSER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_NGUSER):
    case SUCCESS(ACTION_TYPES.UPDATE_NGUSER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_NGUSER):
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

const apiUrl = 'api/ng-users';
const apiSearchUrl = 'api/_search/ng-users';

// Actions

export const getSearchEntities: ICrudSearchAction<INGUser> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_NGUSERS,
  payload: axios.get<INGUser>(`${apiSearchUrl}?query=${query}`)
});

export const getEntities: ICrudGetAllAction<INGUser> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_NGUSER_LIST,
  payload: axios.get<INGUser>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<INGUser> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_NGUSER,
    payload: axios.get<INGUser>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<INGUser> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_NGUSER,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<INGUser> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_NGUSER,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<INGUser> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_NGUSER,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
