import { Platform } from 'react-native';

export default {
  Regular: Platform.select({ ios: 'SFProDisplay-Regular', android: 'Roboto-Regular' }),
  Italic: Platform.select({ ios: 'SFProDisplay-RegularItalic', android: 'Roboto-Italic' }),
  Bold: Platform.select({ ios: 'SFProDisplay-Bold', android: 'Roboto-Bold' }),
  LightItalic: Platform.select({ ios: 'SFProDisplay-LightItalic', android: 'Roboto-LightItalic' }),
  Medium: Platform.select({ ios: 'SFProDisplay-Medium', android: 'Roboto-Medium' }),
  SemiBold: Platform.select({ ios: 'SFProDisplay-Semibold', android: 'Roboto-Medium' }),
  SemiBoldItalic: Platform.select({ ios: 'SFProDisplay-SemiboldItalic', android: 'Roboto-MediumItalic' }),
  Arial: Platform.select({ ios: 'SFProDisplay-Regular', android: 'Roboto-Regular' }),
}
