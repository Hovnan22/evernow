import { gql, useMutation } from "@apollo/client";
import { Store } from '../config';

export default function useChangeLanguage() {
  const {
    app: {
      auth: {
        accessToken: token,
      },
    },
  } = Store.getState();
  return useMutation(gql`
		mutation ($language:String) {
			updateProfile(language:$language) {
				language
			}
		}
	`, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
}
