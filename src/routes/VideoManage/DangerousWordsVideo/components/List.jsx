import React from 'react';
import { Table, Icon } from 'antd';
import { Text } from '@xy/design';

import {
  VideoDetail as VideoDetailModal,
  UserDetailModal,
  ClassModal,
} from '@xy/vid-components';
import Video from '../../../../components/Video/Video';


import { PublishState } from '../../../../utils/enum';
import { alter_video_info } from '../../../../services/video';

const { TextEdit } = Text;


const List = ({
  listData,
  listLoading,
  reFresh,
  paginationOpts,
  classInfoList,
  classInfoDict,
  tagLibraryDict,
}) => {
  const columns = [
    {
      title: '用户ID',
      key: 'user_id',
      dataIndex: 'user_id',
      render: value => <UserDetailModal user_id={value}>
        <a>{value}</a>
      </UserDetailModal>,
    }, {
      title: '视频ID',
      dataIndex: 'video_id',
      key: 'video_id',
      render: value => <VideoDetailModal puid={value}><a>{value}</a></VideoDetailModal>,
    }, {
      title: '视频',
      key: 'video',
      dataIndex: 'video',
      width: '200',
      render: (value, record) => <div>
        <Video record={record.videoPublishInfo} />
      </div>,
    }, {
      title: '描述',
      key: 'videoPublishInfo.description',
      dataIndex: 'videoPublishInfo.description',
      width: '20%',
      render: (value, record) => <div>
        <span>{ value }</span>
        <TextEdit
          initialValue={value}
          handleSubmit={alter_video_info}
          name="description"
          label="描述"
          callback={reFresh}
          pk={record.video_id}
        >
          <Icon type="edit"/>
        </TextEdit>
      </div>,
    }, {
      title: '视频发布时间',
      key: 'videoPublishInfo.publish_time',
      dataIndex: 'videoPublishInfo.publish_time',
    }, {
      title: '视频状态',
      key: 'videoPublishInfo.publish_state',
      dataIndex: 'videoPublishInfo.publish_state',
      render: value => PublishState[value],
    }, {
      title: '操作',
      key: 'do',
      dataIndex: 'do',
      render: (value, record) => <ClassModal
        videoId={record.video_id}
        classInfoList={classInfoList}
        classInfoDict={classInfoDict}
        tagLibraryDict={tagLibraryDict}
        reFresh={reFresh}
      />,
    },
  ];
  const TableProps = {
    columns,
    loading: listLoading,
    pagination: paginationOpts,
    dataSource: listData,
    rowKey: 'id',
  };
  return (
    <Table {...TableProps} style={{ marginTop: '15px' }} />
  );
};

export default List;
