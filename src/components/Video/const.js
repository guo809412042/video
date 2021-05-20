import intl from 'react-intl-universal';

const VIDEO_TYPE_ALL = {
  BROKEN: 666,
  NEEDREVIEW: 667,
  MINORPROTECTION: 102,
  MINORITY: 668,
  PASS: 50,
  KEEP: 10000,
  UNPASS: {
    UNPASS: 40,
    PORN: 41,
    AD: 42,
    POLITICS: 43,
    BLOOD: 44,
    OTHERS: 45,
    SEX: 46,
    VIOLENCE: 47,
    PROHIBITED: 48,
    RELIGION: 49,
  },
  RAW: {
    MACHINE: 20,
    HOT: 35,
    HISTORY: 0,
    REPORT: 37,
  },
};

const TEXT_TYPE_DESC = {
  42: intl.get('audit.advertising').defaultMessage('广告'),
  43: intl.get('audit.politics').defaultMessage('敏感涉政'),
  44: intl.get('audit.list.improper').defaultMessage('不适'),
  46: intl.get('audit.pornographic').defaultMessage('色情低俗'),
  47: intl.get('audit.Fear of violence').defaultMessage('暴恐'),
  48: intl.get('audit.Contraband').defaultMessage('违禁品'),
  10: intl.get('audit.The machine does not pass').defaultMessage('机器不通过'),
  101: intl.get('audit.list.copyright').defaultMessage('版权'),
  103: intl.get('audit.list.Cultural ethics').defaultMessage('文化公德'),
  5: intl.get('audit.Sensitive words do not pass').defaultMessage('敏感词库不通过'),
};

const VIDEO_TYPE_FOR_CHART = {
  50: intl.get('audit.list.pass').defaultMessage('通过'),
  40: intl.get('audit.list.no_pass').defaultMessage('不通过'),
  42: intl.get('audit.advertising').defaultMessage('广告'),
  43: intl.get('audit.politics').defaultMessage('敏感涉政'),
  44: intl.get('audit.list.improper').defaultMessage('不适'),
  45: intl.get('audit.other').defaultMessage('其他'),
  46: intl.get('audit.pornographic').defaultMessage('色情低俗'),
  47: intl.get('audit.Fear of violence').defaultMessage('暴恐'),
  48: intl.get('audit.Contraband').defaultMessage('违禁品'),
  49: intl.get('audit.Religion').defaultMessage('宗教'),
  666: intl.get('audit.damage').defaultMessage('损坏'),
  667: intl.get('audit.Need to review').defaultMessage('需要重审'),
  668: intl.get('audit.ethnic_minority').defaultMessage('少数民族'),
  102: intl.get('audit.Minorprotection').defaultMessage('未成年保护'),
  103: intl.get('audit.list.Cultural ethics').defaultMessage('文化公德'),
  101: intl.get('audit.list.copyright').defaultMessage('版权'),
  10000: '确认',
};

const VIDEO_TYPE = [
  { key: '40', value: intl.get('audit.list.pass').defaultMessage('通过') },
  { key: '42', value: intl.get('audit.advertising').defaultMessage('广告') },
  { key: '46', value: intl.get('audit.pornographic').defaultMessage('色情低俗') },
  { key: '48', value: intl.get('audit.Contraband').defaultMessage('违禁品') },
  { key: '47', value: intl.get('audit.Fear of violence').defaultMessage('暴恐') },
  { key: '44', value: intl.get('audit.list.improper').defaultMessage('不适') },
  { key: '43', value: intl.get('audit.politics').defaultMessage('敏感涉政') },
];

const VIDEO_TYPE_NEW = [
  { key: '46', value: intl.get('audit.pornographic').defaultMessage('色情低俗') },
  { key: '48', value: intl.get('audit.Contraband').defaultMessage('违禁品') },
  { key: '42', value: intl.get('audit.advertising').defaultMessage('广告') },
  { key: '43', value: intl.get('audit.politics').defaultMessage('敏感涉政') },
  { key: '44', value: intl.get('audit.list.improper').defaultMessage('不适') },
  { key: '47', value: intl.get('audit.Fear of violence').defaultMessage('暴恐') },
  { key: '49', value: intl.get('audit.Religion').defaultMessage('宗教') },
  { key: '666', value: intl.get('audit.damage').defaultMessage('损坏') },
  { key: '668', value: intl.get('audit.ethnic_minority').defaultMessage('少数民族') },
  { key: '101', value: intl.get('audit.list.copyright').defaultMessage('版权') },
  { key: '102', value: intl.get('audit.Minorprotection').defaultMessage('未成年保护') },
  { key: '103', value: intl.get('audit.list.Cultural ethics').defaultMessage('文化公德') },
];

const VIDEO_TYPE_NEW_PRIORITY = [
  { key: '43', value: intl.get('audit.politics').defaultMessage('敏感涉政') },
  { key: '47', value: intl.get('audit.Fear of violence').defaultMessage('暴恐') },
  { key: '49', value: intl.get('audit.Religion').defaultMessage('宗教') },
  { key: '48', value: intl.get('audit.Contraband').defaultMessage('违禁品') },
  { key: '46', value: intl.get('audit.pornographic').defaultMessage('色情低俗') },
  { key: '44', value: intl.get('audit.list.improper').defaultMessage('不适') },
];

const VIDEO_TYPE_NEW_NOT_PRIORITY = [
  { key: '102', value: intl.get('audit.Minorprotection').defaultMessage('未成年保护') },
  { key: '42', value: intl.get('audit.advertising').defaultMessage('广告') },
  { key: '668', value: intl.get('audit.ethnic_minority').defaultMessage('少数民族') },
  { key: '101', value: intl.get('audit.list.copyright').defaultMessage('版权') },
  { key: '103', value: intl.get('audit.list.Cultural ethics').defaultMessage('文化公德') },
  { key: '666', value: intl.get('audit.damage').defaultMessage('损坏') },
];

const QUERY_VIDEO_TYPE = [
  //  查询中使用的视频类型
  { key: '0', value: intl.get('audit.list.history_videos').defaultMessage('历史视频') },
  { key: '10', value: intl.get('audit.list.timely_new_video').defaultMessage('实时视频') },
  { key: '667', value: intl.get('audit.list.manual_double_check').defaultMessage('人工复审') },
  { key: '669', value: intl.get('audit.list.controversial video').defaultMessage('争议视频') },
  { key: '35', value: intl.get('audit.list.Hot_video').defaultMessage('热门视频') },
  { key: '37', value: intl.get('audit.list.report video').defaultMessage('举报视频') },
  { key: '3', value: intl.get('audit.list.problem video').defaultMessage('复盘视频') },
];

const OP_STATE = [
  { key: '10', value: intl.get('audit.Sensitive_words').defaultMessage('机器不通过') },
  { key: '5', value: intl.get('audit.Sensitive_words').defaultMessage('敏感词') },
  { key: '40', value: intl.get('common.tools.manual_examination_failed').defaultMessage('人工不通过') },
];

const SOURCE = [
  { key: '1', value: intl.get('vivaplus.vest.comments').defaultMessage('评论') },
  { key: '2', value: intl.get('common.nickname').defaultMessage('昵称') },
  { key: '3', value: intl.get('common.tools.description').defaultMessage('描述') },
];

export const VIVAVIDEO_VIDEO_MENU = {
  0: intl.get('audit.list.history_videos').defaultMessage('历史视频'),
  20: intl.get('audit.list.The machine does not pass').defaultMessage('机器不通过'),
  37: intl.get('audit.list.report').defaultMessage('举报视频'),
  35: intl.get('audit.list.Hot_video').defaultMessage('热门视频'),
  10: intl.get('common.tools.not_audited').defaultMessage('未审核'),
  667: intl.get('audit.list.manual_double_check').defaultMessage('人工复审'),
  today: intl.get('audit.list.timely_new_video').defaultMessage('实时视频'), //  0,20,35,37
};

const ZONE = {
  0: intl.get('audit.list.china').defaultMessage('中国'),
  1: intl.get('audit.list.singapore').defaultMessage('新加坡'),
  2: intl.get('audit.list.the east of the U.S.').defaultMessage('美东'),
  3: intl.get('audit.list.the_middle_east').defaultMessage('中东'),
};
export const COMMON_IMAGE_MENU = {
  10: intl.get('audit.list.unapporaved_by_machine').defaultMessage('图片机器未审核'),
  20: intl.get('audit.list.failed_by_machine').defaultMessage('图片机器未通过'),
};
export const SLIDEPLUS_MENU = {
  10: intl.get('common.tools.not_audited').defaultMessage('未审核'),
  20: intl.get('audit.list.Slidepuls Videos').defaultMessage('slidepuls视频'),
  667: intl.get('audit.list.manual_double_check').defaultMessage('人工复审'),
};

const IMG_TYPE = {
  userLogo: 1, // 头像
  background: 2, // 背景图
};

const DATA_TYPE = {
  default: 0, // 默认（不确定）
  video: 1,
  image: 2,
  text: 3,
};

const HOST = {
  listRecImgsByState: 'https://viva.api.xiaoying.co/api/rest/recognition/listRecImgsByState', // 获取图片列表
  updateRecImgsState: 'https://viva.api.xiaoying.co/api/rest/recognition/updateRecImgsState', // 改变图片状态
  vivauser: 'https://viva.api.xiaoying.co/webapi2/rest/user/detail', // 小影用户查询
  vivavideo: 'https://viva.api.xiaoying.co/webapi2/rest/video/publishinfo.get', // 小影视频详情查询
  vivavideourl: 'https://viva.api.xiaoying.co/webapi2/rest/video/videourl', // 小影视频链接查询
  sildeuser: 'https://slideplus.api.xiaoying.co/webapi2/rest/user/detail', // 小影记用户查询
};

const operation_type_dic = {
  0: { text: intl.get('vivaplus.candidateactivitylist.Untreated').defaultMessage('未处理'), color: '#f56a00' },
  10: { text: intl.get('audit.list.frozen').defaultMessage('已冻结'), color: '#3dbd7d' },
  11: { text: intl.get('audit.list.frozen_failed').defaultMessage('冻结失败'), color: '#f46e65' },
  20: { text: intl.get('audit.list.unfrozen').defaultMessage('已解冻'), color: '#3dbd7d' },
  21: { text: intl.get('audit.list.unforzen_Failed').defaultMessage('解冻失败'), color: '#f46e65' },
};
const product_list = {
  2: {
    name: 'VivaVideo',
  },
  3: {
    name: 'SlidePlus',
  },
  5: {
    name: 'Fine',
  },
  6: {
    name: 'VivaShow',
  },
  7: {
    name: 'WhatsNear',
  },
  8: {
    name: 'SnapVote',
  },
  9: {
    name: 'Blendcam',
  },
  100: {
    name: 'Live',
  },
  225: {
    name: '小影记小程序',
  },
};

const SPEED = {
  1: '0~1',
  2: '1~3',
  3: '3~5',
  4: '5~10',
  5: '10~15',
  6: '15~30',
  7: '> 30',
};

const VIDEO_STATE = {
  0: '历史视频',
  3: '问题视频',
  10: '实时新增视频',
  20: '机器审核不通过',
  30: '机器审核通过',
  40: 'VCM验证不通过',
  50: 'VCM验证通过',
  35: '热门',
  37: '举报',
  667: '人工复审',
  669: '争议视频',
  101: intl.get('audit.list.copyright').defaultMessage('版权'),
  10000: '确认',
};

const MACHINE_REC_CONFIG_MAP = {
  1: '色情低俗',
  2: '性感',
  3: '暴恐',
  4: '涉政',
};

const VIDEO_LOCK_STATE_MAP = {
  10: '实时新增视频',
  35: '热门',
  37: '举报',
};

const VIDEO_LOCK_STATE_LIST = [
  {
    value: 10,
    name: '实时新增视频',
  },
  {
    value: 35,
    name: '热门',
  },
  {
    value: 37,
    name: '举报',
  },
];

const danger_socre_config = 500;

export {
  TEXT_TYPE_DESC,
  VIDEO_TYPE,
  OP_STATE,
  SOURCE,
  VIDEO_TYPE_NEW,
  VIDEO_TYPE_ALL,
  IMG_TYPE,
  DATA_TYPE,
  HOST,
  ZONE,
  VIDEO_TYPE_FOR_CHART,
  SPEED,
  operation_type_dic,
  product_list,
  QUERY_VIDEO_TYPE,
  VIDEO_STATE,
  VIDEO_TYPE_NEW_PRIORITY,
  VIDEO_TYPE_NEW_NOT_PRIORITY,
  MACHINE_REC_CONFIG_MAP,
  danger_socre_config,
  VIDEO_LOCK_STATE_MAP,
  VIDEO_LOCK_STATE_LIST,
};
