import React from 'react';
import { Icon, Dropdown, Menu } from 'antd';

import { Audio } from '@xy/design';

import styles from './index.less';
import { int_time_2_format, launchFullscreen, exitFullscreen } from '../../../utils/utils';

const { SlideProgress } = Audio;

const toFixedNum = 0;
const MenuItem = Menu.Item;
class Video extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      src: '',
      duration: 0, //  视频时长
      currentTime: 0, //  视频当前播放进度
      loading: true,
      isPause: true, //  初始视频为暂停
      muted: false, //  是否关闭声音
      isFullScrean: false, //  是否全屏
      speed: this.props.speed || 2, //  默认播放倍速
    };
  }

  componentDidMount() {
    this.init_data();
    this.init_event();
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.src !== nextProps.src) {
      //  先卸载老的事件
      this.remove_event();
      //  再绑定新事件
      this.init_data();
      this.init_event();
    }
  }

  init_data = () => {
    const { src } = this.props;
    this.setState({
      src,
    });
  };

  //  绑定事件
  init_event = () => {
    this.vdo.addEventListener('canplay', this.video_can_play);
    this.vdo.addEventListener('timeupdate', this.video_time_update);
    this.vdo.addEventListener('ended', this.video_end);
  };

  //  卸载事件
  remove_event = () => {
    this.vdo.removeEventListener('canplay', this.video_can_play);
    this.vdo.removeEventListener('timeupdate', this.video_time_update);
    this.vdo.removeEventListener('ended', this.video_end);

    this.setState({ loading: true, isPause: true });
  };

  //  监听视频可播放时初始化数据
  video_can_play = () => {
    this.setState({
      loading: false,
      duration: this.vdo.duration,
    });
    this.vdo.play();
  };

  //  监听视频播放时间变化
  video_time_update = () => {
    const { speed } = this.state;
    const currentTime = this.vdo.currentTime;
    this.setState({ currentTime, isPause: this.vdo.paused });
    this.progress.setValue(currentTime);
    this.vdo.playbackRate = speed;
  };

  //  监听视频播放完成
  video_end = () => {
    this.setState({
      isPause: true,
      currentTime: 0,
    });
  };

  //  拖动进度条改变当前播放时间
  progress_change = (value) => {
    this.vdo.currentTime = value;
    this.setState({ currentTime: value, isPause: this.vdo.paused });
  };

  //  点击播放按钮
  play_video = () => {
    if (this.vdo) {
      this.vdo.play();
      this.setState({ isPause: false });
    }
  };

  //  点击暂停按钮
  pause_video = () => {
    if (this.vdo) {
      this.vdo.pause();
      this.setState({ isPause: true });
    }
  };

  //  改变是否静音
  change_volume = () => {
    this.setState({ muted: !this.state.muted });
  };

  //  是否全屏
  full_screan = () => {
    const { isFullScrean } = this.state;
    if (isFullScrean) {
      exitFullscreen();
    } else {
      launchFullscreen(this.videoWrapper);
    }
    this.setState({ isFullScrean: !isFullScrean });
  };

  //  选择播放速度
  select_speed = (e) => {
    const { speedChange } = this.props;
    const speed = parseFloat(e.key);
    this.setState({ speed });
    this.vdo.playbackRate = speed;
    if (speedChange) {
      speedChange(speed);
    }
  };

  render() {
    const {
      autoPlay, width, height, preload, poster,
    } = this.props;
    const {
      src, duration, loading, currentTime, isPause, muted, speed,
    } = this.state;
    const menu = (
      <Menu onClick={this.select_speed}>
        <MenuItem key="4">x4</MenuItem>
        <MenuItem key="3">x3</MenuItem>
        <MenuItem key="2">x2</MenuItem>
        <MenuItem key="1.5">x1.5</MenuItem>
        <MenuItem key="1">x1</MenuItem>
      </Menu>
    );
    return (
      <div
        style={{
          width: width || 120,
          height: height || 120,
        }}
        className={styles.wrapper}
        ref={(refs) => {
          this.videoWrapper = refs;
        }}
      >
        <video
          ref={(refs) => {
            this.vdo = refs;
          }}
          src={src}
          width="100%"
          height="100%"
          autoPlay={autoPlay || false}
          preload={preload || 'none'}
          poster={poster}
          muted={muted}
        />
        <div className={styles.centerBtn}>{loading ? <Icon type="loading" /> : null}</div>
        {/**  控制面板 */}
        <div className={styles.controls}>
          {/**  播放、暂停按钮 */}
          <div className={styles.centerBtn}>
            {isPause ? (
              <Icon type="play-circle" onClick={this.play_video} />
            ) : (
              <Icon type="pause-circle" onClick={this.pause_video} />
            )}
          </div>
          {/**  工具条 */}
          <div className={styles.controlsBar}>
            {/**  全屏、静音、倍速等 */}
            <div className={styles.handleWrapper}>
              <span className={styles.showTime}>
                {int_time_2_format(currentTime, toFixedNum)} / {int_time_2_format(duration, toFixedNum)}
              </span>
              <span className={styles.handle}>
                <Icon type="sound" onClick={this.change_volume} />
                <Icon type="scan" onClick={this.full_screan} />
                <Dropdown overlay={menu} placement="topCenter" getPopupContainer={() => this.videoWrapper}>
                  <span className={styles.speed}>倍速 x{speed}</span>
                </Dropdown>
              </span>
            </div>
            {/**  进度条 */}
            <SlideProgress
              ref={(refs) => {
                this.progress = refs;
              }}
              maxValue={duration}
              step={0.1}
              onChange={this.progress_change}
              tipFormatter={() => (
                <span className={styles.showTime}>
                  {int_time_2_format(currentTime, toFixedNum)} / {int_time_2_format(duration, toFixedNum)}
                </span>
              )}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Video;
