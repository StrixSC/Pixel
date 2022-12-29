export interface RequestMetadata {
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total_count: number;
}

export interface Contest {
    "id": number,
    "resource": string,
    "resource_id": number,
    "host": string,
    "event": string,
    "start": Date,
    "end": Date,
    "parsed_at": Date,
    "duration": Date,
    "href": string,
    "problems": string,
}

export interface ContestRequest {
    meta: RequestMetadata;
    objects: Contest[];
}