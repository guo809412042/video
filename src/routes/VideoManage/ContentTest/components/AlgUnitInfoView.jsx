/**
 * Created with 盛丽芬.
 * User: shenglifen
 * Date: 2019/6/17
 * Time: 上午10:38
 *
 */
import React from 'react';
import { Table, Modal, Button } from 'antd';
import exportParams from '../utils/exportCsv';

const columns = [
  { dataIndex: 'alg', title: '算法单元' },
  { dataIndex: 'ptr', title: 'PTR' },
  { dataIndex: 'dtr', title: 'DTR' },
  { dataIndex: 'exposure_cnt', title: '曝光' },
  { dataIndex: 'play_cnt', title: '播放' },
  { dataIndex: 'play_3s_cnt', title: '有效播放' },
  { dataIndex: 'share_cnt', title: '转发' },
  { dataIndex: 'download_cnt', title: '下载' },
  { dataIndex: 'comment_cnt', title: '评论' },
  { dataIndex: 'like_cnt', title: '点赞' },
];
export default class AlgUnitInfoView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.visible,
      dataSource: [],
    };
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    const dataSource = [];
    if (nextProps.visible) {
      if (nextProps.data) {
        nextProps.data.split(';')
          .forEach((v) => {
            const alg = v.split(':')[0];
            const data = v.split(':')[1].split(',');
            dataSource.push({
              alg,
              ptr: data[0] && data[2] ? (data[2] * 100 / data[0]).toFixed(2) : 0,
              dtr: data[0] && data[6] ? (data[6] * 100 / data[0]).toFixed(2) : 0,
              exposure_cnt: data[0],
              play_cnt: data[1],
              play_3s_cnt: data[2],
              share_cnt: data[3],
              like_cnt: data[4],
              comment_cnt: data[5],
              download_cnt: data[6],
            });
          });
      }
    }
    this.setState({
      visible: nextProps.visible,
      dataSource,
    });
  }

  exportList = () => {
    const columns_new = columns.map(v => ({
      ...v,
      key: v.dataIndex,
    }));
    exportParams({
      filename: '算法单元',
      columns: columns_new,
      data: this.state.dataSource,
    });
  }

  render() {
    return <div>
      <Modal
        title="算法单元明细"
        visible={this.state.visible}
        onOk={this.props.closeVisible}
        onCancel={this.props.closeVisible}
        width={800}
      >
        <Button type="primary" style={{ marginLeft: 8 }} onClick={this.exportList}>导出</Button>
        <Table
          columns={columns}
          dataSource={this.state.dataSource}
          bordered
          rowKey="alg"
        />
      </Modal>
    </div>;
  }
}
