import React from "react";

import { AppContainer } from '../../components/ui';


const SettingPage = ({
  navigation,
  route: {
    params: {
      children,
      withBackground,
      noPadding,
    }
  },
}) => (
  <AppContainer
    withBackground={withBackground}
    navigation={navigation}
    noPading={noPadding}
  >
    {children}
  </AppContainer>
);

export default SettingPage
