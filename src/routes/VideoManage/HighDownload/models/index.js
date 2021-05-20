import { get_high_download_video } from '../../../../services/video';
import { get_class_by_pid, get_taglibrary_list } from '../../../../services/class-manage';

export default {

  namespace: 'video_high_download',

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
        if (pathname.indexOf('/video_manage/high_download') !== -1) {
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
      const STORE = yield select(state => (state.video_high_download));
      const { data, pagination } = yield call(get_high_download_video, { ...STORE.formFields, ...STORE.pagination });
      yield put({ type: 'saveDataList', payload: { data } });
      yield put({ type: 'savePagination', payload: { pagination: pagination || { total: 0 } } });
      yield put({ type: 'hideListLoading' });
    },
  },

  reducers: {
    saveData(state, action) {
      return { ...state, ...action.payload };
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
