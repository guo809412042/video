/**
 * Created with 盛丽芬.
 * User: shenglifen
 * Date: 2019/4/5
 * Time: 下午11:35
 *
 */
import React from 'react';
import {
  Tabs, Button, Modal, Form, Row, Table, Input, message,
} from 'antd';
import numeral from 'numeral';
import moment from 'moment';
import _ from 'lodash';
import cookies from 'js-cookie';
import {
  VideoDetail as VideoDetailModal,
  UserDetailModal,
  SearchAuid,
} from '@xy/vid-components';
import InsertVideoSearchView from './InsertVideoSearchView';
import InsertVideoHandView from './InsertVideoHandView';
import { exportVideoList } from '../utils/exportVideoList';
import AlgUnitInfoView from './AlgUnitInfoView';

import styles from '../../../../styles/index.css';

const { confirm } = Modal;

const TabPane = Tabs.TabPane;
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
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 10 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

class InsertTestModal extends React.Component {
  state = {
  }

  startTest = () => {
    const _this = this;
    const { insertTestDataSource, form } = this.props;
    form.validateFields(['description', 'exposure', 'videoTotal'], (err, value) => {
      if (err) {
        return false;
      }
      const { videoTotal, description, exposure } = value;
      if (Number(videoTotal) > insertTestDataSource.length) {
        message.warning('测试视频量应小于等于召回视频数目！');
        return false;
      } if (Number(videoTotal) > 1000) {
        message.warning('测试视频量应小于1000！');
        return false;
      } if (Number(videoTotal) * Number(exposure) >= 1000000) {
        message.warning('测试视频量*流量扶持应小于<1 million！');
        return false;
      } if (Number(exposure) > 5000) {
        confirm({
          title: '确定流量扶持高于每个视频5000?',
          onOk() {
            _this.startTestOk(insertTestDataSource, videoTotal, description, exposure);
          },
          onCancel() {},
        });
      } else {
        _this.startTestOk(insertTestDataSource, videoTotal, description, exposure);
      }
    });
  }

  startTestOk = (insertTestDataSource, videoTotal, description, exposure) => {
    const { insertOk } = this.props;
    const videoList = [];
    for (const i of insertTestDataSource.slice(0, Number(videoTotal))) {
      videoList.push({
        puid: i._source.puid,
        auid: i._source.auid,
        similar_videos: i._source.similar_videos,
        watermarks: i._source.watermarks,
        data: i._source.alg_unit_info,
      });
    }
    const data = {
      videoList: JSON.stringify(videoList),
      videoTotal,
      description,
      exposure,
      operator: JSON.parse(cookies.get('user')).user.username,
    };
    insertOk(data);
  }

  testConfig = () => {
    const { dispatch, insertTestDataSource } = this.props;
    if (!insertTestDataSource.length) {
      message.warning('请先选择召回视频！');
      return false;
    }
    dispatch({
      type: 'contentTest/saveData', payload: { isTestConfigVisible: true },
    });
  }

  removeVideo = (_id) => {
    const { insertTestDataSource, dispatch } = this.props;
    let dataSource = _.cloneDeep(insertTestDataSource);
    dataSource = dataSource.filter(v => v._id !== _id);
    dispatch({
      type: 'contentTest/saveData', payload: { insertTestDataSource: dataSource },
    });
  }

  exportVideoList = () => {
    const { insertTestDataSource } = this.props;
    exportVideoList(insertTestDataSource);
  }

  algUnitInfo = (row) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'contentTest/saveData',
      payload: {
        algUnitVisible: true,
        algUnitData: row,
      },
    });
  }

  render() {
    const {
      isInsetTestVisible,
      insertLoading,
      dispatch,
      insertTestDataSource,
      isTestConfigVisible,
      languageList,
      confirmRecall,
      algUnitVisible,
      algUnitData,
      form,
      closeAlgVisible,
      form: {
        getFieldDecorator,
      },
    } = this.props;
    const insertVideoSearchProps = {
      isInsetTestVisible,
      insertLoading,
      dispatch,
      insertTestDataSource,
      isTestConfigVisible,
      languageList,
      confirmRecall,
      form,
    };
    const columns = [
      {
        dataIndex: '_index_', title: '序号', key: '_index_', width: 50,
      },
      {
        title: '视频ID',
        dataIndex: '_source.puid',
        key: '_source.puid',
        width: 150,
        render: value => <VideoDetailModal puid={value}><a>{value}</a></VideoDetailModal>,
      }, {
        title: '用户ID',
        dataIndex: '_source.auid',
        key: '_source.auid',
        width: 150,
        render: value => <UserDetailModal user_id={value}>
          <a>{value}</a>
        </UserDetailModal>,
      },
      {
        dataIndex: '_source.video_url',
        title: '视频',
        key: '_source.video_url',
        render: (value, record) => <video
          width={150}
          src={record._source.video_url || record._source.origin.video_url}
          poster={record._source.image_url || record._source.origin.image_url}
          controls
          preload="none"
          autoPlay={false}
        />,
      },
      {
        dataIndex: '_source.desc', title: '描述', key: '_source.desc', width: 200,
      },
      {
        dataIndex: '_source.publish_time',
        title: '创建时间',
        key: '_source.publish_time',
        width: 180,
        render: text => moment(text)
          .format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        dataIndex: 'interactiveData',
        title: '互动数据',
        key: 'interactiveData',
        width: 200,
        render: (value, record) => <div>
          <div>ptr: {numeral(record._source.ptr)
            .format('00.00%')}</div>
          <div>dtr: {numeral(record._source.dtr)
            .format('00.00%')}</div>
          <div>expose_cnt: {record._source.expose_cnt}</div>
          <div>play_cnt: {record._source.play_cnt}</div>
          <div>forward_cnt: {record._source.forward_cnt}</div>
          <div>download_cnt: {record._source.download_cnt}</div>
          <div>comment_cnt: {record._source.comment_cnt}</div>
          <div>like_cnt: {record._source.like_cnt}</div>
          <a onClick={() => this.algUnitInfo(record._source.alg_unit_info)}>算法单元明细</a>
        </div>,
      },
      {
        dataIndex: '_source.similar_videos',
        title: '重复视频',
        key: '_source.similar_videos',
        width: 120,
      },
      {
        dataIndex: '_source.watermarks',
        title: '水印检测',
        key: '_source.watermarks',
        width: 120,
      },
      {
        dataIndex: '_source.state',
        title: '视频状态',
        key: '_source.state',
        width: 120,
        render: text => publishState[text],
      },
      {
        dataIndex: 'action',
        title: '操作',
        key: 'action',
        render: (text, row) => <Button
          type="danger"
          onClick={() => this.removeVideo(row._id)}>移除</Button>,
      },
    ];
    return <Modal
      title="新建测试"
      visible={isInsetTestVisible}
      onCancel={() => dispatch({
        type: 'contentTest/saveData',
        payload: { isInsetTestVisible: false },
      })}
      footer={[
        <Button
          onClick={() => dispatch({
            type: 'contentTest/saveData',
            payload: { isInsetTestVisible: false },
          })}
        >关闭</Button>]}
      width={1200}
    >
      <SearchAuid />
      <Tabs type="card" defaultActiveKey="1">
        <TabPane tab="按条件召回视频进行测试" key="1">
          <InsertVideoSearchView
            {...insertVideoSearchProps}
          />
        </TabPane>
        <TabPane tab="手动上传视频列表进行测试" key="2">
          <InsertVideoHandView
            dispatch={dispatch}
          />
        </TabPane>
      </Tabs>
      <Row className={styles.marginPxForItem}>
        <Button style={{ marginRight: 10 }} onClick={this.exportVideoList}>导出</Button>
        <Button type="primary" onClick={this.testConfig}>测试设置</Button>
        <Table
          className={styles.marginPxForItem}
          dataSource={insertTestDataSource}
          columns={columns}
          rowKey="_id"
          loading={insertLoading}
          bordered
        />
      </Row>
      <Modal
        width={600}
        title="测试设置"
        visible={isTestConfigVisible}
        onCancel={() => dispatch({
          type: 'contentTest/saveData',
          payload: { isTestConfigVisible: false },
        })}
        footer={[
          <Button
            onClick={this.startTest}
          >开始测试</Button>]}
      >
        <Form>
          <Form.Item
            label="测试说明"
            className={styles.marginPxForItem}
            {...formItemLayout}
          >
            {getFieldDecorator('description', {
              rules: [{ required: true, message: '必填' }],
            })(
              <Input
                style={{ width: 120 }}
              />,
            )}
          </Form.Item>
          <Form.Item
            label="测试视频量（序号前x）"
            className={styles.marginPxForItem}
            {...formItemLayout}
          >
            {getFieldDecorator('videoTotal', {
              rules: [{ required: true, message: '必填' }],
            })(
              <Input
                style={{ width: 120 }}
                type="number"
              />,
            )}
          </Form.Item>
          <Form.Item
            label="曝光扶持（次）"
            className={styles.marginPxForItem}
            {...formItemLayout}
          >
            {getFieldDecorator('exposure', {
              rules: [{ required: true, message: '必填' }],
            })(
              <Input
                style={{ width: 120 }}
                type="number"
              />,
            )}
          </Form.Item>
        </Form>
      </Modal>
      <AlgUnitInfoView
        visible={algUnitVisible}
        data={algUnitData}
        closeVisible={closeAlgVisible}
      />
    </Modal>;
  }
}

export default InsertTestModal;
