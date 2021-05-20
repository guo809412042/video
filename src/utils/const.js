import intl from 'react-intl-universal';
import { ReactIntlUniversalMap } from '../locales';
import { getLang } from './utils';

intl.init({
  currentLocale: getLang(),
  locales: ReactIntlUniversalMap,
});

// 阿里云上传域名
const AliOSS = 'https://hybridxiaoyingtv.oss-cn-shanghai.aliyuncs.com';
//  标签相关
const LANGGUAGE_TAG_ID_PARENT = 224; //  语言一级标签id
//  视频相关
const H5_PLAY_PAGE_HOT = 'https://vidstatusapp.com/v/'; //  H5播放页地址

const successCode = 20000; //  请求成功code
const vidUserBaseProductId = 6; //  产品: vid
const vidToolBaseProject = 33; //  vid工具服务
const vidUserBaseProject = 31; //  用户基础服务

const requestPrePath = {
  //  61
  vidCommunity: '/vid-community',
  //  62 国家、版本、渠道
  common: '/common',
  //  62 上传图片
  toolPython: '/tool-python',
  //  63
  vidWebTag: '/vid-webtag',
  //  631
  vidUserBase: '/vid-userbase',
  //  632
  vidBusinessUser: '/vid-business-user',
  //  633
  vidTools: '/vid-tools',
  //  642
  vidBusinessVideo: '/vid-businessvideo',
  //  651
  vidBaseClass: '/vid-base-class',
  //  652
  vidBusinessClass: '/vid-business-class',
  //  656
  vidImgTextLib: '/vid-img-text-lib',
};

export {
  AliOSS,
  LANGGUAGE_TAG_ID_PARENT,
  H5_PLAY_PAGE_HOT,
  successCode,
  vidUserBaseProductId,
  vidToolBaseProject,
  vidUserBaseProject,
  requestPrePath,
};
