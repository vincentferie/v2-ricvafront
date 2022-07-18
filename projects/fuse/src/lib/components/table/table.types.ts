export interface EnvRequired {
  id: string;
  libelle: string;
}

export interface TablePagination {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  lastPage: number;
  startIndex: number;
  endIndex: number;
}
