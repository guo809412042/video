import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  Collapse, Form, Button, Input,
} from 'antd';

import Community from '../../../../components/Form/Community';
import styles from '../../../../styles/index.css';

const Panel = Collapse.Panel;
const FormItem = Form.Item;

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
      onSearch(values);
    });
  };
  const handleReset = () => {
    resetFields();
  };
  return (
    <Collapse defaultActiveKey={['1']}>
      <Panel header={<FormattedMessage id="common.search" defaultMessage="查询" />} key="1">
        <Form layout="inline" onSubmit={handleSubmit}>
          <FormItem label="视频Id" className={styles.marginPxForItem}>
            {
              getFieldDecorator('puid', {})(
                <Input />,
              )
            }
          </FormItem>
          <Community
            form={form}
            label="社区"
            community_key="lang"
            show_all
            className={styles.marginPxForItem}
            style={{ width: '150px' }}
          />
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
