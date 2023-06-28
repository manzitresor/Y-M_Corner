class APIRequest {
  get = async (baseUrl) => {
    const response = await fetch(`${baseUrl}`, {
      method: 'GET',
    });
    return response.json();
  }

  post = async (baseUrl, body) => {
    const response = await fetch(`${baseUrl}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    return response.json();
  }
}

export default APIRequest;
