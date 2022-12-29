import { RequestMetadata } from "./contest.type";

export interface ResourceWrapperObject { 
    resource: Resource[]
}

export interface Resource {
    "id": number,
    "name": string,
    "icon": string,
    "short": string,
    "n_accounts": number,
    "n_contests": number
}

export interface ResourceRequest {
    meta: RequestMetadata,
    objects: Resource[]
}