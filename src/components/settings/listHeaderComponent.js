import React, { useEffect } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ActionSheetIOS,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

import { Grid } from '../../styles';


const ListHeaderComponent = ({
  label,
  onPress,
  onChangeImage,
  image,
}) => {
  useEffect(() => {
    (async () => {
      if (Constants.platform.ios) {
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
      }
    })();
  }, []);

  const optionsHandler = (buttonIndex) => {
    switch (buttonIndex) {
      case 0:
        (async () => {
          const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
          });
          if (!result.cancelled) {
            onChangeImage(result.uri);
          }
        })();
        break;
      case 1:
        (async () => {
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
          });
          if (!result.cancelled) {
            onChangeImage(result.uri);
          }
        })();
        break;
      default:
        break;
    }
  };

  const onPressHandler = () => {
    if (Constants.platform.ios) {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ["Camera", "Gallery", "Cancel"],
          destructiveButtonIndex: 2,
          cancelButtonIndex: 2,
        },
        optionsHandler,
      );
    }
    if (Constants.platform.android) {
      optionsHandler(1);
    }
  };

  return (
    <View style={[Grid.row]}>
      <View>
        <TouchableOpacity onPress={onPressHandler}>
          <View style={styles.image}>
            {image && (
              <Image source={{ uri: image }} style={styles.image} />
            )}
          </View>
        </TouchableOpacity>
      </View>
      <View style={[Grid.flex1, Grid.centeredY]}>
        <TouchableOpacity onPress={onPress}>
          <Text>{label}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 48,
    height: 48,
    borderRadius: 48,
    backgroundColor: "#c4c4c4",
    marginRight: 24,
  },
});

export default ListHeaderComponent;
