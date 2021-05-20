import React from 'react';
import { connect } from 'dva';

import List from './components/List';
import Query from './components/Query';

class Index extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    this.get_invite_record();
    dispatch({ type: 'video_manage__dangerous_words_video/getClassInfoList' });
    dispatch({ type: 'video_manage__dangerous_words_video/getTagLibraryList' });
  }

  //  获取邀请记录
  get_invite_record = async () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'video_manage__dangerous_words_video/listInit',
    });
  };

  render() {
    const {
      video_manage__dangerous_words_video: {
        formFields,
        listData,
        listLoading,
        pagination,
        classInfoList,
        classInfoDict,
        tagLibraryDict,
      },
      dispatch,
    } = this.props;
    const SearchFormProps = {
      formFields,
      onSearch(data) {
        dispatch({
          type: 'video_manage__dangerous_words_video/saveFormFields',
          payload: { data },
        });
        dispatch({
          type: 'video_manage__dangerous_words_video/savePagination',
          payload: { pagination: { current: 1 } },
        });
        dispatch({ type: 'video_manage__dangerous_words_video/listInit' });
      },
      reFresh() {
        dispatch({ type: 'video_manage__dangerous_words_video/listInit' });
      },
    };
    const paginationOpts = {
      ...pagination,
      onChange: (current) => {
        dispatch({
          type: 'video_manage__dangerous_words_video/savePagination',
          payload: { pagination: { current } },
        });
        dispatch({ type: 'video_manage__dangerous_words_video/listInit' });
      },
      onShowSizeChange: (current, pageSize) => {
        dispatch({
          type: 'video_manage__dangerous_words_video/savePagination',
          payload: { pagination: { current, pageSize } },
        });
        dispatch({ type: 'video_manage__dangerous_words_video/listInit' });
      },
      showSizeChanger: true,
      pageSizeOptions: ['10', '12', '15', '30'],
    };
    const listProps = {
      classInfoList,
      classInfoDict,
      tagLibraryDict,
      dispatch,
      paginationOpts,
      listData,
      listLoading,
      reFresh() {
        dispatch({ type: 'video_manage__dangerous_words_video/listInit' });
      },
    };
    return (
      <div>
        <Query {...SearchFormProps} />
        <List {...listProps} />
      </div>
    );
  }
}

export default connect(({ video_manage__dangerous_words_video }) => ({ video_manage__dangerous_words_video }))(Index);
