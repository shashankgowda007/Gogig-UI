
const BaseUrl = 'https://gjbq17jks3.execute-api.us-east-1.amazonaws.com/dev/getAllGmgData';

export async function getAllGmgData() {
    return fetch(`${BaseUrl}/candidate`,
        {
            method: 'GET',
            
        }
    );
}