import { gql, useMutation } from "@apollo/client";

export default function useChangePassword(token) {
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
