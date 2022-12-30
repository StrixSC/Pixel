import axios, { AxiosResponse } from "axios";
import { generateURLFromOptionObject } from './utils';
import { CListUrls, CListRequest, Contest, ContestRequestOptions, } from './../typings';

const { CLIST_USERNAME, CLIST_API_KEY } = process.env;

export const getAll = async <T, O>(endpoint: string, options: O): Promise<AxiosResponse<T>> => {
    const optionsString = generateURLFromOptionObject(options || {});
    const url = `${endpoint}?username=${CLIST_USERNAME}&api_key=${CLIST_API_KEY}${optionsString}`;
    const response = await axios.get<T>(url);
    return response;
}

export const getUpcommingContests = async (days: number = 7, max_ctfs: number = 10): Promise<Contest[]> => {
    const start = new Date();
    const end = new Date();
    end.setDate(end.getDate() + days);

    const options = {
        start_gte: start.toISOString(),
        end_lte: end.toISOString(),
        upcoming: true,
        limit: max_ctfs
    } as ContestRequestOptions;
    
    const response = await getAll<CListRequest, ContestRequestOptions>(CListUrls.GetContests, options);
    const data = (response.data) as CListRequest;
    return (data.objects as Contest[]);
}