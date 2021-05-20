import React from 'react';
import {
  Tag, Radio, Row, Col, Icon, Button, Input, Spin,
} from 'antd';
import intl from 'react-intl-universal';

import { get_taglibrary_by_class, get_taglibrary_list, get_class_by_pid } from '../../services/class-manage';

import styles from './ClassTagLibrary.less';

const RadioGroup = Radio.Group;
class ClassTagLibrary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classInfoList: [],
      subClassInfoList: {},
      connectedTagList: [], //  关联标签
      searchTagList: [], //  搜索标签
      searchTagLoading: false, //  搜索框加载中状态
      classLevelOne: null, //  一级分类
      classLevelTwo: null, //  二级分类
      selectedTags: [], //  选中标签
    };
  }

  componentDidMount() {
    this.getData();
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.classInfoList.length === 0) {
      this.getData();
    }

    const { classLevelOne, classLevelTwo, selectedTags } = nextProps;

    if (classLevelOne || classLevelTwo || selectedTags) {
      this.setState({
        classLevelOne,
        classLevelTwo,
        selectedTags: selectedTags.map(tag => this.state.searchTagList.filter(_tag => tag === _tag.id)[0]),
      });
    }
  }

  getData = async () => {
    const { noDefault = false } = this.props;
    let { classInfoList } = this.props;
    if (!classInfoList) {
      const res = await get_class_by_pid();
      classInfoList = res.data;
    }
    classInfoList = classInfoList.sort((a, b) => b.orderNo - a.borderNo);
    const subClassInfoList = {};
    let classLevelOne = null;
    classInfoList.map((item) => {
      subClassInfoList[item.id] = item.children ? item.children.sort((a, b) => b.orderNo - a.orderNo) : [];
    });
    if (classInfoList && classInfoList.length && !noDefault) {
      classLevelOne = classInfoList[0].id;
    }
    this.setState({ classInfoList, subClassInfoList, classLevelOne: String(classLevelOne) });
  };

  triggerChange = () => {
    let { selectedTags } = this.state;
    const { classLevelOne, classLevelTwo } = this.state;
    selectedTags = selectedTags.map(item => item.id);
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if (onChange) {
      onChange({
        classLevelOne,
        classLevelTwo,
        selectedTags,
      });
    }
  };

  //  一级分类改变
  classLevelOneChange = (e) => {
    this.setState(
      {
        classLevelOne: e.target.value,
        classLevelTwo: null,
        connectedTagList: [],
      },
      this.triggerChange,
    );
  };

  //  二级分类改变改变
  classLevelTwoChange = (e) => {
    const classId = e.target.value;
    this.getTagListByClassId(classId);
    this.setState({ classLevelTwo: classId }, this.triggerChange);
  };

  //  获取分类下的标签列表
  getTagListByClassId = async (classId) => {
    const { data: connectedTagList } = await get_taglibrary_by_class({ classId });
    this.setState({ connectedTagList: connectedTagList || [] });
  };

  //  搜索标签列表
  searchTag = async (tagName) => {
    if (tagName) {
      const params = {};
      if (/^[0-9]+$/.test(tagName)) {
        params.tagLibraryId = tagName;
      } else {
        params.tagName = tagName;
      }
      this.setState({ searchTagLoading: true });
      try {
        const { status, data: searchTagList } = await get_taglibrary_list(params);
        if (status) {
          this.setState({ searchTagList });
        }
      } catch (err) {
        console.log(err);
      } finally {
        this.setState({ searchTagLoading: false });
      }
    } else {
      this.setState({ searchTagList: [] });
    }
  };

  //  选中的标签改变
  pushTagToSelected = (tagInfo) => {
    const { selectedTags } = this.state;
    const tagLibraryIds = selectedTags.map(item => item.id);
    if (!tagLibraryIds.includes(tagInfo.id)) {
      selectedTags.push(tagInfo);
      this.setState({ selectedTags }, this.triggerChange);
    }
  };

  //  显示选中的标签
  show_selected = () => {
    const { selectedTags } = this.state;
    const dom = [];
    selectedTags.map((item) => {
      dom.push(
        <Tag className={styles.tagSelect} key={String(item.id)}>
          {item.tagName}
          <Icon type="close-circle-o" style={{ marginLeft: '8px' }} onClick={() => this.removeTag(item.id)} />
        </Tag>,
      );
    });
    return dom;
  };

  //  删除子标签
  removeTag = (tagLibraryId, e) => {
    e && e.stopPropagation();
    let { selectedTags } = this.state;
    selectedTags = selectedTags.filter(item => item.id !== tagLibraryId);
    this.setState({ selectedTags }, this.triggerChange);
  };

  //  清空选中标签
  clear = (e) => {
    e && e.stopPropagation();
    this.setState(
      {
        selectedTags: [],
        classLevelOne: null,
        classLevelTwo: null,
        connectedTagList: [],
        searchTagList: [],
      },
      this.triggerChange,
    );
  };

  render() {
    const {
      showTagLibrary,
      classInfoList: classInfoListProps,
      classHeightStyle,
      tagLibraryHeightStyle,
      tagLibrarySearchHeightStyle,
      classDisabled,
    } = this.props;
    const {
      classInfoList: classInfoListState,
      subClassInfoList,
      connectedTagList,
      searchTagList,
      searchTagLoading,
      classLevelOne,
      classLevelTwo,
    } = this.state;
    const classInfoList = classInfoListProps && classInfoListProps.length
      ? classInfoListProps.sort((a, b) => b.orderNo - a.orderNo)
      : classInfoListState;
    return (
      <div className={styles.wrapper}>
        <div style={{ paddingLeft: '15px' }}>
          <Row>
            <Col
              span={showTagLibrary ? 16 : 24}
              className={styles.class}
              style={classHeightStyle || { height: '250px' }}
            >
              <span style={{ marginRight: '30' }}>
                {intl.get('vivashow.video.tag.FirstClassClassification').defaultMessage('一级分类')}:
              </span>
              <RadioGroup onChange={this.classLevelOneChange} value={classLevelOne} disabled={classDisabled}>
                {classInfoList.map(item => (
                  <Radio value={String(item.id)} key={String(item.id)}>
                    {item.className}
                  </Radio>
                ))}
              </RadioGroup>
              {subClassInfoList[classLevelOne] && subClassInfoList[classLevelOne].length ? (
                <div>
                  <span style={{ marginRight: '30' }}>
                    {intl.get('vivashow.video.tag.SecondLevelLlassification').defaultMessage('二级分类')}:
                  </span>
                  <RadioGroup onChange={this.classLevelTwoChange} value={classLevelTwo} disabled={classDisabled}>
                    {subClassInfoList[classLevelOne].map(item => (
                      <Radio value={String(item.id)} key={String(item.id)}>
                        {item.className}
                      </Radio>
                    ))}
                  </RadioGroup>
                </div>
              ) : null}
            </Col>
            {showTagLibrary ? (
              <Col span={8}>
                <div className={styles.tagLibrary} style={tagLibraryHeightStyle || { height: '125px' }}>
                  <p>{intl.get('vivashow.video.tag.RelatedTags').defaultMessage('关联标签')}</p>
                  {connectedTagList.map(item => (
                    <Tag className={styles.tagSelect} onClick={() => this.pushTagToSelected(item)}>
                      {item.tagName}
                    </Tag>
                  ))}
                </div>
                <div className={styles.tagLibrarySearch} style={tagLibrarySearchHeightStyle || { height: '125px' }}>
                  <Input.Search
                    className={styles.serach}
                    placeholder={intl.get('vivashow.video.tag.SearchTags').defaultMessage('搜索标签')}
                    onSearch={this.searchTag}
                  />
                  <Spin spinning={searchTagLoading}>
                    {searchTagList.map(item => (
                      <Tag className={styles.tagSelect} onClick={() => this.pushTagToSelected(item)}>
                        {item.tagName}
                      </Tag>
                    ))}
                  </Spin>
                </div>
              </Col>
            ) : null}
          </Row>
        </div>
        <div className={styles.showAreaStyle}>
          {this.show_selected()}
          <Button onClick={this.clear} type="danger" className={styles.clearBtn}>
            {intl.get('spider.list.reset').defaultMessage('清空')}
          </Button>
        </div>
      </div>
    );
  }
}

export default ClassTagLibrary;
