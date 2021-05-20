/**
 * Created with 盛丽芬.
 * User: shenglifen
 * Date: 2019/4/5
 * Time: 下午10:51
 *
 */
import {
  getVideoPool, contentTestPost, contentTestSearch, contentVideoById,
  getAllClassList, getAllTagList,
} from '../services';
import { get_class_by_pid } from '../../../../services/class-manage';

export default {
  namespace: 'contentTest',
  state: {
    mainDataSource: [],
    mainLoading: false,
    isConfigVisible: false,
    isVideoListVisible: false,
    isInsetTestVisible: false,
    videoDataSource: [],
    insertTestDataSource: [],
    isTestConfigVisible: false,
    insertLoading: false,
    testConfigDetail: {},
    videoListLoading: false,
    videoListCurrent: 1,
    videoListTotal: 0,
    currentTestId: 0,
    classList: [],
    languageList: [],
    videoAllDataSource: [],
    classNamesList: {},
    tagNamesList: {},
    algUnitVisible: false,
    algUnitData: '',
  },
  effects: {
    // 获取召回的视频列表
    * getRecallVideoList({ payload }, { put, select }) {
      yield put({ type: 'saveData', payload: { insertLoading: true } });
      const { classNamesList, tagNamesList } = yield select(state => state.contentTest);
      const res = yield getVideoPool(payload.params);
      const dataSource = [];
      res.data.hits.hits.forEach((v, index) => {
        v._source.tag_parent_id_list = classNamesList[v._source.tag_parent_id_list] || '';
        v._source.tag_child_id_list = classNamesList[v._source.tag_child_id_list] || '';
        const tagsIds = [];
        if (v._source.tag_ids) {
          v._source.tag_ids.split(',')
            .forEach(i => tagsIds.push(tagNamesList[i]));
        }
        v._source.tag_ids = tagsIds.join('||');
        dataSource.push({
          _index_: Number(index) + 1,
          ...v,
        });
      });
      yield put({
        type: 'saveData',
        payload: { insertTestDataSource: dataSource, insertLoading: false },
      });
    },

    // 新增测试视频
    * postContentTest({ payload }, { put }) {
      yield contentTestPost(payload.data);
      yield put({
        type: 'saveData', payload: { isInsetTestVisible: false, isTestConfigVisible: false },
      });
    },

    // 获取测试列表
    * initList({ payload }, { put }) {
      const classRes = yield getAllClassList();
      const tagRes = yield getAllTagList();
      const classNamesList = {};
      const tagNamesList = {};
      classRes.data.forEach((v) => { classNamesList[v.id] = v.class_name; });
      tagRes.data.forEach((v) => { tagNamesList[v.id] = v.tag_name; });
      yield put({
        type: 'saveData', payload: { mainLoading: true },
      });
      const res = yield contentTestSearch(payload.params);
      yield put({
        type: 'saveData',
        payload: {
          mainLoading: false, mainDataSource: res.data, classNamesList, tagNamesList,
        },
      });
    },
    // 获取视频全部列表
    * getVideoAllList({ payload }, { put }) {
      payload.params.offset = 0;
      payload.params.psize = 10000;
      const res = yield contentVideoById(payload.params);
      yield put({
        type: 'saveData',
        payload: {
          videoAllDataSource: res.data.data,
        },
      });
    },
    // 获取测试视频列表
    * getVideoList({ payload }, { put, select }) {
      const contentTest = yield select(state => state.contentTest);
      payload.params.offset = (contentTest.videoListCurrent - 1) * 10;
      payload.params.psize = 10;
      yield put({
        type: 'saveData',
        payload: {
          isVideoListVisible: true,
          videoListLoading: true,
          currentTestId: payload.params.id,
        },
      });
      const res = yield contentVideoById(payload.params);
      yield put({
        type: 'saveData',
        payload: {
          videoDataSource: res.data.data,
          videoListLoading: false,
          videoListTotal: res.data.total,
        },
      });
    },
    // 获取内容分类列表
    * getClassList(actions, { put }) {
      const resLanguage = yield get_class_by_pid({ parentId: 224 });
      const res = yield get_class_by_pid();
      yield put({
        type: 'saveData',
        payload: {
          classList: res.data,
          languageList: resLanguage.data,
        },
      });
    },
    // 获取视频列表算法单元
    * getAlgUnitData({ payload }, { put }) {
      const res = yield getVideoPool(payload.params);
      let algUnitData = '';
      if (res.data.hits.hits[0]) {
        algUnitData = res.data.hits.hits[0]._source.alg_unit_info;
      }
      yield put({
        type: 'saveData',
        payload: {
          algUnitData,
          algUnitVisible: true,
        },
      });
    },
  },
  reducers: {
    saveData(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
