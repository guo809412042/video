/**
 * Created with 盛丽芬.
 * User: shenglifen
 * Date: 2019/4/5
 * Time: 下午11:13
 *
 */
import React from 'react';
import {
  Collapse, Button, Table, Input, Form, Row, Modal, Pagination, Tag,
} from 'antd';
import moment from 'moment';
import {
  VideoDetail as VideoDetailModal,
  UserDetailModal,
} from '@xy/vid-components';

import AlgUnitInfoView from './AlgUnitInfoView';

import exportParams from '../utils/exportCsv';

import styles from '../../../../styles/index.css';
// 视频状态
const publishState = {
  10: '初始状态',
  0: '待审核',
  2: '审核未通过',
  3: '审核通过',
  4: '取消发布',
  5: '删除',
  6: '机器审核不通过',
  7: '机器审核通过',
  8: '人工初审不通过',
};

// 上浮状态
const floatState = {
  1: '曝光中',
  2: '待审核',
  3: '晋级',
  4: '失败',
  5: '异常移除',
  6: '过期',
};
const VideoListModal = (
  {
    form, dispatch, isVideoListVisible, videoDataSource, videoListLoading,
    current, total, currentTestId, videoAllDataSource,
    algUnitVisible, algUnitData, closeAlgVisible,
  },
) => {
  const pageSizeChange = (size) => {
    const { videoId, publishOperator } = form.getFieldsValue();
    dispatch({
      type: 'contentTest/saveData', payload: { videoListCurrent: size },
    });
    dispatch({
      type: 'contentTest/getVideoList',
      payload: { params: { id: currentTestId, puid: videoId, auid: publishOperator } },
    });
  };
  const algUnitInfo = (row) => {
    dispatch({
      type: 'contentTest/getAlgUnitData',
      payload: {
        params: {
          puid: row.puid,
          product_id: 6,
        },
      },
    });
  };
  const {
    getFieldDecorator,
  } = form;
  const columns = [
    {
      title: '视频ID',
      dataIndex: 'puid',
      key: 'puid',
      width: 150,
      render: value => <VideoDetailModal puid={value}><a>{value}</a></VideoDetailModal>,
    }, {
      title: '用户ID',
      dataIndex: 'auid',
      key: 'auid',
      width: 150,
      render: value => <UserDetailModal user_id={value}>
        <a>{value}</a>
      </UserDetailModal>,
    },
    {
      dataIndex: 'video',
      title: '视频',
      key: 'video',
      render: (text, row) => <video
        width="100%"
        src={row.file_url}
        poster={row.thumb_url} controls preload="metadata"/>,
      width: 200,
    },
    {
      dataIndex: 'description', title: '描述', key: 'description', width: 120,
    },
    {
      dataIndex: 'class',
      title: '视频类目',
      key: 'class',
      width: 120,
      render: text => text.map(v => <Tag key={v.classId}>{v.className}</Tag>),
    },
    {
      dataIndex: 'tags',
      title: '视频标签',
      key: 'tags',
      width: 120,
      render: text => text.map(v => <Tag key={v.tagId}>{v.tagName}</Tag>),
    },
    {
      dataIndex: 'create_time',
      title: '创建时间',
      key: 'create_time',
      render: text => moment(text)
        .format('YYYY-MM-DD HH:mm:ss'),
      width: 180,
    },
    {
      dataIndex: 'testData',
      title: '测试数据',
      key: 'testData',
      width: 180,
      render: (text, record) => <div>
        <div>曝光量：{record.expo}</div>
        <div>ptr：{record.expo && record.expo !== '0' ? (record.play_3s * 100 / record.expo).toFixed(2) : 0.00}%</div>
        <div>下载率：{record.expo && record.expo !== '0' ? (record.downs * 100 / record.expo).toFixed(2) : 0.00}%</div>
        <div>评论率：{record.expo && record.expo !== '0' ? (record.comments * 100 / record.expo).toFixed(2) : 0.00}%</div>
        <div>点赞率：{record.expo && record.expo !== '0' ? (record.likes * 100 / record.expo).toFixed(2) : 0.00}%</div>
        <div>转发率：{record.expo && record.expo !== '0' ? (record.shares * 100 / record.expo).toFixed(2) : 0.00}%</div>
        <a onClick={() => algUnitInfo(record)}>算法单元明细</a>
      </div>,
    },
    {
      dataIndex: 'similar_videos',
      title: '重复视频',
      key: 'similar_videos',
      width: 120,
    },
    {
      dataIndex: 'watermarks',
      title: '水印检测',
      key: 'watermarks',
      width: 120,
    },
    {
      dataIndex: 'state',
      title: '上浮状态',
      key: 'state',
      width: 120,
      render: text => floatState[text],
    },
    {
      dataIndex: 'publish_state',
      title: '视频状态',
      key: 'publish_state',
      render: text => publishState[parseInt(text, 10)],
      width: 120,
    },
  ];
  const exportList = () => {
    const dataSource = [];
    videoAllDataSource.forEach((v) => {
      const tags = [];
      const classs = [];
      v.tags.forEach(v => tags.push(v.tagName));
      v.class.forEach(v => classs.push(v.className));
      dataSource.push({
        puid: v.puid,
        auid: v.auid,
        publish_state: publishState[parseInt(v.publish_state, 10)],
        testData: `曝光量:${v.expo}|ptr:${v.expo && v.expo !== '0'
          ? (v.play_3s * 100 / v.expo).toFixed(2) : 0.00}%|下载率:${v.expo && v.expo !== '0'
          ? (v.downs * 100 / v.expo).toFixed(2) : 0.00}%|评论率:${v.expo && v.expo !== '0'
          ? (v.comments * 100 / v.expo).toFixed(2) : 0.00}%|点赞率:${v.expo && v.expo !== '0'
          ? (v.likes * 100 / v.expo).toFixed(2) : 0.00}%|转发率:${v.expo && v.expo !== '0'
          ? (v.shares * 100 / v.expo).toFixed(2) : 0.00}%`,
        similar_videos: v.similar_videos ? v.similar_videos.replace(/,/g, '|') : '',
        watermarks: v.watermarks ? v.watermarks.replace(/,/g, '|') : '',
        create_time: moment(v.create_time)
          .format('YYYY-MM-DD HH:mm:ss'),
        tags: tags.join('|'),
        class: classs.join('|'),
        video: v.file_url,
        description: v.description ? v.description.replace(/\s+/g, '') : '',
      });
    });
    exportParams({
      filename: '视频详情',
      columns,
      data: dataSource,
    });
  };
  return <Modal
    title="视频列表"
    visible={isVideoListVisible}
    onCancel={() => dispatch({
      type: 'contentTest/saveData',
      payload: { isVideoListVisible: false },
    })}
    footer={[
      <Button
        onClick={() => dispatch({
          type: 'contentTest/saveData',
          payload: { isVideoListVisible: false },
        })}
      >关闭</Button>]}
    width={1200}
  >
    <Form layout="inline">
      <Collapse defaultActiveKey={['videoModal1']}>
        <Collapse.Panel header="Search" key="videoModal1">
          <Form.Item
            label="视频id"
            className={styles.marginPxForItem}
          >
            {getFieldDecorator('videoId')(
              <Input
                style={{ width: 120 }}
              />,
            )}
          </Form.Item>
          <Form.Item
            label="发布者"
            className={styles.marginPxForItem}
          >
            {getFieldDecorator('publishOperator')(
              <Input
                style={{ width: 120 }}
              />,
            )}
          </Form.Item>
          <Form.Item
            className={styles.marginPxForItem}
          >
            <Button type="primary" onClick={() => pageSizeChange(1)}>搜索</Button>
            <Button type="primary" style={{ marginLeft: 8 }} onClick={exportList}>导出</Button>
          </Form.Item>
        </Collapse.Panel>
      </Collapse>
    </Form>
    <Row style={{ marginTop: 8 }}>
      <Table
        columns={columns}
        dataSource={videoDataSource}
        rowKey="puid"
        loading={videoListLoading}
        scroll={{ x: 1000 }}
        pagination={false}
        bordered
      />
      <Pagination
        style={{
          float: 'right',
          marginTop: 10,
        }}
        total={total}
        current={current}
        onChange={pageSizeChange}
      />
    </Row>
    <AlgUnitInfoView
      visible={algUnitVisible}
      data={algUnitData}
      closeVisible={closeAlgVisible}
    />
  </Modal>;
};

export default VideoListModal;
