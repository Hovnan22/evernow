import { gql, useMutation } from "@apollo/client";

export default function useUpdateTokens() {
	return useMutation(gql`
		mutation ($refreshToken:String) {
			updateTokens(refreshToken:$refreshToken) {
				accessToken {
					token
				},
				refreshToken {
					token
				}
			}
		}
	`);
}
