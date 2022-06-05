import { HTTPMethods, APIResponse } from '@csv-ui/types';
import { api } from '../boot/axios';

const apiClient = async <T>(path: string, method: HTTPMethods ) => {
  const call = api[method](path);
  const res = await (await call).data as APIResponse<T>;
  return res;
};

export default apiClient;
