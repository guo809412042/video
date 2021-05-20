import React from 'react';
import XLSX from 'xlsx';
import { Upload, Button, Icon } from 'antd';

const Query = (props) => {
  // 上传文件的方法
  const customRequest = (info) => {
    // 创建读取文件的对象
    const reader = new FileReader();
    // 将文件转为数组类的buffer
    reader.readAsArrayBuffer(info.file);
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      // 如果是将文件解析成字符串的话  掉用 XLSX.read 方法传入数据和option type 给data 解析出来的类型
      const workbook = XLSX.read(data, { type: 'array' });
      const tagsArr = XLSX.utils.sheet_to_json(
        workbook.Sheets[workbook.SheetNames[0]],
      );
      // 子传父,将解析出来的文件对象数组传给父组件
      props.uploadFile(tagsArr);
    };
  };
  return (
    <>
      <Upload
        showUploadList={false}
        customRequest={customRequest}
      >
        <Button type="primary">
          <Icon type="cloud-upload" />上传文件
        </Button>
      </Upload>
    </>
  );
};

export default Query;
