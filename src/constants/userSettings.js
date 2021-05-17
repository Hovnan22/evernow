import React from 'react';

import {
  ChangeEmailForm,
  ChangePasswordForm,
  ChangeMeditationTime,
  ChangeTimeZone,
  ChangeLanguage,
} from '../components/settings';

export default navigation => ([
  {
    id: 'meditationTime',
    title: "screen.settings.changeMeditationTime",
    onPress: () => navigation.navigate("SettingPage", {
      children: <ChangeMeditationTime navigation={navigation} />,
      withBackground: true,
      noPadding: false,
    }),
  },
  {
    id: "timeZone",
    title: "screen.settings.changeTimeZone",
    onPress: () => navigation.navigate("SettingPage", {
      children: <ChangeTimeZone navigation={navigation} />,
      withBackground: true,
      noPadding: false,
    }),
  },
  {
    id: "email",
    title: "screen.settings.changeEmail",
    onPress: () => navigation.navigate("SettingPage", {
      children: <ChangeEmailForm navigation={navigation} />,
      withBackground: true,
      noPadding: false,
    }),
  },
  {
    id: "password",
    title: "screen.settings.changePassword",
    onPress: () => navigation.navigate("SettingPage", {
      children: <ChangePasswordForm navigation={navigation} />,
      withBackground: true,
      noPadding: false,
    }),
  },
  {
    id: "language",
    title: "screen.settings.changeLanguage",
    onPress: () => navigation.navigate("SettingPage", {
      children: <ChangeLanguage navigation={navigation} />,
      withBackground: false,
      noPadding: true,
    }),
  },
]);
