class EventEmitter {
    constructor() {
        this.events = {};
    };
    emit(eventName, data) {
        const event = this.events[eventName];
        if (event) {
            event.forEach(fn => {
                fn.call(null, data);
            });
        }
    };
    on(eventName, fn) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(fn);
        return () => {
            this.events[eventName] = this.events[eventName].filter(eventFn => fn !== eventFn);
        };
    };
};

class PeerToPeer extends EventEmitter {
    constructor({
        initiator = false,
        mediaStream = null,
        fromUserId = -1,
        toUserId = -1,
    }) {
        super();
        this.fromUserId = fromUserId;
        this.toUserId = toUserId;
        this.initiator = initiator;
        this.connection = new RTCPeerConnection({url:"stun:stun.l.google.com:19302"});
        this.connection.addEventListener('icecandidate', (event) => {
            const { candidate: ice } = event;
            /*if (ice) {
                this.emit('ice', {
                    ice: JSON.stringify(ice.toJSON()),
                    fromUserId,
                    toUserId,
                });
            }*/
        });
        this.connection.onaddstream = (event) => {
            const { stream: remoteStream } = event;
            if (remoteStream) {
                this.emit('stream', {
                    stream: remoteStream,
                    fromUserId,
                    toUserId,
                });
            }
        };
        this.connection.addStream(mediaStream);
        if (initiator) {
            console.log('offer')
            this.connection.createOffer()
                .then((sdp) => this.handleSdp(sdp))
                .catch((err) => {
                    console.error(err);
                    throw new Error('peer-to-peer offer failed');
                });
        }
    };
    handleSdp = async (sdp) => {
        await this.connection.setLocalDescription(sdp);
        this.emit('sdp', {
            sdp: JSON.stringify(sdp.toJSON()),
            fromUserId: this.fromUserId,
            toUserId: this.toUserId,
        });
    };
    setRemoteSdp = async (sdp = '') => {
        const desc = new RTCSessionDescription(JSON.parse(sdp));
        console.log(desc);
        await this.connection.setRemoteDescription(desc);
        if (!this.initiator) {
            console.log('answer')
            await this.connection.createAnswer()
                .then((sdp) => this.handleSdp(sdp))
                .catch((err) => {
                    console.error(err);
                    throw new Error('peer-to-peer answer failed');
                });
        }
    };
    /*setLocalSdp = async (sdp = '') => {
        const desc = new RTCSessionDescription(JSON.parse(sdp));
        this.connection.setLocalDescription(desc);
    };*/
    setRemoteIce = (ice = '') => {
        const desc = new RTCIceCandidate(JSON.parse(ice));
        console.log(desc);
        return this.connection.addIceCandidate(desc);
    };
};
