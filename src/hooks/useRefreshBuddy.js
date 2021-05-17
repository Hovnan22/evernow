import { gql, useMutation } from "@apollo/client";
import { Store } from '../config';

export default function useRefreshBuddy() {
  const {
    app: {
      auth: {
        accessToken: token,
      },
    },
  } = Store.getState();
  return useMutation(gql`
		mutation {
			refreshBuddy {
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
