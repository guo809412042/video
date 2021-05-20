/**
 * Created with 盛丽芬.
 * User: shenglifen
 * Date: 2019/4/5
 * Time: 下午7:55
 *
 */
import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import MainList from './components/MainList';

const ContentTestIndex = ({ form, contentTest, dispatch }) => (
  <div>
    <MainList form={form} contentTest={contentTest} dispatch={dispatch} />
  </div>
);

export default connect(({ contentTest }) => ({ contentTest }))(Form.create()(ContentTestIndex));
