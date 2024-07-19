import { useParams } from "@solidjs/router";

export default function UserProfile() {
	const { username } = useParams();
	return <div>{username}</div>;
}
