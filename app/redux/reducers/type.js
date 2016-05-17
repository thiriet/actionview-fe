import * as t from '../constants/ActionTypes';
import _ from 'lodash';

const initialState = { ecode: 0, collection: [], item: {}, options: {}, loading: false, selectedItem: {} };

export default function project(state = initialState, action) {
  switch (action.type) {
    case t.TYPE_INDEX:
      return { ...state, loading: true, selectedItem: {} };

    case t.TYPE_INDEX_SUCCESS:
      return { ...state, loading: false, ecode: action.result.ecode, collection: action.result.data, options: action.result.options };

    case t.TYPE_INDEX_FAIL:
      return { ...state, loading: false, error: action.error };

    case t.TYPE_INIT:
      const emptyItem = _.mapValues(state.item, function() {
        return '';
      });
      return { ...state, loading: false, item: emptyItem };

    case t.TYPE_CREATE:
      return { ...state, loading: true };

    case t.TYPE_CREATE_SUCCESS:
      state.collection.push(action.result.data);
      return { ...state, loading: false, ecode: action.result.ecode };

    case t.TYPE_CREATE_FAIL:
      return { ...state, loading: false, error: action.error };

    case t.TYPE_EDIT:
      return { ...state, loading: true, selectedItem: { id: '' } };

    case t.TYPE_EDIT_SUCCESS:
      const ind = _.findIndex(state.collection, { id: action.result.data.id });
      state.collection[ind] = action.result.data;
      return { ...state, loading: false, ecode: action.result.ecode };

    case t.TYPE_EDIT_FAIL:
      return { ...state, loading: false, error: action.error };

    case t.TYPE_SHOW:
      return { ...state, loading: true, selectedItem: { id: action.id } };

    case t.TYPE_SHOW_SUCCESS:
      return { ...state, loading: false, ecode: action.result.ecode, item: action.result.data };

    case t.TYPE_SHOW_FAIL:
      return { ...state, loading: false, error: action.error };

    case t.TYPE_DELETE_NOTIFY:
      const el = _.find(state.collection, { id: action.id });
      return { ...state, loading: false, selectedItem: { id: el.id, name: el.name } };

    case t.TYPE_DELETE:
      return { ...state, loading: true };

    case t.TYPE_DELETE_SUCCESS:
      const col = _.reject(state.collection, { id: action.id });
      return { ...state, loading: false, ecode: action.result.ecode, collection: col };

    case t.TYPE_DELETE_FAIL:
      return { ...state, loading: false, error: action.error };

    default:
      return state;
  }
}
