import * as t from '../constants/ActionTypes';
import _ from 'lodash';

const initialState = { 
  ecode: 0, 
  collection: [], 
  options: {}, 
  indexLoading: false, 
  loading: false, 
  itemLoading: false, 
  selectedItem: {},
  usedProjects: [] 
};

export default function screen(state = initialState, action) {
  switch (action.type) {
    case t.SCREEN_INDEX:
      return { ...state, indexLoading: true, loading: false, itemLoading: false, collection: [] };

    case t.SCREEN_INDEX_SUCCESS:
      if (action.result.ecode === 0) {
        state.collection = action.result.data;
        state.options = action.result.options;
      }
      return { ...state, indexLoading: false, ecode: action.result.ecode };

    case t.SCREEN_INDEX_FAIL:
      return { ...state, indexLoading: false, error: action.error };

    case t.SCREEN_CREATE:
      return { ...state, loading: true };

    case t.SCREEN_CREATE_SUCCESS:
      if ( action.result.ecode === 0 ) {
        state.collection.push(action.result.data);
      }
      return { ...state, loading: false, ecode: action.result.ecode };

    case t.SCREEN_CREATE_FAIL:
      return { ...state, loading: false, error: action.error };

    case t.SCREEN_UPDATE:
      return { ...state, loading: true };

    case t.SCREEN_UPDATE_SUCCESS:
      if ( action.result.ecode === 0 ) {
        const ind = _.findIndex(state.collection, { id: action.result.data.id });
        _.extend(state.collection[ind], action.result.data);
      }
      return { ...state, loading: false, ecode: action.result.ecode };

    case t.SCREEN_UPDATE_FAIL:
      return { ...state, loading: false, error: action.error };

    case t.SCREEN_SELECT:
      const el = _.find(state.collection, { id: action.id });
      return { ...state, itemLoading: false, selectedItem: el };

    case t.SCREEN_DELETE:
      return { ...state, itemLoading: true };

    case t.SCREEN_DELETE_SUCCESS:
      if ( action.result.ecode === 0 ) {
        state.collection = _.reject(state.collection, { id: action.id });
      }
      return { ...state, itemLoading: false, ecode: action.result.ecode };

    case t.SCREEN_DELETE_FAIL:
      return { ...state, itemLoading: false, error: action.error };

    case t.SCREEN_VIEW_USED:
      return { ...state, loading: true, usedProjects: [] };

    case t.SCREEN_VIEW_USED_SUCCESS:
      if ( action.result.ecode === 0 ) {
        state.usedProjects = action.result.data;
      }
      return { ...state, loading: false, ecode: action.result.ecode };

    case t.SCREEN_VIEW_USED_FAIL:
      return { ...state, loading: false, error: action.error };

    default:
      return state;
  }
}
