// 地址是:http://localhost:3000/#/ 加上路由地址

export default [
  {
    exact: true,
    path: '/video_manage/high_download',
    component: () => import('./HighDownload'),
    models: () => [import('./HighDownload/models')],
  },
  {
    exact: true,
    path: '/video_manage/dangerous_words_video',
    component: () => import('./DangerousWordsVideo'),
    models: () => [import('./DangerousWordsVideo/models')],
  },
  {
    exact: true,
    path: '/video_manage/content_test',
    component: () => import('./ContentTest'),
    models: () => [import('./ContentTest/models')],
  },
  {
    exact: true,
    path: '/video_manage/video_list/:id?',
    component: () => import('./VideoList'),
    models: () => [import('./VideoList/models')],
  },
  {
    exact: true,
    path: '/video_manage/template_video',
    component: () => import('./TemplateVideo/Index'),
    models: () => [import('./TemplateVideo/models')],
  },
  {
    exact: true,
    path: '/video_manage/edit_video_state',
    component: () => import('./EditVideoState/Index'),
  },
  {
    exact: true,
    path: '/video_manage/upload_video',
    component: () => import('./UploadVideo/Index'),
  },
];
