import {
	type TextEntity,
	TweetEntityType,
	type TweetEntity,
	type UserMentionEntity,
	type HashtagEntity,
} from "~/api/types/tweet";
import TweetUserMention from "./entities/TweetUserMention";
import Split from "../Split";
import Twemojify from "../Twemojify";
import TweetHastag from "./entities/TweetHashtag";

export default function TweetTextRenderer(props: { entities: TweetEntity[] }) {
	return (
		<div>
			{props.entities.map((entity) => {
				switch (entity.type) {
					case TweetEntityType.Text: {
						const rawText = (entity as TextEntity).text;
						return (
							<Twemojify>
								<Split text={rawText} by={/(\n)/gi} replacement={<br />} />
							</Twemojify>
						);
					}
					case TweetEntityType.UserMention: {
						const mention = entity as UserMentionEntity;
						return (
							<TweetUserMention id={mention.id} username={mention.username} />
						);
					}
					case TweetEntityType.Hashtag: {
						const hashtag = entity as HashtagEntity;
						return <TweetHastag tag={hashtag.tag} />;
					}
				}
			})}
		</div>
	);
}
