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

export interface ResourceRequestOptions {
    limit?: number,
    offset?: number,
    total_count?: boolean,
    id?: number,
    id__in?: number,
    name?: string,
    name__iregex?: string,
    name__regex?: string,
    name__in?: string,
    short__iregex?: string,
    short__regex?: string,
    short__in?: string,
    n_accounts?: number,
    n_accounts__gt?: number,
    n_accounts__lt?: number,
    n_accounts__gte?: number,
    n_accounts__lte?: number,
    n_contests?: number,
    n_contests__gt?: number,
    n_contests__lt?: number,
    n_contests__gte?: number,
    n_contests__lte?: number,
    order_by?: number,
}