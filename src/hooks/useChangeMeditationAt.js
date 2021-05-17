import { gql, useMutation } from "@apollo/client";
import { Store } from '../config';

export default function useChangeMeditationAt() {
  const {
    app: {
      auth: {
        accessToken: token,
      },
    },
  } = Store.getState();
  return useMutation(gql`
		mutation ($meditationAt:Time) {
			updateProfile(meditationAt:$meditationAt) {
				meditationAt
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
