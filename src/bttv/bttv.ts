const BASE_ROUTE = "https://api.betterttv.net/3";
const SHARED_EMOTES_ROUTE = BASE_ROUTE + "/emotes/shared";
const SHARED_EMOTES_SEARCH_ROUTE = BASE_ROUTE + "/emotes/shared/search";
const EMOTE_URL_CDN = "https://cdn.betterttv.net/emote";
const TRENDING_EMOTES_ROUTE = BASE_ROUTE + "/emotes/shared/trending";
import axios from "axios";
import Emote from "./emote.model";

export const getTrendingEmotes = async (): Promise<Emote[]> => {
  try {
    const emotes = await axios.get<Emote[]>(`${TRENDING_EMOTES_ROUTE}`);
    console.log(emotes.data);
    for (const emote of emotes.data) {
      emote.url = `${EMOTE_URL_CDN}/${emote.id}/3x.webp`;
    }
    return emotes.data;
  } catch (e) {
    console.error(e);
    return [];
  }
};
