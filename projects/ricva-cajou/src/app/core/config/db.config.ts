import { DBConfig } from 'ngx-indexed-db';

export interface Setting {
  id?: any;
  scheme?: string;
  layout?: string;
  lang?: string;
}

export const dbConfig: DBConfig = {
  name: 'ricva',
  version: 3,
  objectStoresMeta: [
    {
      store: 'user',
      storeConfig: { keyPath: 'id', autoIncrement: false },
      storeSchema: [
        { name: 'id', keypath: 'id', options: { unique: false } },
        { name: 'nom', keypath: 'nom', options: { unique: false } },
        { name: 'prenoms', keypath: 'prenoms', options: { unique: false } },
        { name: 'role', keypath: ['role'], options: { unique: false } },
        { name: 'token', keypath: 'token', options: { unique: false } },
        {
          name: 'refreshToken',
          keypath: 'refreshToken',
          options: { unique: false },
        },
        { name: 'email', keypath: 'email', options: { unique: false } },
        { name: 'avatar', keypath: 'avatar', options: { unique: false } },
        { name: 'status', keypath: 'status', options: { unique: false } },
      ],
    },
    {
      store: 'setting',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'scheme', keypath: 'scheme', options: { unique: false } },
        { name: 'layout', keypath: 'layout', options: { unique: false } },
        { name: 'lang', keypath: 'lang', options: { unique: false } },
      ],
    },
  ],
};
