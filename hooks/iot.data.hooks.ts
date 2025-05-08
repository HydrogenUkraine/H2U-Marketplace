import { useAtom } from 'jotai';
import { fetchH2IotData } from '@/lib/jotai/iot-actions';

export const useH2IotData = () => {
  const [h2IotDataState, fetchh2IotData] = useAtom(fetchH2IotData);

  return {
    h2IotDataState,
    fetchh2IotData,
  };
};