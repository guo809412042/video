import qs from 'qs';
import { request } from '../../../../utils/request';

//  获取用户邀请记录
export async function get_video_list(params) {
  return request(`/video_keyword_review/video_keyword_review_record/?${qs.stringify(params)}`);
}
