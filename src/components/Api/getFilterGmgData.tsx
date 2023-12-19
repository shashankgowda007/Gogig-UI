const BaseUrl = 'https://gjbq17jks3.execute-api.us-east-1.amazonaws.com/dev';

export async function getFilterGmgData(formvalue: any) {
  return fetch(`${BaseUrl}/getAllFilterGmg`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formvalue),
  });
}
