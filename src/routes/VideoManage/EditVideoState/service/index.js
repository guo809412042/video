import qs from 'qs';
import { request } from '../../../../utils/request';

import { requestPrePath } from '../../../../utils/const';

export async function auditVideo(params) {
  return request(
    `${requestPrePath.vidBusinessVideo}/video/batch-audit`,
    {
      method: 'post',
      body: qs.stringify(params),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );
}
