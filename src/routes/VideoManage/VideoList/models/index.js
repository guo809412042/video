import pathToRegexp from 'path-to-regexp';
import { get_video_list } from '../../../../services/video';
import { get_class_by_pid, get_taglibrary_list } from '../../../../services/class-manage';

export default {

  namespace: 'video_manage__video_list',

  state: {
    formFields: {},

    listData: [],
    listLoading: false,
    pagination: {
      current: 1,
      pageSize: 10,
    },

    classInfoList: [],
    classInfoDict: {},
    tagLibraryDict: {},

  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        dispatch({ type: 'app/loginListren' });
        const match = pathToRegexp('/video_manage/video_list/:auiddigest').exec(pathname);
        if (match) {
          dispatch({
            type: 'saveFormFields',
            payload: {
              data: {
                user_id: match[1],
              },
            },
          });
        }
        if (pathname.indexOf('/video_manage/video_list') !== -1) {
          dispatch({ type: 'listInit' });
          dispatch({ type: 'getClassInfoList' });
          dispatch({ type: 'getTagLibraryList' });
        }
      });
    },
  },

  effects: {
    * getClassInfoList(actions, { put, call }) {
      const { data: classInfoList } = yield call(get_class_by_pid);
      const classInfoDict = {};
      classInfoList.map((v) => {
        classInfoDict[v.id] = v.className;
        if (v.children) {
          v.children.map((vv) => {
            classInfoDict[vv.id] = vv.className;
          });
        }
      });
      yield put({
        type: 'saveData',
        payload: {
          classInfoList, classInfoDict,
        },
      });
    },
    * getTagLibraryList(actions, { put, call }) {
      const { data } = yield call(get_taglibrary_list);
      const tagLibraryDict = {};
      data.map((v) => {
        tagLibraryDict[v.id] = v.tagName;
      });
      yield put({
        type: 'saveData',
        payload: {
          tagLibraryDict,
        },
      });
    },
    * listInit(actions, { put, call, select }) {
      yield put({ type: 'showListLoading' });
      const STORE = yield select(state => (state.video_manage__video_list));
      const { data: { data = [] } } = yield call(get_video_list, { ...STORE.formFields, ...STORE.pagination });
      yield put({ type: 'saveDataList', payload: { data } });
      yield put({ type: 'savePagination', payload: { pagination: { hasMore: data.length >= STORE.pagination.pageSize } } });
      yield put({ type: 'hideListLoading' });
    },
  },

  reducers: {
    saveData(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    saveFormFields(state, action) {
      return { ...state, formFields: action.payload.data };
    },
    savePagination(state, action) {
      return { ...state, pagination: { ...state.pagination, ...action.payload.pagination } };
    },
    saveDataList(state, action) {
      return { ...state, listData: action.payload.data };
    },
    showListLoading(state) {
      return { ...state, listLoading: true };
    },
    hideListLoading(state) {
      return { ...state, listLoading: false };
    },
  },

};
