import React from 'react';
import {
  Upload, Icon, Progress, Spin, message,
} from 'antd';
import { Text } from '@xy/design';
import styles from '../Upload/Upload.less';

import { get_ali_oss_sts } from '../../services/common';

const { EditHoc } = Text;

class ImgComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      percent: '0',
      upload: '',
      spinning: false,
    };
    this.changePercent = this.changePercent.bind(this);
    this.changeResult = this.changeResult.bind(this);
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
    this.setState({
      upload: result,
    });
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
    const { onChange } = this.props;
    const changePercent = this.changePercent;
    const changeResult = this.changeResult;
    const showLoading = this.showLoading;
    const hideLoading = this.hideLoading;
    const props = {
      customRequest(file) {
        (async () => {
          if (file.file.type.indexOf('image') === -1) {
            message.error('请上传图片格式的文件');
            return false;
          }
          await showLoading();
          const url = await get_ali_oss_sts(file.file, (p) => {
            changePercent(p * 100);
          });
          await hideLoading();
          changeResult({ url });
          onChange(url);
        })();
      },
      showUploadList: false,
    };
    return (
      <div>
        <Upload {...props} className={styles.avatarUploader} style={this.props.style}>
          {this.state.upload.url ? (
            <img src={this.state.upload.url} alt="" className={styles.avatar} style={this.props.style} />
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

export default EditHoc(ImgComp);
