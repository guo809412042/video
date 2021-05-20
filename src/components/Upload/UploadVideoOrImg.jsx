import React, { Component } from 'react';
import {
  Upload, Icon, Progress, Spin, Input, message,
} from 'antd';
import styles from './Upload.less';

import { get_ali_oss_sts } from '../../services/common';

class upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      percent: '0',
      upload: '',
      spinning: false,
      maxSize: this.props.maxSize ? this.props.maxSize : 100,
    };
    this.changePercent = this.changePercent.bind(this);
    this.changeResult = this.changeResult.bind(this);
    this.triggerChange = this.triggerChange.bind(this);
    this.showLoading = this.showLoading.bind(this);
    this.hideLoading = this.hideLoading.bind(this);
  }

  componentWillMount() {
    if (this.props.value) {
      this.setState({
        upload: this.props.value,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        upload: nextProps.value,
      });
    }
  }

  changePercent(percent) {
    this.setState({
      percent,
    });
  }

  changeResult(result) {
    this.setState({
      upload: result,
    });
  }

  triggerChange() {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(Object.assign({}, this.state.upload));
    }

    //  自定义回调
    const callBack = this.props.callBack;
    if (callBack) {
      callBack(Object.assign({}, this.state.upload));
    }
  }

  showLoading() {
    this.setState({
      spinning: true,
    });
  }

  hideLoading() {
    this.setState({
      spinning: false,
    });
  }

  render() {
    const state = this.state;
    const changePercent = this.changePercent;
    const changeResult = this.changeResult;
    const triggerChange = this.triggerChange;
    const showLoading = this.showLoading;
    const hideLoading = this.hideLoading;
    const props = {
      customRequest(file) {
        (async () => {
          if (file.file.type.indexOf('image') !== -1) {
            if (file.file.size >= 512000) {
              message.error('上传图片超过500K,请压缩后再上传');
              return false;
            }
            if (file.file.size >= state.maxSize * 1024) {
              const confirm = window.confirm(`上传图片超过${state.maxSize}K,是否继续上传？`);
              if (!confirm) return false;
            }
          }
          await showLoading();
          const url = await get_ali_oss_sts(file.file, (p) => {
            changePercent(p * 100);
          });
          await hideLoading();
          changeResult({ url });
          triggerChange();
        })();
      },
      showUploadList: false,
    };
    return (
      <div>
        <Upload {...props} className={styles.avatarUploader} style={this.props.style}>
          {this.state.upload && this.state.upload.url ? (
            this.state.upload.url.indexOf('mp4') !== -1 ? (
              <Input disabled value={this.state.upload.url} />
            ) : (
              <img src={this.state.upload.url} alt="" className={styles.avatar} style={this.props.style} />
            )
          ) : (
            <div>
              <Spin spinning={this.state.spinning} />
              <Icon type="plus" className={styles.avatarUploaderTrigger} style={this.props.style} />
              <Progress percent={parseInt(this.state.percent, 10)} />
            </div>
          )}
        </Upload>
      </div>
    );
  }
}

export default upload;
