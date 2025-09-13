import { create } from "zustand";

export type DateRangeKey = "7d" | "30d" | "90d";

export interface FiltersState {
  store: string;
  family: string;
  item: string;
  dateRange: DateRangeKey;
  setStore: (v: string) => void;
  setFamily: (v: string) => void;
  setItem: (v: string) => void;
  setDateRange: (v: DateRangeKey) => void;
}

export const useFilters = create<FiltersState>((set) => ({
  store: "All Stores",
  family: "All Families",
  item: "All Items",
  dateRange: "30d",
  setStore: (v) => set({ store: v }),
  setFamily: (v) => set({ family: v }),
  setItem: (v) => set({ item: v }),
  setDateRange: (v) => set({ dateRange: v }),
}));
