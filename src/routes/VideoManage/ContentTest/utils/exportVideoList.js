/**
 * Created with 盛丽芬.
 * User: shenglifen
 * Date: 2019/5/7
 * Time: 上午9:54
 *
 */
import moment from 'moment';
import exportParams from './exportCsv';

const columns = [
  { key: 'puid', title: '视频ID' },
  { key: 'auid', title: '用户ID' },
  { key: 'video_url', title: '视频url' },
  { key: 'publish_time', title: '视频发布时间' },
  { key: 'lang', title: '语言社区' },
  { key: 'tag_parent_id_list', title: '一级分类' },
  { key: 'tag_child_id_list', title: '二级分类' },
  { key: 'tag_ids', title: '视频标签' },
  { key: 'expose_cnt', title: '曝光数据' },
  { key: 'play_cnt', title: '有效播放总数' },
  { key: 'download_cnt', title: '下载量' },
  { key: 'forward_cnt', title: '分享量' },
  { key: 'comment_cnt', title: '评论数' },
  { key: 'like_cnt', title: '点赞数' },
  { key: 'ptr', title: 'PTR' },
  { key: 'dtr', title: 'DTR' },
  { key: 'similar_videos', title: '重复视频' },
  { key: 'watermarks', title: '水印检测' },
];

function exportVideoList(data) {
  const list = [];
  for (const i of data) {
    list.push({
      ...i._source,
      similar_videos: i._source.similar_videos ? i._source.similar_videos.replace(/,/g, '|') : '',
      watermarks: i._source.watermarks ? i._source.watermarks.replace(/,/g, '|') : '',
      publish_time: moment(i._source.publish_time)
        .format('YYYY-MM-DD HH:mm:ss'),
    });
  }
  exportParams({
    filename: '视频详情',
    columns,
    data: list,
  });
}

const testColumns = [
  { key: 'id', title: '测试ID' },
  { key: 'description', title: '测试说明' },
  { key: 'create_time', title: '测试日期' },
  { key: 'video_total', title: '测试总数' },
  { key: 'data', title: '数据表现' },
  { key: 'exposure', title: '曝光扶持' },
  { key: 'operator', title: '操作账号' },
];

function getNumber(a, b) {
  return b && b !== '0' ? (a * 100 / b).toFixed(2) : 0.00;
}

function exportTestList(data) {
  const list = [];
  for (const v of data) {
    list.push({
      ...v,
      create_time: moment(v.create_time)
        .format('YYYY-MM-DD HH:mm:ss'),
      data: `曝光量:${v.expo}|ptr:${getNumber(v.play_3s, v.expo)}%|下载率:${getNumber(v.downs, v.expo)}`
        + `%|评论率:${getNumber(v.comments, v.expo)}%|点赞率:${getNumber(v.likes, v.expo)}%|转发率:${getNumber(v.shares, v.expo)}%`,
    });
  }
  exportParams({
    filename: '测试列表',
    columns: testColumns,
    data: list,
  });
}


export {
  exportVideoList,
  exportTestList,
};
