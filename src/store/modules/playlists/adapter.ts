import { FiltersDTO, SelectFilters } from "./types";

export function normalizeFilters(filters: FiltersDTO): SelectFilters[] {
  const selectFilters = filters.filter((filter) => filter.values !== undefined);

    const normalizedFilters = selectFilters.map((filter) => ({
      ...filter,
      values: filter.values
        ? filter.values.map((value) => ({
            ...value,
            label: value.name,
            name: null,
          }))
        : [],
    }));

    return normalizedFilters;
};
