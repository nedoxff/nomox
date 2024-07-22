import { createContext } from "solid-js";
import type { Tweet } from "~/api/types/tweet";

export const TweetContext = createContext<Tweet>();
