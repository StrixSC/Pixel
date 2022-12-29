import { ResourceRequest, ResourceRequestOptions } from './../typings/resource.type';
import axios from "axios";
import { ClistUrls, ClistResourceTypes } from "../typings/clist-urls.enum";
import { Resource } from "../typings/resource.type";
const { CLIST_USERNAME, CLIST_API_KEY } = process.env;

// TODO: turn keys into enum keys
const resourceTypeHandler: Record<keyof typeof ClistResourceTypes, ResourceRequestOptions> = {
    Top10: {
        n_contests__gte: 1000,
        limit: 10
    },
    CompetitiveProgramming: {},
    CTF: {}
}  


export const getAllResources = async (options?: ResourceRequestOptions): Promise<Resource[]> => {
    const url = `${ClistUrls.GetResources}?username=${CLIST_USERNAME}&api_key=${CLIST_API_KEY}`;
    const response = await axios.get<ResourceRequest>(url);
    return response.data.objects;
}