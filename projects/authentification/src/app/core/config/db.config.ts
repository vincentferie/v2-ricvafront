import { DBConfig } from 'ngx-indexed-db';

export interface Setting {
  id?: any;
  scheme?: string;
  layout?: string;
  lang?: string;
}

export interface User {
  id?: any;
  nom?: string;
  prenoms?: string;
  role?: any;
  accessToken?: string;
  refreshToken?: string;
  email?: string;
  avatar?: string;
  status?: string;
}

export const dbConfig: DBConfig = {
  name: 'ricva',
  version: 3,
  objectStoresMeta: [
    {
      store: 'user',
      storeConfig: { keyPath: 'id', autoIncrement: false },
      storeSchema: [
        { name: 'id', keypath: 'id', options: { unique: true } },
        { name: 'nom', keypath: 'nom', options: { unique: false } },
        { name: 'prenoms', keypath: 'prenoms', options: { unique: false } },
        { name: 'role', keypath: ['role'], options: { unique: false } },
        { name: 'accessToken', keypath: 'accessToken', options: { unique: true } },
        { name: 'refreshToken', keypath: 'refreshToken', options: { unique: true }, },
        { name: 'email', keypath: 'email', options: { unique: true } },
        { name: 'avatar', keypath: 'avatar', options: { unique: false } },
        { name: 'status', keypath: 'status', options: { unique: false } },
      ],
    },
    {
      store: 'setting',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'scheme', keypath: 'scheme', options: { unique: true } },
        { name: 'layout', keypath: 'layout', options: { unique: true } },
        { name: 'lang', keypath: 'lang', options: { unique: true } },
        { name: 'status', keypath: 'status', options: { unique: true } },
      ],
    },
    {
      store: 'forms',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'name', keypath: 'name', options: { unique: true } },//Nom du formulaire
        { name: 'child', keypath: 'child', options: { unique: false } },//tableau d'object du formulaire
      ],
    }
  ],
};
