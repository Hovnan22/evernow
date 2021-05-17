import { gql, useMutation } from "@apollo/client";

export default function useRefreshBuddy(token) {
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
