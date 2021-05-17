import { gql, useQuery } from "@apollo/client";
import { Store } from '../config';

export default function useProfile() {
  const {
    app: {
      auth: {
        accessToken: token,
      },
    },
  } = Store.getState();
  return useQuery(gql`
		query {
			user {
				avatarUrl
				language
				timezone
				meditationAt
				emails {
					active
				}
				room {
					id
					startTimestamp
				}
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
