import { ref } from 'vue';

const useApi = () => {
  const response = ref();
  return { response };
}

export default useApi;
