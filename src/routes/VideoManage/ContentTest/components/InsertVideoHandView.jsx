/**
 * Created with 盛丽芬.
 * User: shenglifen
 * Date: 2019/5/9
 * Time: 上午11:54
 *
 */
import React from 'react';
import { Button, Upload } from 'antd';
import XLSX from 'xlsx';

export default class InsertVideoHandView extends React.Component {
  state = {
    iconLoading: false,
  }

  uploadfun = (obj) => {
    const { dispatch } = this.props;
    const _this = this;
    if (!obj) {
      return false;
    }
    const reader = new FileReader();
    reader.readAsBinaryString(obj);
    reader.onload = async (e) => {
      const data = e.target.result;
      const wb = XLSX.read(data, {
        type: 'binary',
      });
      const arr = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
      const puids = [];
      for (const i of arr) {
        puids.push(Number(i.puid));
      }
      const params = {
        'should|puid': puids.join(','),
        pageSize: puids.length,
        product_id: 6,
      };
      dispatch({
        type: 'contentTest/getRecallVideoList', payload: { params },
      });
      _this.setState({
        iconLoading: false,
      });
    };
  }

  render() {
    const _this = this;
    const paramsProps = {
      customRequest: ({ file }) => {
        this.setState({ iconLoading: true });
        try {
          if (!file) {
            return;
          }
          _this.uploadfun(file);
        } catch (error) {
          this.setState({ iconLoading: false });
        }
      },
      showUploadList: false,
    };
    return <div>
      <Upload {...paramsProps}>
        <Button loading={this.state.iconLoading}> 导入</Button>
      </Upload>
    </div>;
  }
}
