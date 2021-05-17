import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';

const femaleImage = require('src/assets/images/default-user-female.png');
const maleImage = require('src/assets/images/default-user-male.png');
const maleFhdImage = require('src/assets/images/default-user-male-fhd.png');
const femaleFhdImage = require('src/assets/images/default-user-female-fhd.png');

const AppImage = ({ photos, size, fileName, style, gender, fromVerify, verify, ...props }) => {
  const [imageSrc, setImageSrc] = useState(
    fileName ? { uri: `${photos}${size}/${fileName}` } : gender === 'Female' ? femaleImage : maleImage
  );

  const onError = () => {
    // default props doesn't working on Debug Builds, so we need to manually change source of error image.
    const defaultMaleImage = size === 'fullhd' ? maleFhdImage : maleImage;
    const defaultFemaleImage = size === 'fullhd' ? femaleFhdImage : femaleImage;
    setImageSrc(gender === 'Female' ? defaultFemaleImage : defaultMaleImage);
  };

  useEffect(() => {
    setImageSrc({ uri: `${fromVerify ? verify : photos}${size}/${fileName}` });
  }, [fileName]);

  // const [waterMarkBottom, setWaterMarkBottom] = useState(4);
  // const [waterMarkRight, setWaterMarkRight] = useState(4);
  // const [imageHeight, setImageHeight] = useState(0);
  // const [imageWidth, setImageWidth] = useState(0);

  const image = (
    <Image
      {...props}
      fadeDuration={0}
      source={imageSrc}
      // defaultSource={gender && gender.toLowerCase() === 'female' ? femaleImage : maleImage}
      style={[{ width: '100%', height: '100%', backgroundColor: '#E6E6E6' }, style]}
      onError={onError}
    // onLayout={({ nativeEvent: { layout: { width, height } } }) => {
    //   if (props.resizeMode === 'contain') {
    //     setImageHeight(height);
    //     setImageWidth(width);
    //   }
    // }}
    // onLoad={({ nativeEvent: { source: { height, width } } }) => {
    //   if (props.resizeMode === 'contain') {
    //     const IMAGE_HEIGHT = imageHeight;
    //     const IMAGE_WIDTH = imageWidth;

    //     const imageRation = IMAGE_HEIGHT / IMAGE_WIDTH;
    //     const loadedImageRatio = height / width;
    //     if (imageRation > loadedImageRatio) {
    //       const imgHeight = IMAGE_WIDTH / width * height;
    //       setWaterMarkBottom(((IMAGE_HEIGHT - imgHeight) / 2) + 4);
    //     } else {
    //       const imgWidth = IMAGE_HEIGHT / height * width;
    //       setWaterMarkRight(((IMAGE_WIDTH - imgWidth) / 2) + 4);
    //     }
    //   }

    // }}
    />
  )

  // if (size === 'fullhd') {

  //   return (
  //     <AppImageWatermark
  //       right={waterMarkRight}
  //       bottom={waterMarkBottom}
  //     >
  //       {image}
  //     </AppImageWatermark>
  //   )
  // } else {
  //   return image;
  // }
  return image;

};

AppImage.defaultProps = {
  size: 'fc220x220',
  resizeMode: 'cover',
};

const mapStateToProps = ({ constants: { domains: { photos, verify } } }) => ({
  photos,
  verify,
});
export default connect(mapStateToProps)(AppImage);
