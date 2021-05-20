import React, { Component } from 'react';
import { Upload, Progress, Button } from 'antd';
import styles from './Upload.less';

import { get_ali_oss_sts } from '../../services/common';

class UploadPush extends Component {
  constructor(props) {
    super(props);
    this.state = {
      percent: '0',
      upload: '',
      spinning: false,
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

  changePercent(percent) {
    this.setState({
      percent,
    });
  }

  changeResult(result) {
    this.props.callBack(result);
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
    const changePercent = this.changePercent;
    const changeResult = this.changeResult;
    const triggerChange = this.triggerChange;
    const showLoading = this.showLoading;
    const hideLoading = this.hideLoading;
    const props = {
      customRequest(file) {
        (async () => {
          await showLoading();
          const url = await get_ali_oss_sts(file.file, (p) => {
            changePercent(p * 100);
          });
          await hideLoading();
          // that.props.getfile(file)
          changeResult({ url });
          triggerChange();
        })();
      },
      showUploadList: false,
    };
    return (
      <div>
        <Upload {...props} className={styles.avatarUploader} style={this.props.style}>
          {
            <div>
              <Button loading={this.state.spinning}>上传</Button>
              {this.state.spinning ? <Progress percent={parseInt(this.state.percent, 10)} /> : ''}
            </div>
          }
        </Upload>
      </div>
    );
  }
}

export default UploadPush;
