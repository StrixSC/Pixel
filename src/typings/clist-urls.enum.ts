const BASE_URL = "https://clist.by";

export const ClistUrls = {
    GetContests:`${BASE_URL}/api/v2/contest/`,
    GetContestInfo:`${BASE_URL}/api/v2/contest/:id`,
    GetResources: `${BASE_URL}/api/v2/resource`,
    GetResourceInfo: `${BASE_URL}/api/v2/resource/:id`,
}

export const ClistResourceTypes = {
    Top10: "resource_top10",
    CompetitiveProgramming: "resource_cp",
    CTF: "resource_ctf",
}