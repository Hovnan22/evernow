import { gql, useQuery } from "@apollo/client";

export default function useProfile(token) {
	return useQuery(gql`
		query {
			user {
				avatarUrl
				language
				timezone
				meditationAt
				emails {
					active
				}
				room {
					id
					startTimestamp
				}
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
