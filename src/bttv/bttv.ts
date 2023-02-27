import axios from "axios";
import Emote, { SearchEmote } from "./emote.model";
export const BASE_ROUTE = "https://api.betterttv.net/3";
export const SHARED_EMOTES_ROUTE = BASE_ROUTE + "/emotes/shared";
export const SHARED_EMOTES_SEARCH_ROUTE = BASE_ROUTE + "/emotes/shared/search";
export const EMOTE_URL_CDN = "https://cdn.betterttv.net/emote";
export const TRENDING_EMOTES_ROUTE = BASE_ROUTE + "/emotes/shared/trending";

export const getTrendingEmotes = async (): Promise<Emote[]> => {
  try {
    const res = await axios.get<{ emote: Emote }[]>(`${TRENDING_EMOTES_ROUTE}`);
    const emotes = res.data.map((d) => d.emote);
    for (const emote of emotes) {
      emote.url = `${EMOTE_URL_CDN}/${emote.id}/3x.webp`;
    }
    return emotes;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const getEmotesWithSearchQuery = async (
  query: string,
  size: string
): Promise<SearchEmote[]> => {
  try {
    const res = await axios.get<SearchEmote[]>(
      `${SHARED_EMOTES_SEARCH_ROUTE}?query=${query}&limit=8`
    );
    const emotes = res.data;
    for (const emote of emotes) {
      emote["url"] = `${EMOTE_URL_CDN}/${emote.id}/${size}.${
        emote.animated ? "gif" : emote.imageType
      }`;
    }

    return emotes;
  } catch (e) {
    console.error(e);
  }
};
