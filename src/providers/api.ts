import { AxiosRequestConfig } from 'axios';

import api from './axiosInstance';
import getHeaders from './getHeaders';

export interface IHttpRequestParams {
  extraHeaders?: Record<string, string>;

  axiosConfig?: Omit<
    AxiosRequestConfig,
    'headers' | 'method' | 'data' | 'cancelToken'
  >;
}

export interface IPostRequestParams extends IHttpRequestParams {
  body?: Record<string, unknown> | string | FormData;
  // TODO: Config multipart/form-data
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

const httpRequest = async (
  uri: string,
  method: HttpMethod,
  props: IPostRequestParams = {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  const headers = getHeaders(props);
  const endpoint = `${process.env.NEXT_PUBLIC_BASE_API_URL}/${uri}/`;

  const isFormData = props.body instanceof FormData;
  const dataPayload = isFormData
    ? props.body
    : props.body
      ? typeof props.body === 'string'
        ? JSON.parse(props.body)
        : props.body
      : undefined;

  const params = {
    url: endpoint,
    withCredentials: true,
    ...(props.axiosConfig || {}),
    ...(dataPayload !== undefined && { data: dataPayload }),
    headers,
    method,
  };

  return await api(params);
};

export const get = (uri: string, params?: IHttpRequestParams) =>
  httpRequest(uri, 'GET', params);

export const post = (uri: string, params?: IPostRequestParams) =>
  httpRequest(uri, 'POST', params);

export const put = (uri: string, params?: IPostRequestParams) =>
  httpRequest(uri, 'PUT', params);

export const patch = (uri: string, params?: IPostRequestParams) =>
  httpRequest(uri, 'PATCH', params);

export const del = (uri: string, params?: IHttpRequestParams) =>
  httpRequest(uri, 'DELETE', params);
