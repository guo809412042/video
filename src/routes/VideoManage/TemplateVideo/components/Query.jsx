import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  Collapse, Form, Button, Input, InputNumber, Select, DatePicker, message,
} from 'antd';
import styles from '../../../../styles/index.css';
import Community from '../../../../components/Form/Community';
import { getVideoPool } from '../service/index';
import { ExportCsv, Csv, getProductId } from '../../../../utils/utils';
import ClassTree from '../../../../components/ClassManage/ClassTree';

const videoTypeList = [
  {
    key: '0',
    value: 'unknow',
  }, {
    key: '1',
    value: 'shotting',
  }, {
    key: '2',
    value: 'lyric',
  }, {
    key: '3',
    value: 'clip',
  }, {
    key: '4',
    value: 'whatsapp',
  }, {
    key: '5',
    value: 'h5temp',
  }, {
    key: '6',
    value: 'duet',
  }, {
    key: '7',
    value: 'template',
  },
];
const Panel = Collapse.Panel;
const Option = Select.Option;
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const SearchForm = (
  {
    onSearch,
    form,
    form: {
      getFieldDecorator,
      validateFields,
      resetFields,
    },
    formFields,
    languageList,
    total,
  },
) => {
  const download = async () => {
    const { status, data } = await getVideoPool({
      ...formFields,
      current: 1,
      pageSize: 10000,
    });
    if (status) {
      const { hits: { hits } } = data;
      const filename = '素材视频.csv';
      const columns = [
        {
          title: '社区',
          key: 'lang',
        }, {
          title: '视频ID',
          key: 'puid',
        }, {
          title: '用户ID',
          key: 'auid',
        }, {
          title: '素材ID',
          key: 'template',
        }, {
          title: '音频ID',
          key: 'db_audio_id',
        }, {
          title: 'ptr',
          key: 'ptr',
        }, {
          title: 'expose_cnt',
          key: 'expose_cnt',
        }, {
          title: 'play_cnt',
          key: 'play_cnt',
        }, {
          title: 'forward_cnt',
          key: 'forward_cnt',
        }, {
          title: 'download_cnt',
          key: 'download_cnt',
        }, {
          title: 'comment_cnt',
          key: 'comment_cnt',
        }, {
          title: 'download_cnt',
          key: 'download_cnt',
        }, {
          title: 'like_cnt',
          key: 'like_cnt',
        },
      ];
      const listData = hits.map(item => ({
        lang: item._source.lang,
        puid: item._source.puid,
        auid: item._source.auid,
        template: item._source.template,
        db_audio_id: item._source.db_audio_id,

        ptr: item._source.ptr,
        expose_cnt: item._source.expose_cnt,
        play_cnt: item._source.play_cnt,
        forward_cnt: item._source.forward_cnt,
        download_cnt: item._source.download_cnt,
        comment_cnt: item._source.comment_cnt,
        like_cnt: item._source.like_cnt,
      }));
      const params = {
        filename,
        columns,
        data: listData,
      };
      const exportData = Csv(columns, listData, params, false);
      ExportCsv.download(filename, exportData);
    } else {
      message.error('数据请求失败');
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (err) {
        return false;
      }
      const params = {
        ...values,
        product_id: Number(getProductId()),
        publish_time__gte: values.time[0] ? values.time[0].valueOf() : undefined,
        publish_time__lte: values.time[0] ? values.time[1].valueOf() : undefined,
      };
      if (params.sort) {
        const tempArr = params.sort.split('|');
        const sortBy = tempArr[0];
        const sortType = tempArr[1];
        params[sortBy] = sortType;
        delete params.sort;
      }
      delete params.time;
      onSearch(params);
    });
  };
  const handleReset = () => {
    resetFields();
  };
  return (
    <Collapse defaultActiveKey={['1']} style={{ marginTop: 15 }}>
      <Panel
        header={<div>
          <FormattedMessage id="common.search" defaultMessage="查询" />
          <span style={{
            float: 'right',
            marginRight: 10,
          }}>总数：{total} 条</span>
        </div>}
        key="1"
      >
        <Form layout="inline" onSubmit={handleSubmit}>
          <Community
            form={form}
            community_key="lang"
            show_all
            className={styles.marginPxForItem}
            style={{ width: 120 }}
          />
          <ClassTree
            form={form}
            className={styles.marginPxForItem}
            style={{ width: 200 }}
            allowClear
            label="内容分类"
            placeholder="内容分类"
            dropdownStyle={{ height: '240px', overflowY: 'auto' }}
            paramKey="contentClass"
          />
          <Form.Item
            label="内容语言"
            className={styles.marginPxForItem}
          >
            {getFieldDecorator('lang')(
              <Select
                style={{ width: 120 }}
                allowClear
              >
                {languageList.map(v => <Select.Option
                  key={v.className}
                  value={v.className}>{v.className}</Select.Option>)}
              </Select>,
            )}
          </Form.Item>
          <Form.Item
            label="爬虫任务id"
            className={styles.marginPxForItem}
          >
            {getFieldDecorator('task_id')(
              <Input
                style={{ width: 200 }}
              />,
            )}
          </Form.Item>
          <FormItem label="视频ID" className={styles.marginPxForItem}>
            {
              getFieldDecorator('puid', {})(
                <InputNumber />,
              )
            }
          </FormItem>
          <FormItem label="音频ID" className={styles.marginPxForItem}>
            {
              getFieldDecorator('db_audio_id', {})(
                <InputNumber />,
              )
            }
          </FormItem>
          <Form.Item
            label="最小曝光"
            className={styles.marginPxForItem}
          >
            {getFieldDecorator('expose_cnt__gte')(
              <Input
                style={{ width: 120 }}
                type="number"
              />,
            )}
          </Form.Item>
          <FormItem label="素材ID" className={styles.marginPxForItem}>
            {
              getFieldDecorator('match|template', {})(
                <Input />,
              )
            }
          </FormItem>
          <Form.Item
            label="发布者"
            className={styles.marginPxForItem}
          >
            {getFieldDecorator('auid')(
              <Input
                style={{ width: 120 }}
              />,
            )}
          </Form.Item>
          <Form.Item
            label="内容标签"
            className={styles.marginPxForItem}
          >
            {getFieldDecorator('tag_ids')(
              <Input
                style={{ width: 120 }}
              />,
            )}
          </Form.Item>
          <Form.Item label="视频来源" className={styles.marginPxForItem}>
            {
              getFieldDecorator('video_type', {
                initialValue: '',
              })(
                <Select style={{ width: '120px' }}>
                  <Option value="">全部</Option>
                  {
                    videoTypeList.map(item => <Option value={item.value} key={item.value}>{item.value}</Option>)
                  }
                </Select>,
              )
            }
          </Form.Item>
          <FormItem label="发布时间" className={styles.marginPxForItem}>
            {
              getFieldDecorator('time', {
                initialValue: [],
              })(
                <RangePicker
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  placeholder={['开始时间', '结束时间']}
                />,
              )
            }
          </FormItem>
          <FormItem label="排序依据" className={styles.marginPxForItem}>
            {getFieldDecorator('sort', {
              initialValue: '_order__publish_time|desc',
            })(
              <Select style={{ width: 200 }}>
                <Option key="_order__publish_time|asc" value="_order__publish_time|asc">按发布时间升序</Option>
                <Option key="_order__publish_time|desc" value="_order__publish_time|desc">按发布时间倒序</Option>
                <Option key="_order__play_cnt|asc" value="_order__play_cnt|asc">播放量升序</Option>
                <Option key="_order__play_cnt|desc" value="_order__play_cnt|desc">播放量倒序</Option>
                <Option key="_order__download_cnt|asc" value="_order__download_cnt|asc">下载量升序</Option>
                <Option key="_order__download_cnt|desc" value="_order__download_cnt|desc">下载量倒序</Option>
                <Option key="_order__ptr|asc" value="_order__ptr|asc">PTR升序</Option>
                <Option key="_order__ptr|desc" value="_order__ptr|desc">PTR降序</Option>
                <Option key="_order__dtr|asc" value="_order__dtr|asc">DTR升序</Option>
                <Option key="_order__dtr|desc" value="_order__dtr|desc">DTR降序</Option>
              </Select>,
            )}
          </FormItem>
          <FormItem className={styles.marginPxForItem}>
            <Button type="primary" htmlType="submit">查询</Button>
          </FormItem>
          <FormItem className={styles.marginPxForItem}>
            <Button type="primary" onClick={download}>导出</Button>
          </FormItem>
          <FormItem className={styles.marginPxForItem}>
            <Button onClick={handleReset}>重置</Button>
          </FormItem>
        </Form>
      </Panel>
    </Collapse>
  );
};

export default Form.create()(SearchForm);
