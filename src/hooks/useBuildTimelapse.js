import { gql, useMutation } from "@apollo/client";
import { Store } from '../config';


export default function useBuildTimelapse() {
  const {
    app: {
      auth: {
        accessToken: token,
      },
    },
  } = Store.getState();
  return useMutation(gql`
		mutation ($roomId: ID!) {
			buildTimelapse(
                roomId: $roomId,
            )
		}
	`, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
}
