import axios, {
  type AxiosInstance,
  type AxiosResponse,
  AxiosError,
  type InternalAxiosRequestConfig,
} from 'axios';

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
    });
    this.initializeInterceptors();
  }
  private initializeInterceptors() {
    //Request interceptor
    this.axiosInstance.interceptors.request.use(
      function (config: InternalAxiosRequestConfig) {
        return config;
      },
      function (error: AxiosError) {
        // Do something with request error
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      function (response: AxiosResponse) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
      },
      function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
      }
    );
  }
  public async get<T>(
    url: string,
    params?: Record<string, unknown>
  ): Promise<AxiosResponse<T>> {
    const response = await this.axiosInstance.get<T>(url, {
      params,
    });
    return response;
  }
  public async post<T>(
    url: string,
    data?: Record<string, unknown>
  ): Promise<AxiosResponse<T>> {
    const response = await this.axiosInstance.post(url, data);
    return response;
  }
  public async put<T>(
    url: string,
    data?: Record<string, unknown>
  ): Promise<AxiosResponse<T>> {
    const response = await this.axiosInstance.put(url, data);
    return response;
  }
  public async delete<T>(
    url: string,
    data?: Record<string, unknown>
  ): Promise<AxiosResponse<T>> {
    const response = await this.axiosInstance.delete(url, data);
    return response;
  }
}
export default ApiService;

// const apiClient = axios.create({
//   baseURL: 'http://localhost:8080/api/v1',
// });

// export default apiClient;
