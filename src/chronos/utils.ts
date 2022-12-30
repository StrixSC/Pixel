export const generateURLFromOptionObject = (option: Object): string => {
    const keys = Object.keys(option);
    const url = []
    for (const key of keys) {
        url.push(`&${key}=${option[key]}`);
    }
    return url.join("");
}