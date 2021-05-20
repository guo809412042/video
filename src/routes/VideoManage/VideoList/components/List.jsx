import React from 'react';
import {
  Table, Button, Icon, Tag,
} from 'antd';
import intl from 'react-intl-universal';


import { Remove, Text, NextPagination } from '@xy/design';
import {
  VideoDetail as VideoDetailModal,
  UserDetailModal,
  ClassModal,
} from '@xy/vid-components';
import Video from '../../../../components/Video/Video';
import ImgEdit from '../../../../components/Text/ImgEdit';

import { PublishState, creator_status_obj } from '../../../../utils/enum';
import { alter_video_info } from '../../../../services/video';

const { NoTotalPagination } = NextPagination;

const { TextareaEdit: TextEdit } = Text;


const color = {
  '-1': '#f50',
  0: '#ccc',
  1: '#87d068',
  2: 'blue',
};
const List = ({
  tagLibraryDict,
  classInfoList,
  classInfoDict,
  listData,
  listLoading,
  paginationOpts,
  reFresh,
}) => {
  const columns = [
    {
      title: intl.get('common.VideoID').defaultMessage('视频ID'),
      key: 'id',
      dataIndex: 'id',
      render: value => <VideoDetailModal puid={value}><a>{value}</a></VideoDetailModal>,
    }, {
      title: intl.get('common.UserID').defaultMessage('用户ID'),
      key: 'user_id',
      dataIndex: 'user_id',
      render: value => <UserDetailModal user_id={value}>
        <a>{value}</a>
      </UserDetailModal>,
    }, {
      title: intl.get('common.Video').defaultMessage('视频'),
      key: 'video',
      dataIndex: 'videoPublishInfo.videorelease_path',
      width: '200',
      render: (value, record) => <div>
        <Video record={record} />
        <ImgEdit
          initialValue={record.thumb_url}
          handleSubmit={alter_video_info}
          name="thumbUrl"
          label={intl.get('common.cover').defaultMessage('封面')}
          callback={reFresh}
          pk={record.id}
        >
          <a>{intl.get('common.changeCover').defaultMessage('修改封面')}</a>
        </ImgEdit>
      </div>,
    }, {
      title: intl.get('common.description').defaultMessage('描述'),
      key: 'description',
      dataIndex: 'description',
      width: '20%',
      render: (value, record) => <div>
        <span>{ value }</span>
        <TextEdit
          initialValue={record.description}
          handleSubmit={alter_video_info}
          name="description"
          label={intl.get('common.description').defaultMessage('描述')}
          callback={reFresh}
          pk={record.id}
        >
          <Icon type="edit"/>
        </TextEdit>
      </div>,
    }, {
      title: intl.get('common.CreatorOrNot').defaultMessage('是否创作者'),
      dataIndex: 'is_creator',
      key: 'is_creator',
      render: value => <Tag color={color[value]}>{creator_status_obj[value] ? creator_status_obj[value] : value}</Tag>,
    }, {
      title: intl.get('common.CreateTime').defaultMessage('创建时间'),
      key: 'create_time',
      dataIndex: 'create_time',
    }, {
      title: intl.get('common.InteractiveData').defaultMessage('互动数据'),
      key: 'stat',
      dataIndex: 'id',
      render: (value, record) => {
        const videoStatInfo = record.videoStatInfo || {};
        return (
          <div>
            <p><strong>{intl.get('common.play').defaultMessage('播放')}：</strong>{videoStatInfo.play_count}</p>
            <p><strong>{intl.get('common.shareFB').defaultMessage('分享(FB)')}：</strong>{videoStatInfo.facebook_share_count}</p>
            <p><strong>{intl.get('common.sharewhatsapp').defaultMessage('分享(whatsapp)')}：</strong>{videoStatInfo.whatsapp_share_count}</p>
            <p><strong>{intl.get('common.comment').defaultMessage('评论')}：</strong>{videoStatInfo.comment_count}</p>
            <p><strong>{intl.get('common.like').defaultMessage('点赞')}：</strong>{videoStatInfo.like_count}</p>
            <p><strong>{intl.get('common.download').defaultMessage('下载')}：</strong>{videoStatInfo.download_count}</p>
          </div>
        );
      },
    }, {
      title: intl.get('common.videoStatus').defaultMessage('视频状态'),
      key: 'publish_state',
      dataIndex: 'publish_state',
      render: value => PublishState[value],
    }, {
      title: intl.get('common.operate').defaultMessage('操作'),
      key: 'do',
      dataIndex: 'id',
      width: '20%',
      render: (value, record) => <div>
        <Remove
          aArgs={[{ state: 1 }, value]}
          handleFun={alter_video_info}
          callback={reFresh}
          title="确认通过审核？"
        >
          <Button type="primary">{intl.get('common.reviewPassed').defaultMessage('审核通过')}</Button>
        </Remove>
        <Remove
          aArgs={[{ state: 2 }, value]}
          handleFun={alter_video_info}
          callback={reFresh}
          title="确认不通过审核？"
        >
          <Button type="danger">{intl.get('common.ReviewUnpassed').defaultMessage('审核不通过')}</Button>
        </Remove>
        <ClassModal
          videoId={record.id}
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
    pagination: false,
    dataSource: listData,
    rowKey: 'id',
  };
  return (
    <div>
      <Table {...TableProps} />
      <NoTotalPagination {...paginationOpts} />
    </div>
  );
};

export default List;
