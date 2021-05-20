import { getVideoPool } from './service/index';
import { get_class_by_pid } from '../../../services/class-manage';
import { get_video_list } from '../../../services/video';
import { getProductId } from '../../../utils/utils';

export default {
  namespace: 'videoManageTemplateVideo',

  state: {
    formFields: {
      _order__publish_time: 'desc',
      product_id: Number(getProductId()),
    },
    isTestConfigVisible: false,
    languageList: [],
    listData: [],
    listLoading: false,
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0,
    },
  },

  subscriptions: {
    // setup({ dispatch, history }) {
    //   return history.listen(({ pathname }) => {
    //     dispatch({ type: 'app/loginListren' });
    //     if (pathname === '/user_manage/creator_violation_list') {
    //       dispatch({ type: 'listInit' });
    //     }
    //   });
    // },
  },

  effects: {
    * listInit(actions, { put, call, select }) {
      yield put({ type: 'showListLoading' });
      const STORE = yield select(state => state.videoManageTemplateVideo);
      try {
        const resLanguage = yield get_class_by_pid({ parentId: 224 });
        yield put({
          type: 'saveData',
          payload: {
            languageList: resLanguage.data,
          },
        });
        const { status, data } = yield call(getVideoPool, { ...STORE.formFields, ...STORE.pagination });
        if (status) {
          const {
            hits: { hits, total },
          } = data;
          yield put({
            type: 'saveData',
            payload: { listData: hits },
          });
          yield put({
            type: 'savePagination',
            payload: { pagination: { total } },
          });
          //  获取视频详细信息
          try {
            let infoList = [];
            if (hits && hits.length) {
              const videoIds = hits.map(item => item._source.puid);
              infoList = yield Promise.all(
                videoIds.map(async (id) => {
                  const {
                    data: {
                      data: [videoInfo],
                    },
                  } = await get_video_list({ id });
                  return videoInfo;
                }),
              );
            }
            const newList = hits.map((item) => {
              const [videoInfo] = infoList.filter(info => Number(info.id) === Number(item._source.puid));
              item.videoInfo = videoInfo || {};
              return item;
            });
            yield put({
              type: 'saveData',
              payload: { listData: newList },
            });
          } catch (err) {
            console.log(err);
          }
        } else {
          yield put({
            type: 'saveData',
            payload: { listData: [] },
          });
          yield put({
            type: 'savePagination',
            payload: { pagination: { total: 0 } },
          });
        }
      } catch (err) {
        console.log(err);
      } finally {
        yield put({ type: 'hideListLoading' });
      }
    },
  },

  reducers: {
    saveData(state, action) {
      return { ...state, ...action.payload };
    },
    saveFormFields(state, action) {
      return { ...state, formFields: { ...action.payload.data } };
    },
    savePagination(state, action) {
      return { ...state, pagination: { ...state.pagination, ...action.payload.pagination } };
    },
    showListLoading(state) {
      return { ...state, listLoading: true };
    },
    hideListLoading(state) {
      return { ...state, listLoading: false };
    },
  },
};
