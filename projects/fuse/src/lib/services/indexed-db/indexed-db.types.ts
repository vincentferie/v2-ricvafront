export interface Setting {
  id?: any;
  scheme: string;
  layout: string;
  lang: string;
  status: string;
}

export interface User {
  id?: any;
  uuid?: any;
  nom?: string;
  prenoms?: string;
  rules?: any[];
  accessToken?: string;
  refreshToken?: string;
  email?: string;
  avatar?: string;
  status?: string;
  groupement?: string;
  accesTenant?: string;
  accesCode?: string;
  appAccess?: any;
  clientInfo?: any;
}
