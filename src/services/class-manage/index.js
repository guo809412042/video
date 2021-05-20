import qs from 'qs';
import restrequest from '../../utils/request';

import { requestPrePath } from '../../utils/const';

//  获取标签列表
export async function get_taglibrary_list(params) {
  return restrequest(`${requestPrePath.vidBaseClass}/api/taglibrary/taglibrary-list?${qs.stringify(params)}`);
}
//  根据分类获取标签列表
export async function get_taglibrary_by_class(params) {
  return restrequest(`${requestPrePath.vidBaseClass}/api/taglibrary/taglibrary-list-by-class?${qs.stringify(params)}`);
}

//  根据pid获取分类列表: 树状结构
export async function get_class_by_pid(params) {
  return restrequest(`${requestPrePath.vidBusinessClass}/class_tag_library/get_class_by_pid/?${qs.stringify(params)}`);
}

export async function get_tag_node(params) {
  return restrequest(`${requestPrePath.vidBusinessClass}/tag/tag_node/?${qs.stringify(params)}`);
}
