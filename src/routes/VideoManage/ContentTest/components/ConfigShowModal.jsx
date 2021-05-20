/**
 * Created with 盛丽芬.
 * User: shenglifen
 * Date: 2019/4/5
 * Time: 下午11:09
 *
 */
import React from 'react';
import { Modal, Button } from 'antd';

const ConfigShowModal = ({ dispatch, isConfigVisible, testConfigDetail }) => <div>
  <Modal
    title="查看设置"
    visible={isConfigVisible}
    onCancel={() => dispatch({ type: 'contentTest/saveData', payload: { isConfigVisible: false } })}
    footer={[
      <Button
        onClick={() => dispatch({ type: 'contentTest/saveData', payload: { isConfigVisible: false } })}
      >关闭</Button>]}
  >
    <p>测试说明：{testConfigDetail.description}</p>
    <p>测试视频量（序号前x）：{testConfigDetail.video_total}</p>
    <p>曝光扶持（次）：{testConfigDetail.exposure}</p>
    {/* <p>分发对象（先不做）：分布对象圈取</p> */}
  </Modal>
</div>;

export default ConfigShowModal;
