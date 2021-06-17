import { gql, useMutation } from "@apollo/client";
import { Store } from '../config';


export default function useUploadImages() {
  const {
    app: {
      auth: {
        accessToken: token,
      },
    },
  } = Store.getState();
  return useMutation(gql`
		mutation ($frame:Upload!, $frameNumber: Int!, $roomId: ID!) {
			addFrame(
                frame: $frame,
                frameNumber: $frameNumber,
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
