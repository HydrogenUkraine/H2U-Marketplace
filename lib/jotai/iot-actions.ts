import { atom } from "jotai";
import { IotDataState, h2IotDataStateAtom } from "./atoms/iotDataState";
import { ActionOptions } from "./action-options";
import { api } from "../api/api";

export const fetchH2IotData = atom(
  (get) => get(h2IotDataStateAtom),
  async (get, set, options?: ActionOptions) => {
    try {
      const response = await api.get("/iot-data/processed");
      if (response.status === 200) {
        const iotData: IotDataState[] = response.data; // assuming API returns an array
        set(h2IotDataStateAtom, iotData);
        options?.onSuccess?.(iotData);
      } else {
        throw new Error("Failed to fetch H2 IoT data");
      }
    } catch (error: any) {
      console.error("Fetch error", error);
      set(h2IotDataStateAtom, []); // reset to empty array on error
      options?.onError?.(error);
    }
  }
);