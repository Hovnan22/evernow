import React, { Suspense } from 'react';
import { ActivityIndicator } from 'react-native';


const components = {
  'close': React.lazy(() => import('../../assets/icons/close.svg')),
  'camera': React.lazy(() => import('../../assets/icons/camera.svg')),
  'volume_on': React.lazy(() => import('../../assets/icons/volume.svg')),
  'volume_off': React.lazy(() => import('../../assets/icons/volume_off.svg')),
  'start': React.lazy(() => import('../../assets/icons/start.svg')),
  'settings': React.lazy(() => import('../../assets/icons/settings.svg')),
  'down': React.lazy(() => import('../../assets/icons/down.svg')),
  'logo': React.lazy(() => import('../../assets/icons/logo.svg')),
  'meditationType': React.lazy(() => import('../../assets/icons/meditationType.svg')),
  'arrowDown': React.lazy(() => import('../../assets/icons/arrowDown.svg')),
  'yog': React.lazy(() => import('../../assets/icons/yog.svg')),
};

const RenderIcon = ({
  fill,
  icon,
  style,
  width,
  height,
  onPress,
}) => {
  const props = { width, height, fill, onPress };
  const styles = { width: '100%', height: '100%' };
  const TagName = components[icon];
  if (TagName) {
    return (
      <Suspense fallback={<ActivityIndicator size="small" color="#888888" />}>
        <TagName
          {...props}
          style={{ ...styles, ...style }}
        />
      </Suspense>
    )
  }
  return null;
};

const AppIcon = props => <RenderIcon {...props} />;

AppIcon.defaultProps = {
  style: {},
  fill: null,
  width: null,
  height: null,
  icon: 'back',
  onPress: null
};

export default AppIcon;
