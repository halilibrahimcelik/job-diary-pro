import axios, {
  type AxiosInstance,
  type AxiosResponse,
  AxiosError,
  type InternalAxiosRequestConfig,
  type AxiosRequestConfig,
} from 'axios';

class ApiService {
  private axiosInstance: AxiosInstance;

  /**
   * Creates an instance of ApiService.
   * @param baseURL - The base URL for all API requests (e.g., 'https://api.example.com/').
   */
  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      withCredentials: true,
    });
    this.initializeInterceptors();
  }
  private initializeInterceptors() {
    //Request interceptor
    this.axiosInstance.interceptors.request.use(
      function (config: InternalAxiosRequestConfig) {
        const token = localStorage.getItem('authToken');
        const tokenExpires = localStorage.getItem('authTokenExpires');

        if (token && tokenExpires) {
          const expiresAt = parseInt(tokenExpires, 10);
          const now = new Date().getTime();

          // Check if token is still valid
          if (now < expiresAt) {
            config.headers.Authorization = `Bearer ${token}`;
          } else {
            // Token expired, remove it
            localStorage.removeItem('authToken');
            localStorage.removeItem('authTokenExpires');
            // Could trigger a logout action here if needed
          }
        }
        return config;
      },
      function (error: AxiosError) {
        // Do something with request error
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      function (response: AxiosResponse) {
        // Do something with response data
        return response;
      },
      function (error) {
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
    data?: Record<string, unknown> | FormData | undefined,
    config?: AxiosRequestConfig<Record<string, unknown>> | undefined
  ): Promise<AxiosResponse<T>> {
    const response = await this.axiosInstance.post(url, data, config);
    return response;
  }
  public async put<T>(
    url: string,
    data?: Record<string, unknown> | FormData | undefined,
    config?: AxiosRequestConfig<Record<string, unknown>> | undefined
  ): Promise<AxiosResponse<T>> {
    const response = await this.axiosInstance.put(url, data, config);
    return response;
  }
  public async patch<T>(
    url: string,
    data?: Record<string, unknown> | FormData | undefined,
    config?: AxiosRequestConfig<Record<string, unknown>> | undefined
  ): Promise<AxiosResponse<T>> {
    const response = await this.axiosInstance.patch(url, data, config);
    return response;
  }
  public async delete<T>(
    url: string,
    config?: AxiosRequestConfig<Record<string, unknown>> | undefined
  ): Promise<AxiosResponse<T>> {
    const response = await this.axiosInstance.delete(url, config);
    return response;
  }
}
export default ApiService;
