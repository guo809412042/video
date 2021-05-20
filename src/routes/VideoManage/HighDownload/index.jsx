import React from 'react';
import { Affix, Spin } from 'antd';
import { connect } from 'dva';

import List from './components/List';
import SearchForm from './components/SearchForm';

import styles from '../../../styles/index.css';

const VideoHighDownload = ({ video_high_download, dispatch }) => {
  const {
    pagination,
    listData,
    listLoading,
    formFields,
    classInfoList,
    classInfoDict,
    tagLibraryDict,
  } = video_high_download;
  const SearchFormProps = {
    formFields,
    onSearch(data) {
      dispatch({
        type: 'video_high_download/saveFormFields',
        payload: { data },
      });
      dispatch({
        type: 'video_high_download/savePagination',
        payload: { pagination: { current: 1, lastId: undefined } },
      });
      dispatch({ type: 'video_high_download/listInit' });
    },
    reFresh() {
      dispatch({ type: 'video_high_download/listInit' });
    },
  };
  const listProps = {
    paginationOpts: {
      ...pagination,
      onChange(current) {
        dispatch({
          type: 'video_high_download/savePagination',
          payload: { pagination: { current, lastId: undefined } },
        });
        dispatch({ type: 'video_high_download/listInit' });
      },
      onShowSizeChange(pageSize) {
        dispatch({
          type: 'video_high_download/savePagination',
          payload: { pagination: { pageSize, lastId: undefined } },
        });
        dispatch({ type: 'video_high_download/listInit' });
      },
    },
    classInfoList,
    classInfoDict,
    tagLibraryDict,
    listData,
    listLoading,
    formFields,
    reFresh() {
      dispatch({ type: 'video_high_download/listInit' });
    },
  };
  return (
    <div style={{ height: window.innerHeight * 1.1 }}>
      <Affix>
        <div className={styles.marginPx}>
          <SearchForm {...SearchFormProps} />
        </div>
      </Affix>
      <Spin spinning={listLoading}>
        <div className={styles.marginPx}>
          <List {...listProps} />
        </div>
      </Spin>
    </div>
  );
};

export default connect(({ video_high_download }) => ({ video_high_download }))(VideoHighDownload);
