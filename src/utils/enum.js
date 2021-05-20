import intl from 'react-intl-universal';

import { ObjectToArray } from './utils';

// 视频状态
export const PublishState = {
  0: intl.get('common.pendingReview').defaultMessage('待审核'),
  2: intl.get('common.reviewUnpassed').defaultMessage('审核未通过'),
  3: intl.get('common.reviewPassed').defaultMessage('审核通过'),
  4: intl.get('common.cancelPublish').defaultMessage('取消发布'),
  5: intl.get('common.delete').defaultMessage('删除'),
  6: intl.get('common.machineReviewUnpassed').defaultMessage('机器审核不通过'),
  7: intl.get('common.machieReviewPassed').defaultMessage('机器审核通过'),
  8: intl.get('common.ManualPreliminaryReviewUnpassed').defaultMessage('人工初审不通过'),
  10: intl.get('common.InitialReviewState').defaultMessage('初始状态'),
};

export const PublishStateArray = ObjectToArray(PublishState);

export const langArr = [
  { key: 'en', value: '英语' },
  { key: 'ta', value: '泰米尔语' },
  { key: 'hi', value: '印地语' },
  { key: 'te', value: '泰卢固语' },
  { key: 'kn', value: '卡纳达语' },
  { key: 'gu', value: '古吉拉特语' },
  { key: 'pa', value: '旁遮普语' },
  { key: 'mr', value: '马拉地语' },
  { key: 'bn', value: '孟加拉语' },
  { key: 'ml', value: '马拉雅拉姆语' },
];

export const creator_status_obj = {
  '-1': intl.get('common.CreatorReviewUnpassed').defaultMessage('审核不通过'),
  0: intl.get('common.creatorPendingReview').defaultMessage('创作者待审核'),
  1: intl.get('common.creator').defaultMessage('创作者'),
  2: intl.get('common.KreatorPending').defaultMessage('待激活超级创作者'),
  3: intl.get('common.Kreator').defaultMessage('超级创作者'),
};
