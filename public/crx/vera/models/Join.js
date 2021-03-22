import { localStreamConfig, remoteStreamConfig } from './config.js';
import RemoteCamera from './RemoteCamera.js';
class Join {
  constructor({ inviteId = null }) {
    this.dom = document.createElement('div');
    this.dom.classList.add('join');
    this.dom.innerHTML = `
          <button class='btn'>Join</button>
      `;
    this.init(inviteId);
    return this.dom;
  }
  init(inviteId) {
    // 响应加入按钮的事件
    let joinBtn = this.dom.querySelector('.btn');
    joinBtn.addEventListener('click', async () => {
      // create audio and video constraints
      try {
        console.log('join event peer called');
        let remoteCamera = new RemoteCamera(inviteId);
        let cameraList = this.dom.previousElementSibling;
        console.log('attach remote video');
        cameraList.appendChild(remoteCamera.getDom());
        let call = MyPeer.call(inviteId, LOCAL_STREAM);
        call.on('stream', (st) => {
          REMOTE_STREAM = st;
          remoteCamera.attachStream(st);
          cameraList.setAttribute('camera-status', 'connected');
          this.dom.remove();
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
export default Join;