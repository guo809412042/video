import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  Collapse, Form, Button, Input, DatePicker,
} from 'antd';

import Community from '../../../../components/Form/Community';

import styles from '../../../../styles/index.css';

const Panel = Collapse.Panel;
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const SearchForm = ({
  onSearch,
  form,
  form: {
    getFieldDecorator,
    validateFields,
    resetFields,
  },
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (err) {
        return false;
      }
      let params = {};
      params = {
        ...values,
        create_time_gte: values.create_time && values.create_time.length > 0 ? values.create_time[0].format('YYYY-MM-DD HH:mm:ss') : '',
        create_time_lte: values.create_time && values.create_time.length > 0 ? values.create_time[1].format('YYYY-MM-DD HH:mm:ss') : '',
      };
      delete params.create_time;
      onSearch(params);
    });
  };
  const handleReset = () => {
    resetFields();
  };
  return (
    <Collapse defaultActiveKey={['1']} style={{ marginTop: '15px' }}>
      <Panel header={<FormattedMessage id="common.search" defaultMessage="查询" />} key="1">
        <Form layout="inline" onSubmit={handleSubmit}>
          <Community
            className={styles.marginPxForItem}
            style={{ width: '150px' }}
            form={form}
            show_all
          />
          <FormItem label="视频Id" className={styles.marginPxForItem}>
            {
              getFieldDecorator('video_id', {})(
                <Input />,
              )
            }
          </FormItem>
          <FormItem label="用户Id" className={styles.marginPxForItem}>
            {
              getFieldDecorator('user_id', {})(
                <Input />,
              )
            }
          </FormItem>
          <FormItem label="加入敏感词列表时间" className={styles.marginPxForItem}>
            {
              getFieldDecorator('create_time', { initialValue: '' })(
                <RangePicker showTime format="YYYY-MM-DD HH:mm:ss"/>,
              )
            }
          </FormItem>
          <FormItem className={styles.marginPxForItem}>
            <Button type="primary" htmlType="submit">查询</Button>
          </FormItem>
          <FormItem className={styles.marginPxForItem}>
            <Button onClick={handleReset}>重置</Button>
          </FormItem>
        </Form>
      </Panel>
    </Collapse>
  );
};

export default Form.create()(SearchForm);
