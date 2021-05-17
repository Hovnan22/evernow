import React, { useContext, useEffect } from "react";
import AppContext, { setAuthorization, setSettings } from "../context/AppContext";
import {
  useProfile,
  useUpdateTokens,
} from "../hooks";

export default function AppContainer({ children }) {
  const { app: { auth }, dispatch } = useContext(AppContext);
  const { data } = useProfile(auth.accessToken);
  const [onUpdateToken] = useUpdateTokens();
  useEffect(() => {
    if (auth?.refreshToken) {
      onUpdateToken({ variables: { refreshToken: auth.refreshToken } })
        .then((result) => {
          const { data: { updateTokens } } = result;
          const { refreshToken, accessToken } = updateTokens;
          dispatch(setAuthorization(accessToken.token, refreshToken.token));
        });
    }
  }, []);
  useEffect(() => {
    dispatch(setSettings(data?.user));
  }, [data?.user]);
  return <>
    {children}
  </>;
}
