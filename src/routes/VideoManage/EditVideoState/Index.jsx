import React from 'react';
import { Input, Button, message } from 'antd';
import { ImportFile } from '@xy/vid-components';

import styles from './style.less';
import { auditVideo } from './service';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      puidString: '',
    };
  }

  inputChange = (e) => {
    this.setState({
      puidString: e.target.value,
    });
  };

  selectChange = (list) => {
    this.setState({
      puidString: list ? list.join(',') : '',
    });
  };

  clear = () => {
    this.setState({ puidString: '' });
  };

  auditNotPass = async () => {
    const { puidString } = this.state;
    if (puidString) {
      await auditVideo({
        puidString: this.state.puidString,
      });
      message.success('操作成功');
      this.clear();
    } else {
      message.warning('请输入要审核的视频');
    }
  };

  render() {
    const { puidString } = this.state;
    return (
      <div className={styles.wrapper}>
        <Input.TextArea rows={20} onChange={this.inputChange} placeholder="视频id请用英文逗号隔开" value={puidString} />
        <ImportFile onChange={this.selectChange}>
          <Button className={styles.importBtn} type="primary">
            导入视频ID(仅支持txt、excel文件导入，每行一个视频ID，无需分隔符)
          </Button>
        </ImportFile>
        <Button className={styles.importBtn} type="primary" onClick={this.clear}>
          清空输入框
        </Button>
        <Button className={styles.importBtn} type="danger" onClick={this.auditNotPass}>
          审核不通过
        </Button>
      </div>
    );
  }
}

export default Index;
