/* eslint-disable prefer-spread */
import React from 'react';
import { Row, Col } from 'antd';
import { Image as PopverImg, Remove as PopverConf } from '@xy/design';

import { alter_video_info } from '../../services/video';

const pad = num => `0${num}`.slice(-2);

const hhmmss = (secs) => {
  console.log(secs);
  let minutes = Math.floor(secs / 60);
  secs %= 60;
  minutes %= 60;
  return `${pad(minutes)}:${pad(secs)}`;
};

const VideoImgMap = ({
  video_url, duration, total, puid,
}) => {
  if (!duration) return null;

  let imgList = [];
  const _total = total || 12;
  const _duration = parseInt(duration / 1000, 10);
  if (_duration <= _total) {
    const l = Array.apply(null, { length: _duration }).map(Number.call, Number);
    imgList = l.map(v => v + 1);
  } else {
    const t = _duration / _total;
    const l = Array.apply(null, { length: _total }).map(Number.call, Number);
    imgList = l.map(v => parseInt(t * v, 10) + 1);
  }
  return (
    <Row gutter={16}>
      {imgList.map(v => (
        <Col span={4} key={v}>
          <PopverImg
            src={`${video_url}?x-oss-process=video/snapshot,t_${v}000,f_jpg,w_0,h_0,m_fast`}
            width="100%"
            title={hhmmss(v)}
          />
          {hhmmss(v)}
          <span style={{ float: 'right' }}>
            <PopverConf
              aArgs={[{ thumbUrl: `${video_url}?x-oss-process=video/snapshot,t_${v}000,f_jpg,w_0,h_0,m_fast` }, puid]}
              handleFun={alter_video_info}
              title="确认替换封面?"
            >
              <a>设置封面</a>
            </PopverConf>
          </span>
        </Col>
      ))}
    </Row>
  );
};

export default VideoImgMap;
