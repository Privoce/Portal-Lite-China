import { localStreamConfig, remoteStreamConfig } from './config.js';
import { bgRemove, bgRestore, copyToClipboard, selectText } from './utils.js';

class Camera {
  constructor({ host = false, inviteId = null, localId = null }) {
    this.dom = document.createElement('div');
    this.dom.classList.add('camera');
    this.dom.innerHTML = `
    <div class='processing'>processing</div>
    <div class='video'>
      <div class='opts'>
      <button class='opt bg' title='clear background'></button>
        <button class='opt video' title='video'></button>
        <button class='opt audio' title='audio'></button>
        <button class='opt pin' title='pin'></button>
      </div>
      <video playsinline autoplay ></video>
      <canvas class='render' width=200 height=200 ></canvas>
      <canvas class='side' width=200 height=200 ></canvas>
      <div class='mask user'></div>
      <div class='mask error'>Camera Error</div>
    </div>
    `;
    this.initOpts();
    this.initBgRemoving();
    if (host) {
      this.initHostCamera();
    } else {
      this.initRemoteCamera({ inviteId, localId });
    }

    return this.dom;
  }
  initOpts() {
    // let pipBtn = this.dom.querySelector('.control.pip');
    // console.log('init pip click', pipBtn);
    this.dom.addEventListener(
      'click',
      ({ target }) => {
        console.log('click remote', { target });

        if (target.classList.contains('pin')) {
          let videoEle = target.parentElement.nextElementSibling;
          let videoContainer = videoEle.parentElement;
          let pinned = videoContainer.getAttribute('pin') == 'true';
          if (pinned) {
            videoContainer.removeAttribute('pin');
          } else {
            videoContainer.setAttribute('pin', true);
          }
          if (document.pictureInPictureElement) {
            document.exitPictureInPicture();
          }
          videoEle.requestPictureInPicture().catch((error) => {
            // Error handling
            console.log('pip error', error);
          });
        }
        if (target.classList.contains('audio')) {
          let videoEle = target.parentElement.nextElementSibling;
          let videoContainer = videoEle.parentElement;
          let isMuted = videoContainer.getAttribute('muted') == 'true';
          if (isMuted) {
            videoContainer.removeAttribute('muted');
          } else {
            videoContainer.setAttribute('muted', true);
          }
          videoEle.srcObject.getAudioTracks().forEach((t) => {
            console.log({ t });
            t.enabled = !t.enabled;
          });
          if (this.dom.classList.contains('host')) {
            window.PEER_DATA_CONN?.send({ type: isMuted ? 'AUDIO_ON' : 'AUDIO_OFF' });
          }
        }
        if (target.classList.contains('video')) {
          let videoEle = target.parentElement.nextElementSibling;
          let videoContainer = videoEle.parentElement;
          let invisible = videoContainer.getAttribute('invisible') == 'true';
          if (invisible) {
            videoContainer.removeAttribute('invisible');
          } else {
            videoContainer.setAttribute('invisible', true);
          }
          videoEle.srcObject.getVideoTracks().forEach((t) => {
            console.log({ t });
            t.enabled = !t.enabled;
          });
          if (this.dom.classList.contains('host')) {
            window.PEER_DATA_CONN?.send({ type: invisible ? 'VIDEO_ON' : 'VIDEO_OFF' });
          }
        }
      },
      true
    );
  }
  initBgRemoving() {
    this.dom.addEventListener(
      'click',
      async ({ target }) => {
        console.log('click remote', { target });

        if (target.classList.contains('bg')) {
          let videoEle = target.parentElement.nextElementSibling;
          let videoContainer = videoEle.parentElement;
          let bgRemoved = videoContainer.getAttribute('bg-remove') == 'true';
          let bgRemoving = videoContainer.getAttribute('bg-removing') == 'true';
          if (bgRemoving) return;
          if (bgRemoved) {
            videoContainer.removeAttribute('bg-remove');
            bgRestore(this.dom);
          } else {
            videoContainer.setAttribute('bg-removing', true);
            await bgRemove(this.dom);
            videoContainer.removeAttribute('bg-removing');
            videoContainer.setAttribute('bg-remove', true);
          }
        }
      },
      true
    );
  }
  async initHostCamera() {
    this.dom.classList.add('host');
    //  贴上本地视频
    try {
      let videoDom = this.dom.querySelector('video');
      let stream = await navigator.mediaDevices.getUserMedia(localStreamConfig);
      VERA_STREAMS.push(stream);
      videoDom.srcObject = stream;
    } catch (error) {
      console.error('getUserMedia error', error);
      this.dom.setAttribute('camera-status', 'allow-error');
    }
    // incoming voice/video connection
    window.MyPeer.on('call', async (call) => {
      console.log('called from remote');
      try {
        let stream = await navigator.mediaDevices.getUserMedia(remoteStreamConfig);
        VERA_STREAMS.push(stream);
        call.answer(stream); // Answer the call with an A/V stream.
        call.on('stream', (s) => {
          VERA_STREAMS.push(s);
          let remoteVideoContainer = this.dom.nextElementSibling;
          let videoEle = remoteVideoContainer.querySelector('video');
          console.log('attach stream', videoEle);
          videoEle.srcObject = s;
          remoteVideoContainer.setAttribute('camera-status', 'connected');
          this.dom.setAttribute('camera-status', 'connected');
        });
        call.on('close', () => {
          console.log('call close');
        });
      } catch (error) {
        console.error('Failed to get local stream', error);
      }
    });
  }
  initRemoteCamera({ inviteId, localId }) {
    console.log('detected inviteId', inviteId);
    let prevHtml = this.dom.innerHTML;
    console.log('copy link');
    let obj = new URL(location.href);
    obj.searchParams.append('portal-vera-id', localId);
    console.log(obj.href);
    let inviteUrl = `https://nicegoodthings.com/transfer/${encodeURIComponent(obj.href)}`;
    this.dom.innerHTML = `${prevHtml}
    ${
      inviteId
        ? `<div class="invite">
        <button class='btn join'>Join</button>
        </div>
        `
        : `<div class="invite">
          <button class="btn copy">Copy Invite Link</button>
          <div class='link' contenteditable>${inviteUrl}</div>
        </div>`
    }`;
    this.dom.classList.add('remote');

    if (!inviteId) {
      // 邀请按钮的点击事件
      let inviteBtn = this.dom.querySelector('.btn.copy');
      let linkBox = this.dom.querySelector('.invite .link');
      linkBox.addEventListener('click', (evt) => {
        selectText(evt.target);
      });
      inviteBtn.addEventListener('click', () => {
        copyToClipboard(inviteUrl);
      });
    } else {
      // 响应加入按钮的事件
      let joinBtn = this.dom.querySelector('.btn.join');
      joinBtn.addEventListener('click', async () => {
        // create audio and video constraints
        try {
          let stream = await navigator.mediaDevices.getUserMedia(remoteStreamConfig);
          VERA_STREAMS.push(stream);
          console.log('join event peer called');
          let call = window.MyPeer.call(inviteId, stream);
          call.on('stream', (st) => {
            VERA_STREAMS.push(st);
            let remoteVideo = this.dom.querySelector('video');
            remoteVideo.srcObject = st;
            this.dom.setAttribute('camera-status', 'connected');
            this.dom.previousElementSibling.setAttribute('camera-status', 'connected');
            // console.log('connect from remote camrea', inviteId);
            // window.MyPeer.connect(inviteId);
          });
          call.on('close', () => {
            console.log('call close');
          });
        } catch (error) {
          this.dom.setAttribute('camera-status', 'allow-error');
          console.log('join event peer called,error');
          console.error('Failed to get local stream', error);
        }
      });
    }
  }
}
export default Camera;
