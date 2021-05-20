import qs from 'qs';
import ossUploader from '@xy/vcm-oss-upload';
import { request } from '../../utils/request';

import { requestPrePath } from '../../utils/const';

export async function get_ali_oss_sts(file, process) {
  const res = await ossUploader({
    fetch: request, // 必填  前端封装的request
    file, // 必填  file object
    process, // 可选 进度回调
  });
  return res;
}

export async function get_live_ali_oss_sts({ fileName }) {
  const params = {
    fileName,
  };
  return request(`${requestPrePath.toolPython}/tools/get_ali_oss_sts/?${qs.stringify(params)}`);
}

export async function get_ali_oss_sts_url(params) {
  return request(`${requestPrePath.toolPython}/tools/get_ali_oss_sts_url/?${qs.stringify(params)}`);
}
