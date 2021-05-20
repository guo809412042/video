import React from 'react';
import { Form, Select } from 'antd';

import { LANGGUAGE_TAG_ID_PARENT } from '../../utils/const';
import { langArr } from '../../utils/enum';
import { get_tag_node } from '../../services/class-manage';

const DEFAULT_OPTION_DATA_FORM = 1; //  默认数据来源： langArr
const OPTION_DATA_FORM_TAGINFO = 2; //  数据来源： tag_info 获取
const FormItem = Form.Item;
const Option = Select.Option;
class Community extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      community_list: [],
    };
  }

  componentDidMount() {
    this.get_community();
  }

  get_community = async () => {
    const {
      data: { data: community_list },
    } = await get_tag_node({ node: LANGGUAGE_TAG_ID_PARENT });
    this.setState({ community_list });
  };

  //  社区改变
  community_change = (value) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
  };

  render() {
    const {
      community_key, //  供后端使用的key
      className,
      formitemlayout,
      label, //  显示的名字
      rules,
      form: { getFieldDecorator },
      initialValue, //  初始值
      show_all, //  下拉框中是否显示  全部  这个选项， 一般用于查询
      style,
      disabled,
      mode, //  单选或多选
      allowClear,
      data_from, //  数据来源: 1、默认硬编码  2、后台获取
      no_en,
    } = this.props;
    const { community_list } = this.state;
    let Options;
    const data_from_where = data_from || DEFAULT_OPTION_DATA_FORM;
    if (data_from_where === DEFAULT_OPTION_DATA_FORM) {
      //  1、默认硬编码
      if (no_en) {
        Options = langArr.map((item) => {
          if (item.key !== 'en') {
            return (
              <Option value={item.key} key={item.key}>
                {item.value}
              </Option>
            );
          }
        });
      } else {
        Options = langArr.map(item => (
          <Option value={item.key} key={item.key}>
            {item.value}
          </Option>
        ));
      }
    } else if (data_from_where === OPTION_DATA_FORM_TAGINFO) {
      //  2、后台获取
      Options = community_list.map(item => (
        <Option value={String(item.tag.id)} key={String(item.tag.id)}>
          {item.tag.displayName}
        </Option>
      ));
    }
    //  查询到时候加上  全部  这个选项
    show_all && Options.unshift(<Option value="">全部</Option>);
    return (
      <FormItem label={label || '社区'} {...formitemlayout} className={className}>
        {getFieldDecorator(community_key || 'community', {
          initialValue,
          rules,
        })(
          <Select
            style={style}
            disabled={disabled}
            mode={mode || ''}
            allowClear={allowClear}
            onChange={this.community_change}
          >
            {Options}
          </Select>,
        )}
      </FormItem>
    );
  }
}

export default Form.create()(Community);
