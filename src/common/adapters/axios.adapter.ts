import axios, { AxiosInstance } from 'axios';

import { Injectable } from '@nestjs/common';

import { HttpAdapter } from './http.adapter';

@Injectable()
export class AxiosAdapter implements HttpAdapter {
  private readonly axios: AxiosInstance = axios;

  async get<T>(url: string): Promise<T> {
    const { data } = await this.axios.get<T>(url);
    return data;
  }
}
