import React, { Component } from 'react';
import { TreeSelect, Form, Select } from 'antd';

import { get_class_by_pid } from '../../services/class-manage';

const Option = Select.Option;
const FormItem = Form.Item;
class ClassTree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
    };
  }

  componentDidMount() {
    this.get_class(this.props.classTreeData);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.classTreeData !== this.props.classTreeData) {
      this.get_class(nextProps.classTreeData);
    }
  }

  triggerChange = (value) => {
    const { onChange } = this.props;
    onChange && onChange(value);
  };

  get_class = async (classTreeData) => {
    const { disabled } = this.props;
    let data;
    const dataSource = [];
    if (classTreeData) {
      data = classTreeData;
    } else {
      const res = await get_class_by_pid();
      data = res.data;
    }
    data.forEach((v) => {
      const obj = {
        label: v.className,
        value: String(v.id),
        key: String(v.id),
        disabled,
      };
      if (v.children) {
        const children = [];
        v.children.forEach((vv) => {
          children.push({
            label: vv.className,
            value: String(vv.id),
            key: String(vv.id),
          });
        });
        obj.children = children;
      }
      dataSource.push(obj);
    });
    this.setState({ dataSource });
  };

  render() {
    const {
      paramKey, //  供后端使用的key
      className,
      formitemlayout,
      label, //  显示的名字
      rules,
      form: { getFieldDecorator },
      initialValue, //  初始值
      style,
      dropdownStyle,
      multiple, // 是否支持多选
      allowClear,
      placeholder,
      treeNodeFilterProp,
      only,
      selectDisabled,
    } = this.props;
    const { dataSource } = this.state;
    if (only) {
      return (
        <FormItem label={label || '分类'} {...formitemlayout} className={className}>
          {getFieldDecorator(paramKey || 'classInfoId', {
            initialValue: initialValue || '',
            rules,
          })(
            <Select
              allowClear={allowClear}
              showSearch
              optionFilterProp="children"
              style={style}
              disabled={selectDisabled}
              onChange={this.triggerChange}
            >
              <Option value="">根分类</Option>
              {dataSource.map(item => (
                <Option value={item.value} key={item.value}>
                  {item.label}
                </Option>
              ))}
            </Select>,
          )}
        </FormItem>
      );
    }
    return (
      <FormItem label={label || '分类'} {...formitemlayout} className={className}>
        {getFieldDecorator(paramKey || 'classInfoId', {
          initialValue,
          rules,
        })(
          <TreeSelect
            disabled={selectDisabled}
            treeData={dataSource}
            multiple={multiple}
            allowClear={allowClear}
            placeholder={placeholder}
            style={style}
            dropdownStyle={dropdownStyle}
            treeNodeFilterProp={treeNodeFilterProp || 'label'}
            showSearch
            onChange={this.triggerChange}
          />,
        )}
      </FormItem>
    );
  }
}

export default Form.create()(ClassTree);
