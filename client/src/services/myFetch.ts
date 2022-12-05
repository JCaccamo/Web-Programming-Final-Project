export const API_ROOT = '../data/users.json';

export default function myFetch<T>(url: string): Promise<T> {
    return fetch(API_ROOT + url).then( x=>x.json() );
}
