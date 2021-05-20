/* eslint-disable react/prefer-stateless-function */
/**
 * Created with 盛丽芬.
 * User: shenglifen
 * Date: 2019/5/9
 * Time: 上午11:41
 *
 */
import React from 'react';
import moment from 'moment';
import {
  DatePicker, Select, Input, Row, Button, Form,
} from 'antd';
import styles from '../../../../styles/index.css';
import ClassTree from '../../../../components/ClassManage/ClassTree';

const { RangePicker } = DatePicker;
const Option = Select.Option;
const videoTypeList = [
  {
    key: '0',
    value: 'unknow',
  }, {
    key: '1',
    value: 'shotting',
  }, {
    key: '2',
    value: 'lyric',
  }, {
    key: '3',
    value: 'clip',
  }, {
    key: '4',
    value: 'whatsapp',
  }, {
    key: '5',
    value: 'h5temp',
  }, {
    key: '6',
    value: 'duet',
  },
];

class InsertVideoSearchView extends React.Component {
  render() {
    const {
      form,
      form: {
        getFieldDecorator,
      },
      languageList,
    } = this.props;
    return <div>
      <Form layout="inline">
        <Form.Item
          label="排序依据"
          className={styles.marginPxForItem}
        >
          {getFieldDecorator('sort', {
            initialValue: '_order__publish_time|asc',
            rules: [{ required: true, message: 'Please Input message' }],
          })(
            <Select
              style={{ width: 200 }}
            >
              <Select.Option
                key="_order__publish_time|asc"
                value="_order__publish_time|asc">按发布时间升序</Select.Option>
              <Select.Option
                key="_order__publish_time|desc"
                value="_order__publish_time|desc">按发布时间降序</Select.Option>
              <Select.Option
                key="_order__expose_cnt|asc"
                value="_order__expose_cnt|asc">播放量升序</Select.Option>
              <Select.Option
                key="_order__expose_cnt|desc"
                value="_order__expose_cnt|desc">播放量降序</Select.Option>
              <Select.Option key="_order__ptr|asc" value="_order__ptr|asc">PTR升序</Select.Option>
              <Select.Option
                key="_order__ptr|desc"
                value="_order__ptr|desc">PTR降序</Select.Option>
              <Select.Option key="_order__dtr|asc" value="_order__dtr|asc">DTR升序</Select.Option>
              <Select.Option
                key="_order__dtr|desc"
                value="_order__dtr|desc">DTR降序</Select.Option>
            </Select>,
          )}
        </Form.Item>
        <Form.Item
          label="召回数量"
          className={styles.marginPxForItem}
        >
          {getFieldDecorator('pageSize', {
            rules: [{ required: true, message: 'Please Input message' }],
          })(
            <Input
              style={{ width: 120 }}
              type="number"
            />,
          )}
        </Form.Item>
        <Row style={{ borderTop: '1px solid #eee' }} className={styles.marginPxForItem}>
          <ClassTree
            form={form}
            className={styles.marginPxForItem}
            style={{ width: 200 }}
            allowClear
            label="内容分类"
            placeholder="内容分类"
            dropdownStyle={{ height: '240px', overflowY: 'auto' }}
            paramKey="contentClass"
          />
          <Form.Item
            label="内容语言"
            className={styles.marginPxForItem}
          >
            {getFieldDecorator('lang')(
              <Select
                style={{ width: 120 }}
                allowClear
              >
                {languageList.map(v => <Select.Option
                  key={v.className}
                  value={v.className}>{v.className}</Select.Option>)}
              </Select>,
            )}
          </Form.Item>
          <Form.Item
            label="爬虫任务id"
            className={styles.marginPxForItem}
          >
            {getFieldDecorator('task_id')(
              <Input
                style={{ width: 200 }}
              />,
            )}
          </Form.Item>
          <Form.Item
            label="视频id"
            className={styles.marginPxForItem}
          >
            {getFieldDecorator('puid')(
              <Input
                style={{ width: 120 }}
              />,
            )}
          </Form.Item>
          <Form.Item
            label="最小曝光"
            className={styles.marginPxForItem}
          >
            {getFieldDecorator('expose_cnt__gte')(
              <Input
                style={{ width: 120 }}
                type="number"
              />,
            )}
          </Form.Item>
          <Form.Item
            label="发布者"
            className={styles.marginPxForItem}
          >
            {getFieldDecorator('auid')(
              <Input
                style={{ width: 120 }}
              />,
            )}
          </Form.Item>
          <Form.Item
            label="内容标签"
            className={styles.marginPxForItem}
          >
            {getFieldDecorator('tag_ids')(
              <Input
                style={{ width: 120 }}
              />,
            )}
          </Form.Item>
          <Form.Item
            label="视频素材id"
            className={styles.marginPxForItem}
          >
            {getFieldDecorator('template')(
              <Input
                style={{ width: 200 }}
              />,
            )}
          </Form.Item>
          <Form.Item label="视频来源" className={styles.marginPxForItem}>
            {
              getFieldDecorator('video_type', {
                initialValue: '',
              })(
                <Select style={{ width: '120px' }}>
                  <Option value="">全部</Option>
                  {
                    videoTypeList.map(item => <Option value={item.value} key={item.value}>{ item.value }</Option>)
                  }
                </Select>,
              )
            }
          </Form.Item>
          <Form.Item
            label="发布时间"
            className={styles.marginPxForItem}
          >
            {getFieldDecorator('publish_time', {
              initialValue: [moment()
                .subtract(7, 'days'), moment()
                .subtract(1, 'days')],
            })(
              <RangePicker/>,
            )}
          </Form.Item>
          <Form.Item
            className={styles.marginPxForItem}
          >
            <Button type="primary" onClick={this.props.confirmRecall}>确认召回</Button>
          </Form.Item>
        </Row>
      </Form>
    </div>;
  }
}

export default InsertVideoSearchView;
