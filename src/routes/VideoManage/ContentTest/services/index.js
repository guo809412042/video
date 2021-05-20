/**
 * Created with 盛丽芬.
 * User: shenglifen
 * Date: 2019/4/28
 * Time: 上午11:25
 *
 */

import qs from 'qs';
import { request } from '../../../../utils/request';

import { requestPrePath } from '../../../../utils/const';

// 获取召回数据
export async function getVideoPool(params) {
  return request(`${requestPrePath.toolPython}/video_pool/video_pool/?${qs.stringify(params)}`);
}

export async function contentTestPost(params) {
  return request(`${requestPrePath.vidWebTag}/api/vivashow/content_list_post`, {
    method: 'post',
    body: qs.stringify(params),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
}

export async function contentTestSearch(params) {
  return request(`${requestPrePath.vidWebTag}/api/vivashow/content_list?${qs.stringify(params)}`);
}

export async function contentVideoById(params) {
  return request(`${requestPrePath.vidWebTag}/api/vivashow/content_video_get_id?${qs.stringify(params)}`);
}

export async function contentVideoInfo(id) {
  return request(`${requestPrePath.vidWebTag}/api/vivashow/video_info/${id}`);
}

// class list
export async function getAllClassList() {
  return request(`${requestPrePath.vidWebTag}/api/vivashow/class_list`);
}

// tag list
export async function getAllTagList() {
  return request(`${requestPrePath.vidWebTag}/api/vivashow/tag_list`);
}
