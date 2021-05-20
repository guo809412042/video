import React from 'react';
import { Breadcrumb, Affix } from 'antd';
import { connect } from 'dva';
import styles from '../../../styles/index.css';

import List from './components/List';
import SearchForm from './components/SearchForm';

const VideoManage = ({ video_manage__video_list, dispatch }) => {
  const {
    tagLibraryDict,
    classInfoList,
    classInfoDict,
    pagination,
    listData,
    listLoading,
    formFields,
    commentType,
  } = video_manage__video_list;
  const SearchFormProps = {
    formFields,
    onSearch(data) {
      dispatch({
        type: 'video_manage__video_list/saveFormFields',
        payload: { data },
      });
      dispatch({
        type: 'video_manage__video_list/savePagination',
        payload: { pagination: { current: 1 } },
      });
      dispatch({ type: 'video_manage__video_list/listInit' });
    },
    reFresh() {
      dispatch({ type: 'video_manage__video_list/listInit' });
    },
  };
  const paginationOpts = {
    ...pagination,
    showQuickJumper: true,
    onChange: (current) => {
      dispatch({
        type: 'video_manage__video_list/savePagination',
        payload: { pagination: { current } },
      });
      dispatch({ type: 'video_manage__video_list/listInit' });
    },
    onShowSizeChange: (current, pageSize) => {
      dispatch({
        type: 'video_manage__video_list/savePagination',
        payload: { pagination: { current, pageSize } },
      });
      dispatch({ type: 'video_manage__video_list/listInit' });
    },
    showSizeChanger: true,
  };
  const listProps = {
    tagLibraryDict,
    classInfoList,
    classInfoDict,
    paginationOpts,
    listData,
    listLoading,
    commentType,
    reFresh() {
      dispatch({ type: 'video_manage__video_list/listInit' });
    },
  };
  return (
    <div style={{ height: window.innerHeight * 1.1 }}>
      <div className={styles.marginPx}>
        <Breadcrumb>
          <Breadcrumb.Item>视频管理</Breadcrumb.Item>
          <Breadcrumb.Item>视频列表</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Affix>
        <div className={styles.marginPx}>
          <SearchForm {...SearchFormProps} />
        </div>
      </Affix>
      <div className={styles.marginPx}>
        <List {...listProps} />
      </div>
    </div>
  );
};

export default connect(({ video_manage__video_list }) => ({ video_manage__video_list }))(VideoManage);
