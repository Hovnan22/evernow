import { gql, useMutation } from "@apollo/client";
import { Store } from '../config';

export default function useUploadFile() {
  const {
    app: {
      auth: {
        accessToken: token,
      },
    },
  } = Store.getState();
  return useMutation(gql`
		mutation ($file:Upload) {
			updateProfile(avatar:$file) {
				avatarUrl
			}
		}
	`, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    },
  });
}
