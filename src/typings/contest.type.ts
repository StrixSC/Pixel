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
    "start": string,
    "end": string,
    "parsed_at": string,
    "duration": string,
    "href": string,
    "problems": string,
}
    
export interface ContestRequestOptions {
    limit?: number,
    offset?: number,
    total_count?: boolean,
    with_problems?: boolean,
    upcoming?: boolean
    format_time?: boolean,
    start_time__during?: string,
    end_time__during?: string,
    id?: number,
    id__in?: number,
    resource_id?: number,
    resource_id__in?: number,
    resource?: number,
    host?: string,
    host__iregex?: string,
    host__regex?: string,
    event?: string,
    event__iregex?: string,
    event__regex?: string,
    start?: string,
    start__gt?: string,
    start__lt?: string,
    start__gte?: string,
    start__lte?: string,
    start__week_day?: string,
    end?: string,
    end__gt?: string,
    end__lt?: string,
    end__gte?: string,
    end__lte?: string,
    end__week_day?: string,
    parsed_at?: string,
    parsed_at__gt?: string,
    parsed_at__lt?: string,
    parsed_at__gte?: string,
    parsed_at__lte?: string,
    duration?: string,
    duration__gt?: string,
    duration__lt?: string,
    duration__gte?: string,
    duration__lte?: string,
    filtered?: boolean,
    category?: string,
    order_by?: string,
}