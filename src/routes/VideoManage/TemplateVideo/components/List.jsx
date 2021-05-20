import React from 'react';
import moment from 'moment';
import numeral from 'numeral';
import {
  Table,
} from 'antd';

import {
  VideoDetail as VideoDetailModal,
  UserDetailModal,
} from '@xy/vid-components';

import Video from '../../../../components/Video/Video';
import ImgEdit from '../../../../components/Text/ImgEdit';

import { alter_video_info } from '../../../../services/video';


const List = ({
  listData,
  listLoading,
  paginationOpts,
  reFresh,
}) => {
  const columns = [
    {
      title: '视频ID',
      dataIndex: '_source.puid',
      key: '_source.puid',
      render: value => <VideoDetailModal puid={value}><a>{value}</a></VideoDetailModal>,
    }, {
      title: '用户ID',
      dataIndex: '_source.auid',
      key: '_source.auid',
      render: value => <UserDetailModal user_id={value}><a>{value}</a></UserDetailModal>,
    }, {
      title: '视频',
      key: 'video',
      dataIndex: 'videoInfo.videorelease_path',
      width: '200',
      render: (value, record) => (record.videoInfo ? <div>
        <Video record={record.videoInfo} />
        <ImgEdit
          initialValue={record.videoInfo.thumb_url}
          handleSubmit={alter_video_info}
          name="thumbUrl"
          label="封面"
          callback={reFresh}
          pk={record.videoInfo.id}
        >
          <a>修改封面</a>
        </ImgEdit>
      </div> : null),
    }, {
      title: '素材ID',
      dataIndex: '_source.template',
      key: '_source.template',
    }, {
      title: '音频ID',
      dataIndex: '_source.db_audio_id',
      key: '_source.db_audio_id',
    }, {
      title: '发布时间',
      dataIndex: '_source.publish_time',
      key: '_source.publish_time',
      render: value => (value ? moment(value).format('YYYY-MM-DD HH:mm:ss') : ''),
    }, {
      title: '互动数据',
      dataIndex: 'data',
      key: 'data',
      render: (value, record) => <div>
        <div>ptr: {numeral(record._source.ptr).format('00.00%')}</div>
        <div>expose_cnt: {record._source.expose_cnt}</div>
        <div>play_cnt: {record._source.play_cnt}</div>
        <div>forward_cnt: {record._source.forward_cnt}</div>
        <div>download_cnt: {record._source.download_cnt}</div>
        <div>comment_cnt: {record._source.comment_cnt}</div>
        <div>like_cnt: {record._source.like_cnt}</div>
      </div>,
    },
  ];
  const TableProps = {
    columns,
    loading: listLoading,
    pagination: paginationOpts,
    dataSource: listData,
    rowKey: '_id',
  };
  return (<Table {...TableProps} style={{ marginTop: '15px' }} />);
};

export default List;
