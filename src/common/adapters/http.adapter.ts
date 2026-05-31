export abstract class HttpAdapter {
  abstract get<T = any>(url: string, options?: any): Promise<T>;
}
