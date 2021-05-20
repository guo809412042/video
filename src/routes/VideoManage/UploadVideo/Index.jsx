import React, { useState } from 'react';

import Query from './Components/Query';
import List from './Components/List';

const Index = () => {
  // table 数据源
  const [fileData, setFileData] = useState(null);
  // 接受子组件传来的值
  const uploadFile = (data) => {
    // 设置table 的数据源
    setFileData(data);
  };
  return (
    <>
      <Query uploadFile={uploadFile} />
      <List data={fileData} />
    </>
  );
};

export default Index;
