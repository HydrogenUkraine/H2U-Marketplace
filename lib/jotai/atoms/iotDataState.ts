import { atom } from "jotai";

export interface IotDataState {
  eacId: number | null;
  organizationId: number | null;
  organizationName: string | null;
  availableHydrogenKg: number | null;
  productionDate: Date | null;
  pricePerKg: number | null;
}

export const h2IotDataStateAtom = atom<IotDataState[]>([]);