import qs from 'qs';
import { request } from '../../utils/request';
import { requestPrePath } from '../../utils/const';

export async function get_video_list(params) {
  return request(`${requestPrePath.vidBusinessVideo}/video/video_publish/?${qs.stringify(params)}`);
}

export async function alter_video_info(params, pk) {
  return request(`${requestPrePath.vidBusinessVideo}/video/video_publish/${pk}/`, {
    method: 'put',
    body: qs.stringify(params),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
}

//  获取高下载单元视频
export async function get_high_download_video(params) {
  return request(`${requestPrePath.vidCommunity}/video/high_download_puid/?${qs.stringify(params)}`);
}

//  删除高下载单元视频
export async function del_high_download_video(params) {
  return request(`${requestPrePath.vidCommunity}/video/high_download_puid/`, {
    method: 'delete',
    body: qs.stringify(params),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
}
