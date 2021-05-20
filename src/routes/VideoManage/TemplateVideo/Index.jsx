import React from 'react';
import { connect } from 'dva';

import List from './components/List';
import Query from './components/Query';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getList();
  }

  //  获取用户分类列表
  getList = async () => {
    const { dispatch } = this.props;
    dispatch({ type: 'videoManageTemplateVideo/listInit' });
  };

  //  刷新
  reFresh = async () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'videoManageTemplateVideo/savePagination',
      payload: { pagination: { current: 1 } },
    });
    dispatch({ type: 'videoManageTemplateVideo/listInit' });
  };

  testOncancel = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'videoManageTemplateVideo/saveData',
      payload: { isTestConfigVisible: false },
    });
  };

  startTest = () => {};

  render() {
    const {
      videoManageTemplateVideo: {
        formFields, listData, listLoading, pagination, languageList, isTestConfigVisible,
      },
      dispatch,
    } = this.props;
    const ctx = this;
    const SearchFormProps = {
      formFields,
      onSearch(data) {
        dispatch({
          type: 'videoManageTemplateVideo/saveFormFields',
          payload: { data },
        });
        ctx.reFresh();
      },
      reFresh: ctx.reFresh,
      languageList,
      isTestConfigVisible,
      testOncancel: this.testOncancel,
      startTest: this.startTest,
      total: pagination.total,
    };
    const paginationOpts = {
      ...pagination,
      onChange: (current) => {
        dispatch({
          type: 'videoManageTemplateVideo/savePagination',
          payload: { pagination: { current } },
        });
        ctx.getList();
      },
      total: pagination.total,
      showTotal: total => `共 ${total} 条`,
    };
    const listProps = {
      dispatch,
      paginationOpts,
      listData,
      listLoading,
      reFresh: this.reFresh,
    };
    return (
      <div>
        <Query {...SearchFormProps} />
        <List {...listProps} />
      </div>
    );
  }
}

export default connect(({ videoManageTemplateVideo }) => ({ videoManageTemplateVideo }))(Index);
