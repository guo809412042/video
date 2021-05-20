import React from 'react';
import { Table, Button, Icon } from 'antd';
import { Remove, Text } from '@xy/design';

import {
  VideoDetail as VideoDetailModal,
  UserDetailModal,
  ClassModal,
} from '@xy/vid-components';
import Video from '../../../../components/Video/Video';
import ImgEdit from '../../../../components/Text/ImgEdit';
import { del_high_download_video, alter_video_info } from '../../../../services/video';

const { TextareaEdit: TextEdit } = Text;


const List = ({
  classInfoList,
  classInfoDict,
  tagLibraryDict,
  listData,
  listLoading,
  paginationOpts,
  reFresh,
}) => {
  const columns = [
    {
      title: '视频ID',
      dataIndex: 'puid',
      key: 'puid',
      render: value => <VideoDetailModal puid={value}><a>{value}</a></VideoDetailModal>,
    }, {
      title: '用户ID',
      dataIndex: 'videoPublishInfo.user_id',
      key: 'videoPublishInfo.user_id',
      render: value => <UserDetailModal user_id={value}>
        <a>{value}</a>
      </UserDetailModal>,
    }, {
      title: '视频',
      key: 'video',
      dataIndex: 'videoPublishInfo.videorelease_path',
      width: '200',
      render: (value, record) => <div>
        <Video record={record.videoPublishInfo} />
        <ImgEdit
          initialValue={record.videoPublishInfo.thumb_url}
          handleSubmit={alter_video_info}
          name="thumbUrl"
          label="封面"
          callback={reFresh}
          pk={record.videoPublishInfo.id}
        >
          <a>修改封面</a>
        </ImgEdit>
      </div>,
    }, {
      title: '描述',
      key: 'description',
      dataIndex: 'description',
      width: '20%',
      render: (value, record) => <div>
        <span>{ value }</span>
        <TextEdit
          initialValue={record.videoPublishInfo.description}
          handleSubmit={alter_video_info}
          name="description"
          label="描述"
          callback={reFresh}
          pk={record.videoPublishInfo.id}
        >
          <Icon type="edit"/>
        </TextEdit>
      </div>,
    }, {
      title: '互动数据',
      key: 'stat',
      dataIndex: 'id',
      render: (value, record) => <div>
        <p><strong>播放：</strong>{record.videoStatInfo.play_count}</p>
        <p><strong>分享(FB)：</strong>{record.videoStatInfo.facebook_share_count}</p>
        <p><strong>分享(whatsapp)：</strong>{record.videoStatInfo.whatsapp_share_count}</p>
        <p><strong>评论：</strong>{record.videoStatInfo.comment_count}</p>
        <p><strong>点赞：</strong>{record.videoStatInfo.like_count}</p>
        <p><strong>下载：</strong>{record.videoStatInfo.download_count}</p>
      </div>,
    }, {
      title: '操作',
      key: 'do',
      dataIndex: 'id',
      width: '20%',
      render: (value, record) => <div>
        <Remove
          aArgs={[{ id: record.id }]}
          handleFun={del_high_download_video}
          callback={reFresh}
          title="确认从高下载单元删除？"
          style={{ display: 'block', marginBottom: '3px' }}
        >
          <Button type="danger">删除</Button>
        </Remove>
        <ClassModal
          videoId={record.puid}
          classInfoList={classInfoList}
          classInfoDict={classInfoDict}
          tagLibraryDict={tagLibraryDict}
          reFresh={reFresh}
        />
      </div>,
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
    <div>
      <Table {...TableProps} />
    </div>
  );
};

export default List;
