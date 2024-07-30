import { advancedFetch } from "~/lib/utils/request_utils";

export async function likeTweet(id: string): Promise<void> {
	return await advancedFetch("like a tweet", `tweet/${id}/like`, "PUT");
}

export async function unlikeTweet(id: string): Promise<void> {
	return await advancedFetch("unlike a tweet", `tweet/${id}/unlike`, "PUT");
}

export async function bookmarkTweet(id: string): Promise<void> {
	return await advancedFetch("bookmark a tweet", `tweet/${id}/bookmark`, "PUT");
}

export async function unbookmarkTweet(id: string): Promise<void> {
	return await advancedFetch("like a tweet", `tweet/${id}/unbookmark`, "PUT");
}

export async function retweetTweet(id: string): Promise<void> {
	return await advancedFetch("retweet a tweet", `tweet/${id}/retweet`, "PUT");
}

export async function unretweetTweet(id: string): Promise<void> {
	return await advancedFetch(
		"unretweet a tweet",
		`tweet/${id}/unretweet`,
		"PUT",
	);
}
