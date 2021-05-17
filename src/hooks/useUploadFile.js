import { gql, useMutation } from "@apollo/client";

export default function useUploadFile(token) {
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
			},
		},
	});
}
