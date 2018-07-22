import { API_ENDPOINT } from './Endpoint';
type Params = { [key: string]: string | number };

export default class ApiClient {
  static get = async <T>(path: string, params: Params = {}): Promise<T> => {
    const url = ApiClient.createUrl(path, params);
    const response = await fetch(url);
    if (response.ok) {
      return (await response.json()) as T;
    } else {
      const status = response.status;
      const body = await response.text();
      throw new Error(`status: ${status}, body: ${body}`);
    }
  };

  static post = async <T>(path: string, body: string): Promise<T> => {
    const url = ApiClient.createUrl(path);
    const request: RequestInit = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: body,
    };
    const response = await fetch(url, request);
    if (response.ok) {
      return (await response.json()) as T;
    } else {
      const status = response.status;
      const body = await response.text();
      throw new Error(`status: ${status}, body: ${body}`);
    }
  };

  private static createUrl(path: string, params: Params = {}): string {
    let url: string;
    if (Object.keys(params).length == 0) {
      const encoded_params = ApiClient.encoded_params(params);
      url = `${API_ENDPOINT}/${path}?${encoded_params.join('&')}`;
    } else {
      url = `${API_ENDPOINT}/${path}`;
    }
    return url;
  }

  private static encoded_params(params: Params): string[] {
    return Object.keys(params).map(
      key => `${encodeURIComponent(key)}=${encodeURIComponent(String(params[key]))}`,
    );
  }
}
