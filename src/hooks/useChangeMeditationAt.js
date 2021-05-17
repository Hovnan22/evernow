import { gql, useMutation } from "@apollo/client";

export default function useChangeMeditationAt(token) {
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
