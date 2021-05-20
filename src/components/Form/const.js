import { ObjectMapToArray } from '../../utils/utils';

const classTypeObj = {
  1: '机器',
  2: '人工',
};
const defaultclassType = '2';
const classTypeList = ObjectMapToArray(classTypeObj);

const stateObj = {
  0: '不启用',
  1: '启用',
};
const defaultState = '1';
const stateList = ObjectMapToArray(stateObj);

const languageClassId = 224; //  语言标签
const robotClassId = 194; //  机器分类

export {
  classTypeObj,
  classTypeList,
  defaultclassType,
  stateObj,
  stateList,
  defaultState,
  languageClassId,
  robotClassId,
};
