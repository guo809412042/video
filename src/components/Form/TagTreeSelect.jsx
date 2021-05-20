import React from 'react';
import { TreeSelect, Form, Select } from 'antd';

import { get_tag_node } from '../../services/class-manage';

const Option = Select.Option;

const Color = {
  '#f50': 1,
  '#2db7f5': 2,
  '#87d068': 3,
};

const ChangeLabel = array => array.map((v) => {
  const value = {};
  value.label = <span style={{ color: Color[v.tag.type] }}>{v.tag.displayName.toLowerCase()}</span>;
  value.labelFilter = v.tag.displayName.toLowerCase();
  value.value = typeof v.tag.id !== 'string' ? v.tag.id.toString() : v.tag.id;
  value.key = v.tag.id;
  if ('childTags' in v) {
    value.children = ChangeLabel(v.childTags);
  }
  return value;
});

const FormItem = Form.Item;

class TagTreeSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      onlyTags: [],
    };
  }

  componentDidMount = async () => {
    const { tagsAll } = this.props;
    const tagsLimit = [];
    let {
      data: { data: Tags },
    } = await get_tag_node({ node: 0 });
    if (tagsAll) {
      tagsAll.map((v) => {
        tagsLimit.push(v.id);
        if (v.children) {
          v.children.map((vv) => {
            tagsLimit.push(vv.id);
          });
        }
      });
      Tags = Tags.filter((v) => {
        if (tagsLimit.includes(v.tag.id)) {
          if (v.childTags) {
            v.childTags.map((vv) => {
              if (tagsLimit.includes(vv.tag.id)) return vv;
            });
          }
          return v;
        }
      });
    }
    const tags = ChangeLabel(Tags);
    const onlyTags = Tags.map(v => ({
      value: v.tag.id,
      label: v.tag.displayName,
    }));
    onlyTags.unshift({ value: '0', label: '根节点' });
    this.setState({ tags, onlyTags });
  };

  render() {
    const {
      form: { getFieldDecorator },
      className,
      width,
      rules,
      initialValue,
      formItemLayout,
      only,
      singleSelect,
      label,
      treeNodeFilterProp,
      onChange,
    } = this.props;
    const { tags, onlyTags } = this.state;
    const _only = only || false;
    const tProps = {
      treeData: tags,
      multiple: true,
      treeCheckable: true,
      searchPlaceholder: 'Please select',
      treeNodeFilterProp: treeNodeFilterProp || 'value',
      allowClear: true,
      dropdownMatchSelectWidth: false,
      showCheckedStrategy: TreeSelect.SHOW_PARENT,
      treeCheckStrictly: true,
      style: { width: width || 150 },
      dropdownStyle: { height: 600 },
      showSearch: true,
      onChange,
    };
    if (singleSelect) {
      tProps.multiple = false;
      tProps.treeCheckable = false;
    }
    if (_only) {
      return (
        <FormItem label={label || '标签'} className={className} {...formItemLayout}>
          {getFieldDecorator('node', {
            initialValue,
          })(
            <Select style={{ width: 150 }}>
              {onlyTags.map(v => (
                <Option key={v.value}>{v.label}</Option>
              ))}
            </Select>,
          )}
        </FormItem>
      );
    }
    return (
      <FormItem label={label || '标签'} className={className} {...formItemLayout}>
        {getFieldDecorator('topics', {
          initialValue,
          rules,
        })(<TreeSelect {...tProps} />)}
      </FormItem>
    );
  }
}

export default Form.create()(TagTreeSelect);
