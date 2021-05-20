/**
 * Created with 盛丽芬.
 * User: shenglifen
 * Date: 2019/4/5
 * Time: 下午10:25
 *
 */
import React from 'react';
import {
  Input, Form, Row, Button, Collapse, DatePicker, Table, message,
} from 'antd';
import moment from 'moment';
import cookie from 'js-cookie';
import styles from '../../../../styles/index.css';

import ConfigShowModal from './ConfigShowModal';
import VideoListModal from './VideoListModal';
import InsertTestModal from './InsertTestModal';
import { exportTestList } from '../utils/exportVideoList';

const { RangePicker } = DatePicker;
export default class MainList extends React.Component {
  async componentDidMount() {
    const { dispatch } = this.props;
    await this.initData();
    dispatch({
      type: 'contentTest/getClassList',
    });
  }

  initData = async () => {
    const { testId, testOperator, testTime } = this.props.form.getFieldsValue();
    const { dispatch } = this.props;
    const params = {};
    testId && (params.id = testId);
    testOperator && (params.operator = testOperator);
    testTime[0] && (params.startDate = moment(testTime[0])
      .format('YYYY-MM-DD'));
    testTime[0] && (params.endDate = moment(testTime[1])
      .format('YYYY-MM-DD'));
    dispatch({ type: 'contentTest/initList', payload: { params } });
  }

  configVisibleShow = (row) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'contentTest/saveData', payload: { isConfigVisible: true, testConfigDetail: row },
    });
  }

  videoListVisibleShow = async (row) => {
    const { dispatch, form } = this.props;
    const { videoId, publishOperator } = form.getFieldsValue();
    await dispatch({
      type: 'contentTest/saveData',
      payload: {
        videoListCurrent: 1,
        videoDataSource: [],
        videoListTotal: 0,
      },
    });
    await dispatch({
      type: 'contentTest/getVideoList',
      payload: { params: { id: row.id, puid: videoId, auid: publishOperator } },
    });
    await dispatch({
      type: 'contentTest/getVideoAllList',
      payload: { params: { id: row.id, puid: videoId, auid: publishOperator } },
    });
  }

  insertTestClick = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'contentTest/saveData', payload: { isInsetTestVisible: true },
    });
  }

  confirmRecall = () => {
    const { contentTest: { classList }, dispatch } = this.props;
    const {
      publish_time, pageSize, sort, contentClass, auid, puid, task_id, tag_ids, lang, expose_cnt__gte, template, video_type,
    } = this.props.form.getFieldsValue();
    if (!sort) {
      message.warning('排序顺序必选');
      return false;
    }
    if (!pageSize) {
      message.warning('召回数量必选');
      return false;
    }
    const params = {
      'match|template': template,
      video_type,
      product_id: cookie.get('PRODUCT_ID') || localStorage.getItem('PRODUCT_ID'),
    };
    params[sort.split('|')[0]] = sort.split('|')[1];
    if (contentClass) {
      const find = classList.find(v => Number(v.id) === Number(contentClass));
      if (find) {
        params.tag_parent_id_list = contentClass;
      } else {
        params.tag_child_id_list = contentClass;
      }
    }
    params.pageSize = pageSize;
    publish_time && publish_time.length > 0 && (params.publish_time__gte = moment(`${moment(publish_time[0])
      .format('YYYY-MM-DD')} 00:00:00`)
      .valueOf());
    publish_time && publish_time.length > 0 && (params.publish_time__lte = moment(`${moment(publish_time[1])
      .format('YYYY-MM-DD')} 23:59:59`)
      .valueOf());
    auid && (params.auid = auid);
    puid && (params.puid = puid);
    task_id && (params.task_id = task_id);
    tag_ids && (params.tag_ids = tag_ids);
    lang && (params.lang = lang);
    expose_cnt__gte && (params.expose_cnt__gte = expose_cnt__gte);
    dispatch({
      type: 'contentTest/getRecallVideoList', payload: { params },
    });
  }

  insertOk = async (data) => {
    const { dispatch } = this.props;
    await dispatch({
      type: 'contentTest/postContentTest', payload: { data },
    });
    await this.initData();
  }

  exportData = () => {
    exportTestList(this.props.contentTest.mainDataSource);
  }

  closeAlgVisible = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'contentTest/saveData',
      payload: {
        algUnitVisible: false,
      },
    });
  }

  render() {
    const {
      form: {
        getFieldDecorator,
      },
      contentTest: {
        mainDataSource,
        isConfigVisible,
        isVideoListVisible,
        videoDataSource,
        isInsetTestVisible,
        insertTestDataSource,
        isTestConfigVisible,
        insertLoading,
        mainLoading,
        testConfigDetail,
        videoListLoading,
        videoListCurrent,
        videoListTotal,
        currentTestId,
        languageList,
        videoAllDataSource,
        algUnitVisible,
        algUnitData,
      },
      dispatch,
      form,
    } = this.props;
    const columns = [
      { dataIndex: 'id', title: '测试id', key: 'id' },
      { dataIndex: 'description', title: '测试说明', key: 'description' },
      {
        dataIndex: 'create_time',
        title: '测试日期',
        key: 'create_time',
        render: text => moment(text)
          .format('YYYY-MM-DD HH:mm:ss'),
      },
      { dataIndex: 'video_total', title: '测试总数', key: 'video_total' },
      {
        dataIndex: 'data',
        title: '数据表现',
        key: 'data',
        render: (text, record) => <div>
          <div>曝光量：{record.expo}</div>
          <div>ptr：{record.expo && record.expo !== '0' ? (record.play_3s * 100 / record.expo).toFixed(2) : 0.00}%</div>
          <div>下载率：{record.expo && record.expo !== '0' ? (record.downs * 100 / record.expo).toFixed(2) : 0.00}%</div>
          <div>评论率：{record.expo && record.expo !== '0' ? (record.comments * 100 / record.expo).toFixed(2) : 0.00}%</div>
          <div>点赞率：{record.expo && record.expo !== '0' ? (record.likes * 100 / record.expo).toFixed(2) : 0.00}%</div>
          <div>转发率：{record.expo && record.expo !== '0' ? (record.shares * 100 / record.expo).toFixed(2) : 0.00}%</div>
        </div>,
      },
      {
        dataIndex: 'detail',
        title: '测试详情设置',
        key: 'detail',
        render: (text, row) => <Button
          type="primary"
          onClick={() => this.configVisibleShow(row)}>查看设置</Button>,
      },
      {
        dataIndex: 'detail_video',
        title: '视频详情',
        key: 'detail_video',
        render: (text, row) => <Button
          type="primary"
          onClick={() => this.videoListVisibleShow(row)}>视频列表</Button>,
      },
      { dataIndex: 'operator', title: '操作账号', key: 'operator' },
    ];
    return <div style={{ marginTop: 15 }}>
      <Row>
        <Form layout="inline">
          <Collapse defaultActiveKey={['1']}>
            <Collapse.Panel header="Search" key="1">
              <Form.Item
                label="测试id"
                className={styles.marginPxForItem}
              >
                {getFieldDecorator('testId')(
                  <Input style={{ width: 120 }} />,
                )}
              </Form.Item>
              <Form.Item
                label="测试时间"
                className={styles.marginPxForItem}
              >
                {getFieldDecorator('testTime', {
                  initialValue: [moment().subtract(7, 'days'), moment().subtract(0, 'days')],
                })(
                  <RangePicker />,
                )}
              </Form.Item>
              <Form.Item
                label="测试账号"
                className={styles.marginPxForItem}
              >
                {getFieldDecorator('testOperator')(
                  <Input />,
                )}
              </Form.Item>
              <Form.Item
                className={styles.marginPxForItem}>
                <Button type="primary" onClick={this.initData}>搜索</Button>
                <Button type="primary" style={{ marginLeft: 8 }}
                  onClick={this.exportData}>导出</Button>
              </Form.Item>
            </Collapse.Panel>
          </Collapse>
        </Form>
      </Row>
      <Row className={styles.marginPxForItem}>
        <Button type="primary" icon="plus" onClick={this.insertTestClick}>新建测试</Button>
        <Table
          className={styles.marginPxForItem}
          columns={columns}
          dataSource={mainDataSource}
          rowKey="id"
          loading={mainLoading}
          bordered
        />
      </Row>
      <ConfigShowModal
        isConfigVisible={isConfigVisible}
        dispatch={dispatch}
        testConfigDetail={testConfigDetail}
      />
      <VideoListModal
        dispatch={dispatch}
        form={form}
        isVideoListVisible={isVideoListVisible}
        videoDataSource={videoDataSource}
        videoListLoading={videoListLoading}
        current={videoListCurrent}
        total={videoListTotal}
        currentTestId={currentTestId}
        videoAllDataSource={videoAllDataSource}
        closeAlgVisible={this.closeAlgVisible}
        algUnitVisible={algUnitVisible}
        algUnitData={algUnitData}
      />
      <InsertTestModal
        form={form}
        dispatch={dispatch}
        isInsetTestVisible={isInsetTestVisible}
        insertTestDataSource={insertTestDataSource}
        isTestConfigVisible={isTestConfigVisible}
        confirmRecall={this.confirmRecall}
        insertLoading={insertLoading}
        insertOk={this.insertOk}
        languageList={languageList}
        algUnitVisible={algUnitVisible}
        algUnitData={algUnitData}
        closeAlgVisible={this.closeAlgVisible}
      />
    </div>;
  }
}
