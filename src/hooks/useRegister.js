import { gql, useMutation } from "@apollo/client";

export default function useRegister() {
	return useMutation(gql`
		mutation ($email:String!, $language:String, $password:String!, $timezone:String) {
			signUp(email:$email, language:$language, password:$password, timezone:$timezone, ) {
				status
			}
		}
	`);
}
