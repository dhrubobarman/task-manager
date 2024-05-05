import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { TToast, useToast } from "../components/use-toast";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 2000,
});

const onErrorResponse = (
  error: AxiosError | Error,
  toast: TToast,
  setLoading?: (prev: boolean) => void
): Promise<AxiosError> => {
  if (axios.isAxiosError(error)) {
    const { message } = error;
    const { method, url } = error.config as AxiosRequestConfig;
    const { statusText, status } = (error.response as AxiosResponse) ?? {};

    switch (status) {
      case 401: {
        toast({
          variant: "destructive",
          title: "Error!",
          description: `🚨 [API] ${method?.toUpperCase()} ${url} | Error ${status} ${statusText} ${message}`,
        });
        break;
      }
      case 403: {
        // "Permission denied"
        break;
      }
      case 404: {
        // "Invalid request"
        break;
      }
      case 500: {
        // "Server error"
        break;
      }
      default: {
        toast({
          variant: "destructive",
          title: "Error!",
          description: `🚨 [API] ${method?.toUpperCase()} ${url} | Error ${status} ${statusText} ${message}`,
        });
        break;
      }
    }

    if (status === 401) {
      sessionStorage.removeItem("token");
    }
  } else {
    toast({
      variant: "destructive",
      title: "Error!",
      description: `🚨 ${error}`,
    });
  }
  setLoading?.(false);
  return Promise.reject(error);
};

const onResponse = (
  response: AxiosResponse,
  setLoading?: (prev: boolean) => void
): AxiosResponse => {
  // const { method, url } = response.config;
  // const { status } = response;
  setLoading?.(false);
  // if (status === 200) {
  //   console.log(response);
  // }
  return response;
};

export const useAxios = (
  setLoading?: (prev: boolean) => void
): AxiosInstance => {
  const { toast } = useToast();
  axiosInstance.interceptors.response.use(
    (response) => onResponse(response, setLoading),
    (error) => onErrorResponse(error, toast, setLoading)
  );
  return axiosInstance;
};

axiosInstance.interceptors.response.use(onResponse, function (error) {
  return Promise.reject(error.response.data);
});
