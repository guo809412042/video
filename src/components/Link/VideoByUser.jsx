import React from 'react';
// import { Link } from 'dva/router';

// const path = window.location.pathname;
// const searchUrl = window.location.search;

export default ({ auiddigest, children }) => (
  <a href={`page?pt=1&g=9&p=6&fg=video#/video_manage/video_list/${auiddigest}`} target="_blank">
    {children}
  </a>
);
