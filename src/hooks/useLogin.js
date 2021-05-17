import { gql, useMutation } from "@apollo/client";

export default function useLogin() {
	return useMutation(gql`
		mutation ($email:String!, $password:String!) {
			signIn(email:$email, password:$password) {
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
