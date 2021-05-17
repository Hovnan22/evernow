import { gql, useMutation } from "@apollo/client";

export default function useChangeTimeZone(token) {
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
