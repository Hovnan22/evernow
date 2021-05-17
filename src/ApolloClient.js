import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

export const apolloUri = "https://harmony-weath.fun/api";
export const apolloClient = new ApolloClient({
	uri: apolloUri,
	cache: new InMemoryCache(),
	link: createUploadLink({
		uri: apolloUri,
	}),
});

export default {};
