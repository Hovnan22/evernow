import { gql, useMutation } from "@apollo/client";

export default function useChangeLanguage(token) {
	return useMutation(gql`
		mutation ($language:String) {
			updateProfile(language:$language) {
				language
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
