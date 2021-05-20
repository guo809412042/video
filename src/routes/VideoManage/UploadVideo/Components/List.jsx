import React from 'react';
import { Table } from 'antd';

function List(props) {
  const { data } = props;
  const colums = [
    {
      title: '视频',
      dataIndex: 'file_url',
      key: 'file_url',
      width: 200,
      render: (_, record) => (
        <video src={ record.file_url }
          controls="controls"
          style={{ width: 150 }}
          // key={ `${record.file_url} ${getNum()}`}
        />),
    },
    {
      title: '标签名称',
      dataIndex: 'tag_name',
      key: 'tag_name',
    },
  ];
  return (
    <>
      <Table columns={colums} dataSource={data} rowKey={ record => record.__rowNum__ }/>
    </>
  );
}

export default List;
