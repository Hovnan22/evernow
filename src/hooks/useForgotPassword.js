import { gql, useMutation } from "@apollo/client";

export default function useForgotPassword() {
	return useMutation(gql`
		mutation ($email:String!) {
			forgotPassword(email:$email) {
				status
			}
		}
	`);
}
