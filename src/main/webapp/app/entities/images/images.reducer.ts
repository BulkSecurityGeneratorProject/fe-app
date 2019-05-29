import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IImages, defaultValue } from 'app/shared/model/images.model';

export const ACTION_TYPES = {
  SEARCH_IMAGES: 'images/SEARCH_IMAGES',
  FETCH_IMAGES_LIST: 'images/FETCH_IMAGES_LIST',
  FETCH_IMAGES: 'images/FETCH_IMAGES',
  CREATE_IMAGES: 'images/CREATE_IMAGES',
  UPDATE_IMAGES: 'images/UPDATE_IMAGES',
  DELETE_IMAGES: 'images/DELETE_IMAGES',
  RESET: 'images/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IImages>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ImagesState = Readonly<typeof initialState>;

// Reducer

export default (state: ImagesState = initialState, action): ImagesState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_IMAGES):
    case REQUEST(ACTION_TYPES.FETCH_IMAGES_LIST):
    case REQUEST(ACTION_TYPES.FETCH_IMAGES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_IMAGES):
    case REQUEST(ACTION_TYPES.UPDATE_IMAGES):
    case REQUEST(ACTION_TYPES.DELETE_IMAGES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_IMAGES):
    case FAILURE(ACTION_TYPES.FETCH_IMAGES_LIST):
    case FAILURE(ACTION_TYPES.FETCH_IMAGES):
    case FAILURE(ACTION_TYPES.CREATE_IMAGES):
    case FAILURE(ACTION_TYPES.UPDATE_IMAGES):
    case FAILURE(ACTION_TYPES.DELETE_IMAGES):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_IMAGES):
    case SUCCESS(ACTION_TYPES.FETCH_IMAGES_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_IMAGES):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_IMAGES):
    case SUCCESS(ACTION_TYPES.UPDATE_IMAGES):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_IMAGES):
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

const apiUrl = 'api/images';
const apiSearchUrl = 'api/_search/images';

// Actions

export const getSearchEntities: ICrudSearchAction<IImages> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_IMAGES,
  payload: axios.get<IImages>(`${apiSearchUrl}?query=${query}`)
});

export const getEntities: ICrudGetAllAction<IImages> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_IMAGES_LIST,
  payload: axios.get<IImages>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IImages> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_IMAGES,
    payload: axios.get<IImages>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IImages> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_IMAGES,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IImages> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_IMAGES,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IImages> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_IMAGES,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
