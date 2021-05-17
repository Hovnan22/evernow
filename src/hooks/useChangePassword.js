import { gql, useMutation } from "@apollo/client";
import { Store } from '../config';

export default function useChangePassword() {
  const {
    app: {
      auth: {
        accessToken: token,
      },
    },
  } = Store.getState();
  return useMutation(gql`
		mutation ($password:String!, $newPassword:String!) {
			changePassword(currentPassword:$password, newPassword:$newPassword) {
				status
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
