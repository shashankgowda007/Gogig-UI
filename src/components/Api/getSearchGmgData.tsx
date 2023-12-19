

const BaseUrl = 'https://gjbq17jks3.execute-api.us-east-1.amazonaws.com/dev';

export async function getSearchGmgData(value: string) {
    return fetch(`${BaseUrl}/searchGMG?search=${value}`,
        {
            method: 'GET',
        }
    );
}