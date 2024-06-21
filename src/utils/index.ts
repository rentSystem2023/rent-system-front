export const convertUrlToFile = async (url: string) => {
    const response = await fetch(url);
    const data = await response.blob();
    const extd = url.split('.').pop();
    const fileName = url.split('/').pop();
    const meta = { type: `image/${extd}` };

    return new File([data], fileName as string, meta);    
};

export const getYYYYMMDD = (date: Date) => {
    return `${date.getFullYear()}-${date.getMonth() > 8 ? date.getMonth() + 1 : `0${(date.getMonth() + 1)}` }-${date.getDate() > 10 ? date.getDate() : `0${(date.getDate())}`}`
};