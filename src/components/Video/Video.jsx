import React from 'react';
import { Popover, Row } from 'antd';

import VideoImgMap from './VideoImgMap';
import VideoPlay from '../Common/Video/Video';

import { H5_PLAY_PAGE_HOT } from '../../utils/const';

const Video = ({
  record, width, height, preload, autoplay, controlType,
}) => {
  const VideoImgMapOpts = {
    video_url: record.file_url,
    duration: record.duration,
    puid: record.id,
  };
  const onLink = () => {
    window.open(`${H5_PLAY_PAGE_HOT}${record.id}`, '', 'height=800,width=711,scrollbars=yes,status =yes');
  };
  return (
    <div>
      {controlType === 'vcmControl' ? (
        <VideoPlay
          speed={1}
          width={width || 120}
          autoPlay={autoplay || false}
          height={height}
          src={record.file_url ? record.file_url : ''}
          controls
          preload={preload || 'none'}
          poster={record.thumb_url}
        />
      ) : (
        <video
          width={width || 120}
          autoPlay={autoplay || false}
          height={height}
          src={record.file_url ? record.file_url : ''}
          controls
          preload={preload || 'none'}
          poster={record.thumb_url}
        />
      )}
      <Row>
        <Popover trigger="click" title="视频截图" content={<VideoImgMap {...VideoImgMapOpts} />}>
          <a>more</a>
        </Popover>
        <span style={{ float: 'right' }}>
          <a onClick={onLink}>link</a> &nbsp;&nbsp;
        </span>
      </Row>
    </div>
  );
};

export default Video;
