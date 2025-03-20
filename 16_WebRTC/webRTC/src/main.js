import './style.css';

let localStream;
let remoteStream;
let peerConnection;

const servers = {
  iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302'],
    }
  ]
}

async function init() {
  localStream = await navigator.mediaDevices.getDisplayMedia({video: true, audio: false});
  document.getElementById("localVideo").srcObject = localStream;

}

async function createPeerConnection(sdpOfferTextAreaId) {
  peerConnection = new RTCPeerConnection(servers);

  remoteStream = new MediaStream();
  document.getElementById("remoteVideo").srcObject = remoteStream;


  localStream.getTracks().forEach((track) => peerConnection.addTrack(track, localStream));

    //localStream.getTracks();
    console.log("r", localStream.getTracks());

  // listen to remote tracks from the peer
  peerConnection.ontrack = (event) => {
    event.streams[0].getTracks().forEach((track) => remoteStream.addTrack(track));
  };

  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      document.getElementById(sdpOfferTextAreaId).textContent = JSON.stringify(peerConnection.localDescription)
    }
  };

}


async function  createOffer() {
  if(!localStream)
  {
    return alert("local stream is not ready");
  }

  const offer = await createPeerConnection("sdpOfferTextArea");

  // tells webRTC that a peer wants to start a connection which trigger the ICE candidate gathering
  await peerConnection.setLocalDescription(offer);
}

async function createAnswser() {
  await createPeerConnection("sdpAnswerTextArea");

  let offer = document.getElementById("sdpAnswerTextArea").value;

  if(!offer) return alert("offer is required");
  offer = JSON.parse(offer);

  await peerConnection.setRemoteDescription(offer);

  // here we call ourself .... inside the function ... endless loop ?
  const answer = await peerConnection.createAnswser();
  await peerConnection.setLocalDescription(answer);

  document.getElementById("sdpAnswerTextArea").textContent = JSON.stringify(answer);
}

async function addAnswser() {
  let answer = document.getElementById("sdpAnswerTextArea").value;
  if(!answer) return alert("answer is required");
  answer = JSON.parse(answer);

  if (!peerConnection.currentRemoteDescription) {
    peerConnection.setRemoteDescription(answer);
  }
}

init();
document.getElementById("createOfferButton").addEventListener("click", createOffer);
document.getElementById("createAnswerButton").addEventListener("click", createAnswser);
document.getElementById("addAnswerButton").addEventListener("click", addAnswser);

