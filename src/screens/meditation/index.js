import React, {
  useState,
  useEffect,
} from 'react';
import {
  Text,
  View,
  Alert,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import {
  RTCView,
  mediaDevices,
  RTCPeerConnection,
  RTCSessionDescription,
} from 'react-native-webrtc';
import {
  checkMultiple,
  PERMISSIONS,
} from 'react-native-permissions';
import i18n from 'i18n-js';

import { SocketService } from '../../services';

import {
  StreamWrapper,
  StreamIntroCover,
} from '../../components/meditation';
import {
  AppButton,
  AppContainer,
} from '../../components/ui';
import { Grid } from '../../styles';


const { width, height } = Dimensions.get("window");


export async function requestCameraAndAudioPermission() {
  const statuses = await checkMultiple([
    PERMISSIONS.ANDROID.CAMERA,
    PERMISSIONS.IOS.CAMERA,
    PERMISSIONS.ANDROID.RECORD_AUDIO,
    PERMISSIONS.IOS.MICROPHONE,
  ]);
  return statuses;
}

function getCameraView() {
  return new Promise((resolve, reject) => {
    mediaDevices.enumerateDevices().then((sourceInfos) => {
      for (let i = 0; i < sourceInfos.length; i += 1) {
        const sourceInfo = sourceInfos[i];
        if (sourceInfo.kind === "videoinput" && sourceInfo.facing === "front") {
          mediaDevices.getUserMedia({
            audio: true,
            video: {
              width: width,
              height: height,
              frameRate: 30,
              facingMode: "user",
              deviceId: sourceInfo.deviceId,
            },
          })
            .then(resolve)
            .catch(reject);
        }
      }
    });
  });
}

const Meditation = ({
  user,
  navigation,
}) => {
  const [ready, setReady] = useState(false);
  const [access, setAccess] = useState(false);
  const [stream, setStream] = useState(false);
  const [remoteStream, setRemoteStream] = useState(false);

  const onOpenAlert = () => Alert.alert(
    null,
    i18n.t("screen.meditation.alert"),
    [
      {
        text: i18n.t("screen.meditation.complete"),
        onPress: () => navigation.goBack(),
      },
      {
        text: i18n.t("screen.meditation.connect"),
        onPress: () => setReady(true),
        style: "cancel",
      },
    ],
    { cancelable: false },
  );

  useEffect(() => {
    const socket = SocketService.createSocketConnection();

    requestCameraAndAudioPermission().then(() => {
      const configuration = { iceServers: [{ url: "stun:stun.l.google.com:19302" }] };
      const channel = socket.channel(`video:${user?.room.id}`, {});
      const pc = new RTCPeerConnection(configuration);
      console.log({ socket, pc });
      channel
        .join()
        .receive("ok", () => {
          console.log("Successfully joined call channel");
        })
        .receive("error", (e) => {
          console.log(e, "Unable to join");
        });

      channel.on("start", () => {
        console.log('aaaaa');
        pc.createOffer().then((desc) => {
          pc.setLocalDescription(desc).then(() => {
            channel.push("offer", { body: JSON.stringify(desc) });
          });
        });
      });

      channel.on("offer", (payload) => {
        const offer = JSON.parse(payload.body);
        const remoteDescription = new RTCSessionDescription(offer);
        pc.setRemoteDescription(remoteDescription);
        pc.createAnswer().then((answer) => {
          pc
            .setLocalDescription(answer)
            .then(() => {
              channel.push("answer", { body: JSON.stringify(pc.localDescription) });
            });
        });
      });

      channel.on("answer", (payload) => {
        const offer = JSON.parse(payload.body);
        const remoteDescription = new RTCSessionDescription(offer);
        pc.setRemoteDescription(remoteDescription);
      });

      channel.on("candidate", (payload) => {
        const candidate = JSON.parse(payload.body);
        pc.addIceCandidate(candidate).catch((e) => {
          console.log(e, "error add candidate");
        });
      });

      pc.onicecandidate = (event) => {
        channel.push("candidate", { body: JSON.stringify(event.candidate) });
      };

      pc.onaddstream = (event) => {
        setRemoteStream(event.stream);
      };

      getCameraView().then((s) => {
        setStream(s);
        pc.addStream(s);
      });

      setAccess(true);
    });
  }, []);

  return (
    <AppContainer noPadding>
      {access && ready ? (
        <StreamWrapper
          onMute={() => { }}
          onClose={onOpenAlert}>
          <View style={[Grid.flex1]}>
            {stream && (
              <RTCView
                mirror
                streamURL={stream?.toURL()}
                style={styles.rtcView}
              />
            )
            }
            {remoteStream
              && <RTCView
                streamURL={remoteStream?.toURL()}
                style={styles.rtcView}
              />
            }
          </View>
        </StreamWrapper>
      ) : (
        <StreamIntroCover
          onClose={onOpenAlert}
          bottom={(
            <AppButton
              onPress={() => setReady(true)}
              type={"outlined-white"}
              title={"screen.meditation.connect"}
              raised={true}
            />
          )}>
          {user.room && (
            <Text style={styles.centerdWhiteText}>
              {i18n.t("screen.meditation.streamIsReady")}
            </Text>
          )
          }
          {!user.room && (
            <Text style={styles.centerdWhiteText}>
              {i18n.t("screen.meditation.streamIsNotReady")}
            </Text>
          )}
        </StreamIntroCover>
      )}
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    flex: 1 / 2,
  },
  video: {
    flex: 1,
  },
  actions: {
    padding: 24,
  },
  rtcView: {
    flex: 1,
    display: "flex",
    backgroundColor: "#000",
  },
  centerdWhiteText: {
    color: "#fff",
    textAlign: "center",
    justifyContent: "center",
    fontSize: 20,
    fontWeight: "700",
  },
});

const mapStateToProps = ({ app: { user } }) => ({
  user,
})

export default connect(mapStateToProps)(Meditation);

