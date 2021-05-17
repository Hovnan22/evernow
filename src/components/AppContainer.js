import React, { useEffect } from "react";
import { connect } from 'react-redux';

import { StorageService } from '../services';

import { setAuth } from '../actions/app';
import { useUpdateTokens } from "../hooks";

const AppContainer = ({
  user,
  auth,
  setAuth,
  children,
}) => {
  const [onUpdateToken] = useUpdateTokens();
  useEffect(() => {
    if (auth?.refreshToken) {
      onUpdateToken({ variables: { refreshToken: auth.refreshToken } })
        .then(async result => {
          const {
            data: {
              updateTokens: {
                accessToken,
                refreshToken,
              }
            }
          } = result;

          const authTokens = {
            accessToken: accessToken.token,
            refreshToken: refreshToken.token,
          }

          setAuth(authTokens);
          await StorageService.setAuthTokens(authTokens);
        });
    }
  }, []);
  useEffect(() => {
    StorageService.setUserData(user);
  }, [user])

  return (
    <>
      {children}
    </>
  );
}

const mapStateToProps = ({ app: { auth, user } }) => ({
  user,
  auth,
});

const mapDispatchToProps = dispatch => ({
  setAuth: auth => dispatch(setAuth(auth)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
