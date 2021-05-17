import { gql, useMutation } from "@apollo/client";
import { Store } from '../config';

export default function useChangeTimeZone() {
  const {
    app: {
      auth: {
        accessToken: token,
      },
    },
  } = Store.getState();
  return useMutation(gql`
		mutation ($timezone:String) {
			updateProfile(timezone:$timezone) {
				timezone
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
