import React from 'react';
import moment from 'moment';
import {
  Collapse, Form, Button, Input, Select, DatePicker,
} from 'antd';
import intl from 'react-intl-universal';


import styles from '../../../../styles/index.css';
import { PublishStateArray } from '../../../../utils/enum';

const Panel = Collapse.Panel;
const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;

const SearchForm = ({
  onSearch,
  form: {
    getFieldDecorator,
    validateFields,
    resetFields,
  },
  formFields,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (err) {
        return false;
      }
      console.log('Received values of form: ', values);
      let params = {};
      params = {
        ...values,
        publish_time_gte: values.time[0] ? values.time[0].format('YYYY-MM-DD HH:mm:ss') : undefined,
        publish_time_lte: values.time[0] ? values.time[1].format('YYYY-MM-DD HH:mm:ss') : undefined,
        time: undefined,
      };
      if (params.creator_type) {
        params.creator_type = JSON.stringify(params.creator_type.split(','));
      }
      onSearch(params);
    });
  };
  const handleReset = () => {
    resetFields();
  };
  return (
    <Collapse defaultActiveKey={['1']}>
      <Panel header={intl.get('common.Inquire').defaultMessage('查询')} key="1">
        <Form layout="inline" onSubmit={handleSubmit}>
          <FormItem label={intl.get('common.VideoID').defaultMessage('视频Id')} className={styles.marginPxForItem}>
            {
              getFieldDecorator('id', {})(
                <Input />,
              )
            }
          </FormItem>
          <FormItem label={intl.get('common.UserID').defaultMessage('用户Id')} className={styles.marginPxForItem}>
            {
              getFieldDecorator('user_id', {
                initialValue: formFields.user_id || null,
              })(
                <Input />,
              )
            }
          </FormItem>
          <FormItem label="vs_id" className={styles.marginPxForItem}>
            {
              getFieldDecorator('vs_id', {
                initialValue: null,
              })(
                <Input />,
              )
            }
          </FormItem>
          <FormItem label={intl.get('common.CreatorOrNot').defaultMessage('是否创作者')} className={styles.marginPxForItem}>
            {
              getFieldDecorator('creator_type', {
                initialValue: '',
              })(<Select
                style={{ width: '220px' }}
              >
                <Option value="">{intl.get('common.All').defaultMessage('全部')} </Option>
                <Option value="1,2,3">{intl.get('common.Yes').defaultMessage('是创作者(包括普通、和超级)')}</Option>
                <Option value="-1,0">{intl.get('common.NotCreator').defaultMessage('不是创作者')}</Option>
              </Select>)
            }
          </FormItem>
          <FormItem label={intl.get('common.videoStatus').defaultMessage('视频状态')} className={styles.marginPxForItem}>
            {
              getFieldDecorator('publish_state', {
                initialValue: null,
              })(<Select
                style={{ width: '150px' }}
              >
                <Option value={null}>{intl.get('common.All').defaultMessage('全部')} </Option>
                {
                  PublishStateArray.map(v => <Option value={v.key.toString()} key={v.key}>{v.value}</Option>)
                }
              </Select>)
            }
          </FormItem>
          <FormItem label={intl.get('common.time').defaultMessage('时间')} className={styles.marginPxForItem}>
            {
              getFieldDecorator('time', {
                initialValue: formFields.publish_time_gte ? [moment(formFields.publish_time_gte), moment(formFields.publish_time_lte)] : [],
              })(
                <RangePicker
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  placeholder={['开始时间', '结束时间']}
                />,
              )
            }
          </FormItem>
          <FormItem className={styles.marginPxForItem}>
            <Button type="primary" htmlType="submit">{intl.get('common.Inquire').defaultMessage('查询')}</Button>
          </FormItem>
          <FormItem className={styles.marginPxForItem}>
            <Button onClick={handleReset}>{intl.get('common.Reset').defaultMessage('重置')}</Button>
          </FormItem>
        </Form>
      </Panel>
    </Collapse>
  );
};

export default Form.create()(SearchForm);
