import videoManageRoutes from './VideoManage';

export default [
  {
    path: '/',
    component: () => import('./index'),
    routes: [...videoManageRoutes],
  },
];
