import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';
import { FuseIndexedDbService } from './indexed-db.service';
import { NgModule } from '@angular/core';

const dbConfig: DBConfig = {
  name: 'ricva',
  version: 3,
  objectStoresMeta: [
    {
      store: 'user',
      storeConfig: { keyPath: 'uuid', autoIncrement: true },
      storeSchema: [
        { name: 'id', keypath: 'id', options: { unique: true } },
        { name: 'uuid', keypath: 'uuid', options: { unique: true } },
        { name: 'nom', keypath: 'nom', options: { unique: false } },
        { name: 'prenoms', keypath: 'prenoms', options: { unique: false } },
        { name: 'rules', keypath: 'rules', options: { unique: false } },
        { name: 'role', keypath: 'role', options: { unique: false } },
        { name: 'appAccess', keypath: 'appAccess', options: { unique: false } },
        { name: 'accessToken', keypath: 'accessToken', options: { unique: false } },
        { name: 'refreshToken', keypath: 'refreshToken', options: { unique: false }, },
        { name: 'accesTenant', keypath: 'accesTenant', options: { unique: false }, },
        { name: 'accesCode', keypath: 'accesCode', options: { unique: false }, },
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
        { name: 'status', keypath: 'status', options: { unique: false } },
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
@NgModule({
  imports: [NgxIndexedDBModule.forRoot(dbConfig)],
  providers: [FuseIndexedDbService],
})
export class FuseIndexedDbModule {
  /**
   * Constructor
   */
  constructor(private _fuseIndexedDbService: FuseIndexedDbService) {}
}
