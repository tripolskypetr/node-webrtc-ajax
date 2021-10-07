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
        this.connection = new RTCPeerConnection(/* ICE_SERVERS TURN */);
        this.connection.onicecandidate = (event) => {
            const { candidate: ice } = event;
            if (ice) {
                this.emit('ice', {
                    ice: JSON.stringify(ice.toJSON()),
                    fromUserId,
                    toUserId,
                });
            }
        };
        this.connection.onaddstream = function (event) {
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
            this.connection.createOffer()
                .then((sdp) => {
                    this.connection.setLocalDescription(sdp);
                    this.emit('sdp', {
                        sdp: JSON.stringify(sdp.toJSON()),
                        fromUserId,
                        toUserId,
                    });
                })
                .catch((err) => {
                    console.error(err);
                    throw new Error('peer-to-peer failed');
                });
        }
    };
    setRemoteSdp = (sdp) => {
        const desc = new RTCSessionDescription(sdp);
        return this.connection.setRemoteDescription(desc);
    };
    setRemoteIce = (ice) => {
        const desc = new RTCIceCandidate(ice);
        return this.connection.addIceCandidate(desc);
    };
};
