export interface Speculation {
  id?: string;
  libelle?: string;
  url?: string;
  mode?: number;
  usinage?: boolean;
}

export interface SpeculationPagination {
  length: number;
  take: number;
  offset: number;
  lastPage: number;
  startIndex: number;
  endIndex: number;
}

export interface EnvRequired {
  id: string;
  libelle: string;
}
