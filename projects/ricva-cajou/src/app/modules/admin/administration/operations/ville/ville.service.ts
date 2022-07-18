import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  tap,
  throwError,
} from 'rxjs';
import {
  Ville,
} from '../ville/ville.types';
import { TablePagination } from '@kolab/fuse/src/public-api';
import { ApiService } from '@ricva-cajou/src/app/core/utils/api.service';
import { environment } from '@ricva-cajou/src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VilleService {
  ville: Ville;
  private _ville: BehaviorSubject<Ville | null> =
    new BehaviorSubject(null);
  private _villes: BehaviorSubject<Ville[] | null> =
    new BehaviorSubject(null);
  private _paginationVille: BehaviorSubject<TablePagination | null> =
    new BehaviorSubject(null);

  //URL
  private url = 'required/provenance';

  datas: Ville[] = [
      {
          "id": "0518e59c-c70a-4030-bda3-cf38972b4865",
          "libelle": "Abengourou"
      },
      {
          "id": "055d2689-dbb2-4c4c-a779-f9671bb47d14",
          "libelle": "Abidjan"
      },
      {
          "id": "05c9fdf3-b35c-49dc-be0f-b19019e53c67",
          "libelle": "Aboisso"
      },
      {
          "id": "06ed3373-5e05-4f35-a70c-3dae4dffe77e",
          "libelle": "Abongoua"
      },
      {
          "id": "0ce27847-a666-4450-8253-843f0a5b7806",
          "libelle": "Adaou"
      },
      {
          "id": "0df15bca-047a-4d16-888f-b3ac093c2fb6",
          "libelle": "Adiaké"
      },
      {
          "id": "11291f81-e622-47d4-974b-abef675b0643",
          "libelle": "Adjouan"
      },
      {
          "id": "167422a4-3d8e-478b-836a-ca18586ab1b2",
          "libelle": "Adzopé"
      },
      {
          "id": "1b264bb4-e659-4e5c-80ec-98be0296418e",
          "libelle": "Agboville"
      },
      {
          "id": "1c7bff66-a20a-4db3-830f-83dbb41a38d6",
          "libelle": "Agnibilékrou"
      },
      {
          "id": "1d58e270-38aa-4207-9a63-2bb728ea9910",
          "libelle": "Akoupé"
      },
      {
          "id": "1fba7aae-ce7f-41a7-8b5f-a1ab6f5b7273",
          "libelle": "Alépé"
      },
      {
          "id": "203e22f5-8a68-4410-a14a-8838b8654a72",
          "libelle": "Ananda"
      },
      {
          "id": "2293bcc2-2e6f-4848-943e-e431ba5fd524",
          "libelle": "Annépé"
      },
      {
          "id": "23dab2b7-a235-4316-9260-af210f3df0ee",
          "libelle": "Anyama"
      },
      {
          "id": "23dc314e-923d-4ec0-b6f7-4dcf0e6485e1",
          "libelle": "Appimadoum"
      },
      {
          "id": "2532f5c7-ac9d-4426-931a-df4d799c0544",
          "libelle": "Attinguié"
      },
      {
          "id": "25fff884-01de-47e8-93ee-d9bd67806ba0",
          "libelle": "Bacanda"
      },
      {
          "id": "27ea7178-4d79-45ee-b3c2-ae411ee7abd5",
          "libelle": "Badikaha"
      },
      {
          "id": "294ccb66-4c05-4592-8be8-e070eb0fc44e",
          "libelle": "Bako"
      },
      {
          "id": "2d95f19a-592d-48d6-adf1-b27469450264",
          "libelle": "Bangolo"
      },
      {
          "id": "2d97bdeb-4cbe-4a50-8fd8-e84c4d15075f",
          "libelle": "Bécouéfin"
      },
      {
          "id": "34220a5b-47ca-45c4-a75e-d7b1234d1cbf",
          "libelle": "Bédi-Goazon"
      },
      {
          "id": "3562ed30-bb91-42aa-89f0-c2aea62bf6d2",
          "libelle": "Béoumi"
      },
      {
          "id": "36e85e1d-fe0e-4dbc-9d64-9b9de082e355",
          "libelle": "Bettié"
      },
      {
          "id": "373c27c7-0390-4fe0-95f3-9d1296996990",
          "libelle": "Biankouma"
      },
      {
          "id": "377b1805-f58f-404a-8645-2e5352c65890",
          "libelle": "Biéby"
      },
      {
          "id": "389fae2b-92b9-460d-8357-fb6b856d6bfb",
          "libelle": "Bingerville"
      },
      {
          "id": "38b65bb7-bd9a-4aa6-81ab-d93b8beeced7",
          "libelle": "Bin-Houyé"
      },
      {
          "id": "39a3a429-b269-4f8a-8dc6-46b9e0ace4f4",
          "libelle": "Blapleu"
      },
      {
          "id": "3eb11980-8290-421c-b71e-6cdd762cdfc8",
          "libelle": "Bléniméouin"
      },
      {
          "id": "462c8744-394b-4d0f-aef5-5772f70350db",
          "libelle": "Blességué"
      },
      {
          "id": "46b5d88b-c02b-4aa6-9a87-c9192b435ee8",
          "libelle": "Bloléquin"
      },
      {
          "id": "47321025-1b05-49bd-b43c-d70b5976c623",
          "libelle": "Boahia"
      },
      {
          "id": "48817a50-9718-4ee2-bc15-472de5c8f6ca",
          "libelle": "Bocanda"
      },
      {
          "id": "49afc3ab-dd64-4325-a305-6c4c1f90af36",
          "libelle": "Bogouiné"
      },
      {
          "id": "4d15ef11-aa61-4c72-99be-9185a0501af5",
          "libelle": "Bondoukou"
      },
      {
          "id": "4e805dab-9de6-4cbf-b990-ccc2f40f022a",
          "libelle": "Bongouanou"
      },
      {
          "id": "4f029827-a9ff-4149-a392-1950cd68fa5d",
          "libelle": "Bonoua"
      },
      {
          "id": "5103f72d-0c13-46b7-981c-023551b7f280",
          "libelle": "Bouaflé"
      },
      {
          "id": "530ebb36-b9c3-4f94-89ad-a1cb0ae80411",
          "libelle": "Bouaké"
      },
      {
          "id": "5357d1be-c071-4a60-9461-11d0b3679822",
          "libelle": "Bouandougou"
      },
      {
          "id": "5435ce44-e827-4124-97a3-505b5fafcd01",
          "libelle": "Bouna"
      },
      {
          "id": "5534e99f-fe58-4097-a7d2-874d3803b11c",
          "libelle": "Boundiali"
      },
      {
          "id": "55f4d523-730e-4629-970e-b3514f03e8c1",
          "libelle": "Brofodoumé"
      },
      {
          "id": "58718245-9b86-4572-b6c0-a54e8fe19915",
          "libelle": "Dabakala"
      },
      {
          "id": "58b4bac0-e0ec-4ce7-869e-00f9d3c39f8a",
          "libelle": "Dabou"
      },
      {
          "id": "59adea5d-58d0-4c7c-b19b-fc64569f6361",
          "libelle": "Dabouyo"
      },
      {
          "id": "59c10b37-f66b-4827-b842-fc8e9257d097",
          "libelle": "Daloa"
      },
      {
          "id": "5c7d66ce-ed29-47de-9925-a2dab78588c3",
          "libelle": "Danané"
      },
      {
          "id": "5e73d0fc-1f16-4051-aa2f-af5f20060262",
          "libelle": "Daoukro"
      },
      {
          "id": "5e9918d6-1476-4e89-b3cc-c2cf826b289c",
          "libelle": "Diamarakro"
      },
      {
          "id": "5faf17c9-48b9-463c-86ee-0eea2ec6c3c5",
          "libelle": "Dianra"
      },
      {
          "id": "5fc174a5-1b9e-494d-bbc0-281594b05550",
          "libelle": "Diawalla"
      },
      {
          "id": "5fd779d7-dca1-4270-972e-b5cf3c79ab0e",
          "libelle": "Diboké"
      },
      {
          "id": "5fdd27de-2313-4185-a244-306e9aa6d143",
          "libelle": "Didiévi"
      },
      {
          "id": "61b56b50-1767-4dfb-a06f-2f1dc865cadd",
          "libelle": "Dignago"
      },
      {
          "id": "61c778f1-4523-448f-a567-f854de339bd1",
          "libelle": "Dimbokro"
      },
      {
          "id": "62c79905-a0c5-4d84-b9fd-e57e58ccb5c2",
          "libelle": "Divo"
      },
      {
          "id": "632ebdb0-c37f-4088-805e-48fdb4a568b9",
          "libelle": "Doké"
      },
      {
          "id": "641a9469-2f9d-4ae6-80eb-340c370eb2ed",
          "libelle": "Doudoukou"
      },
      {
          "id": "642ecab4-d2ec-4d6f-ada3-27cbc830963d",
          "libelle": "Duékoué"
      },
      {
          "id": "6480afbf-5006-4286-bbd0-0ab50572a03b",
          "libelle": "Fadiadougou"
      },
      {
          "id": "66edaf09-32b9-4ac2-ae5f-08615100faed",
          "libelle": "Famienkro"
      },
      {
          "id": "6b087c67-f188-4d12-96b3-0bc4165e366f",
          "libelle": "Ferkessédougou"
      },
      {
          "id": "6b82fbde-1ebb-4761-b421-8b3c323c6cac",
          "libelle": "Gagnoa"
      },
      {
          "id": "6f0d9c06-3743-4280-9b03-af2f6d74b7c3",
          "libelle": "Gbangbégouiné"
      },
      {
          "id": "6f127a75-8359-4b83-86a8-6114e5cc4aaa",
          "libelle": "Gbangbégouiné-Yati"
      },
      {
          "id": "6fb30b27-0a08-4836-9315-375028dbb271",
          "libelle": "Gohouo-Zagna"
      },
      {
          "id": "710ef894-9931-4bb3-87b7-c081cdae7bf3",
          "libelle": "Gomon"
      },
      {
          "id": "728a3105-4cf0-4473-8c18-8cda36cae752",
          "libelle": "Gouiné"
      },
      {
          "id": "759b26c9-c9fe-4d55-9906-d7c9b48b6800",
          "libelle": "Grand-Bassam"
      },
      {
          "id": "7616b454-671a-4e75-a233-040ddf75a5e7",
          "libelle": "Grand-Lahou"
      },
      {
          "id": "7713fea9-202d-4d96-901d-ee520766fe54",
          "libelle": "Guessabo"
      },
      {
          "id": "78a1811a-438c-4ac0-b690-c7defab3ce88",
          "libelle": "Guéyo"
      },
      {
          "id": "78791fe1-3272-43e2-8ec1-b289c6f928df",
          "libelle": "Guibéroua"
      },
      {
          "id": "7afa9b7a-307f-4258-b72b-08f2179886fc",
          "libelle": "Guinglo-Tahouaké"
      },
      {
          "id": "7bcb6e50-5b13-444f-95c8-943c3731338e",
          "libelle": "Guitry"
      },
      {
          "id": "7e02ce31-80f9-4df9-ae16-64643bf56d14",
          "libelle": "Hiré"
      },
      {
          "id": "7e5bb4d1-4f22-454b-beb5-9b04c914e36c",
          "libelle": "Issia"
      },
      {
          "id": "7e727178-ccb8-4c98-a080-b5278f595423",
          "libelle": "Jacqueville"
      },
      {
          "id": "7ffe98b9-1b7b-4918-8600-d430f0ab47d3",
          "libelle": "Kahin-Zarabaon"
      },
      {
          "id": "83dd1fbc-69b9-4e26-b445-4ae8ab1ed83f",
          "libelle": "Kani"
      },
      {
          "id": "85622d68-4a91-4dcf-a371-3960ac6a4289",
          "libelle": "Kanzra"
      },
      {
          "id": "876e8e23-d296-4ead-817c-8e45721549bf",
          "libelle": "Katiola"
      },
      {
          "id": "879d8030-484d-406f-858b-3a39f67145b0",
          "libelle": "Kong"
      },
      {
          "id": "87ec4310-ee0d-4626-8ecc-0c65ceb9ade6",
          "libelle": "Korhogo"
      },
      {
          "id": "8911e9f6-c9bd-4686-be7a-6ad37849b0d9",
          "libelle": "Koro"
      },
      {
          "id": "8ad9b1dc-4278-4093-b774-f075895c0d24",
          "libelle": "Kouakro"
      },
      {
          "id": "8c0caae9-16db-493a-ad90-ce93e5de0146",
          "libelle": "Kounahiri"
      },
      {
          "id": "8dfeeed7-8205-47ef-addb-d1dda8104f3e",
          "libelle": "Koun-Fao"
      },
      {
          "id": "8f4e9157-5d39-4ed9-90b1-9bc6862dcf97",
          "libelle": "Kouto"
      },
      {
          "id": "8fd29959-c730-4b86-aec4-cc5d0d9f5521",
          "libelle": "Koutouba"
      },
      {
          "id": "90adaee0-ef77-499a-9aba-fa74119859c8",
          "libelle": "Kpata"
      },
      {
          "id": "92864d0a-a05e-4f81-91b2-4eef968da00a",
          "libelle": "Lakota"
      },
      {
          "id": "95222d94-72ce-4b71-9da8-5d8833b78668",
          "libelle": "Lolobo"
      },
      {
          "id": "952416f2-39bd-4bd1-b4ca-e44811c700f9",
          "libelle": "Loviguié"
      },
      {
          "id": "954205bb-e7eb-41cf-95b5-51506d8aa5a1",
          "libelle": "Mamini"
      },
      {
          "id": "983f6b94-303b-4b61-85b8-16a9455782e3",
          "libelle": "Man"
      },
      {
          "id": "9d1ab88c-7122-43c1-bd79-90455f4aea71",
          "libelle": "Mankono"
      },
      {
          "id": "9deed7e9-ff4c-48eb-afb6-a0070dc1e70c",
          "libelle": "Mantongouiné"
      },
      {
          "id": "9e1e0830-9a63-438b-8932-a353dcef5285",
          "libelle": "Marahoué"
      },
      {
          "id": "9f612b0c-d256-4d42-a309-3b8be265c15f",
          "libelle": "M'Bahiakro"
      },
      {
          "id": "a0e90b63-1a98-44ca-b63d-d91c3fc99fe1",
          "libelle": "M'batto"
      },
      {
          "id": "a2b8a34b-0723-47ca-ba70-2eb628019cca",
          "libelle": "Morondo"
      },
      {
          "id": "a3777d25-4f33-4c1a-bb90-9942865ac57c",
          "libelle": "Nafana (Prikro)"
      },
      {
          "id": "a3b482b6-5e2c-4dae-b462-8a779935054d",
          "libelle": "N'douci"
      },
      {
          "id": "a5d9de56-3878-4b62-af07-c113c07b55a9",
          "libelle": "N'Gokro"
      },
      {
          "id": "a6c32013-1619-4bc4-81d9-985d17158dcf",
          "libelle": "Niakaramandougou"
      },
      {
          "id": "a880c7aa-7fab-4c6d-ba96-f57a25100e69",
          "libelle": "Niambézaria"
      },
      {
          "id": "aa8693ba-2b0d-4a2f-a7e1-56fdc12be8ae",
          "libelle": "Niellé"
      },
      {
          "id": "ad5929d8-5493-4b6b-9b36-ce7babbb018b",
          "libelle": "Nofou"
      },
      {
          "id": "b1358029-f204-4b58-a048-85fa13c420b9",
          "libelle": "Odienné"
      },
      {
          "id": "b9a57ffd-96e6-4d20-970a-6fe9cd5cd277",
          "libelle": "Oumé"
      },
      {
          "id": "b9dd02a0-4996-4dd8-87e9-7d06f8b24f6e",
          "libelle": "Ouyably-Gnondrou"
      },
      {
          "id": "ba46adc3-32a5-46c6-834e-2db01b1ec406",
          "libelle": "Pacobo"
      },
      {
          "id": "ba9b12b6-1206-4ec6-82d0-6d47685eb024",
          "libelle": "Péhé"
      },
      {
          "id": "be3d5304-78ad-4e8c-a481-29c85ce7c1b4",
          "libelle": "Sakassou"
      },
      {
          "id": "bee6dc8b-6e52-4b7e-a279-68b256a34298",
          "libelle": "Samatiguila"
      },
      {
          "id": "c0969c16-b625-4d05-9c67-e7b62d7f0cd3",
          "libelle": "Sandougou-Soba"
      },
      {
          "id": "c3bd56d0-0489-47fa-967b-8ed3b16237d2",
          "libelle": "San-Pédro"
      },
      {
          "id": "c47bdac9-b208-4a93-bfa9-13c1703b1b28",
          "libelle": "Sassandra"
      },
      {
          "id": "c4c09ca2-5eb5-4c3d-b0af-9d079cc72fb2",
          "libelle": "Séguéla"
      },
      {
          "id": "c5994511-3d42-4490-b8e9-28fa6e95ec6c",
          "libelle": "Sinfra"
      },
      {
          "id": "ce8bbe6e-3d8e-4b6d-b3a2-66027c1658dd",
          "libelle": "Soubré"
      },
      {
          "id": "d654c867-6e5c-4cb7-ab8f-b936816183cb",
          "libelle": "Tabou"
      },
      {
          "id": "d7713064-5b34-4233-a007-54f7309526c4",
          "libelle": "Tafiré"
      },
      {
          "id": "dcf3e49a-c280-4694-a6cd-5d09a14dc0c9",
          "libelle": "Taï"
      },
      {
          "id": "dd237dd7-9dc9-4f0d-956c-4f85f37519d4",
          "libelle": "Tanda"
      },
      {
          "id": "dedc7dae-1233-4f46-be80-1f354cd051d4",
          "libelle": "Tiagba"
      },
      {
          "id": "df770891-e624-49a9-b9ad-485f53e5c20f",
          "libelle": "Tiapoum"
      },
      {
          "id": "e1c3e1db-ec43-4609-b566-512e5382ae20",
          "libelle": "Tiassalé"
      },
      {
          "id": "e536c489-4db8-4411-9496-287b71b641ce",
          "libelle": "Tiébissou"
      },
      {
          "id": "e5b6fcfa-d1c3-4bea-8193-00e51fe50e3d",
          "libelle": "Tiédio"
      },
      {
          "id": "e80c29f7-ad11-4e11-9843-0fcf86c66d1b",
          "libelle": "Tiéningboué"
      },
      {
          "id": "e84e5694-310d-4df3-9471-1a4cc830f88b",
          "libelle": "Tingréla"
      },
      {
          "id": "e8b74af1-3aad-4379-9e42-5d7195349afb",
          "libelle": "Tinhou"
      },
      {
          "id": "ecba334e-24fc-43b0-8724-db9d7d302f33",
          "libelle": "Tiobli"
      },
      {
          "id": "ed293ad3-d5b1-420f-ac01-937f7d0813d4",
          "libelle": "Togoniéré"
      },
      {
          "id": "ee6c83ae-0628-482a-99f0-5248383365b4",
          "libelle": "Touba"
      },
      {
          "id": "f116ee1c-35b0-4d47-9e9d-c7264ebaee36",
          "libelle": "Tougbo"
      },
      {
          "id": "f12664d9-afa0-4a60-86a1-071128649fa7",
          "libelle": "Toulepleu"
      },
      {
          "id": "f2be25a3-bf52-45d0-982a-01a487fd8f94",
          "libelle": "Toumodi"
      },
      {
          "id": "f5131b85-7546-4705-9a70-1f76599e0761",
          "libelle": "Toumoukoro"
      },
      {
          "id": "f5d10cb8-ef35-414b-99fe-e9bf370aaa30",
          "libelle": "Varalé"
      },
      {
          "id": "f513d876-7631-40e1-906a-908ddd16cd63",
          "libelle": "Vavoua"
      },
      {
          "id": "f7f73d3f-955f-497e-960d-a3ff3e08893e",
          "libelle": "Yakassé-Mé"
      },
      {
          "id": "f8804af1-b4a4-4576-947e-c0dac683b35d",
          "libelle": "Yamoussoukro"
      },
      {
          "id": "f99b2323-3677-46bb-a7fd-05807a1bc62d",
          "libelle": "Yaou"
      },
      {
          "id": "fb320c3a-0266-43b9-8be0-73788351eaa7",
          "libelle": "Yorodougou"
      },
      {
          "id": "fbe24a54-0961-4dc5-90b2-8951fd7e80e3",
          "libelle": "Zonneu"
      },
      {
          "id": "fc75a9ac-11ab-4166-ab55-6204798627d2",
          "libelle": "Zouan-Hounien"
      }
  ];

  /**
   * Constructor
   */
  constructor(private api: ApiService) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  setVille(ville: Ville) {
    this.ville = ville;
  }

  getVille(): Ville {
    return this.ville;
  }

  /**
   * Getter for one ville
   */

  get ville$(): Observable<Ville> {
    return this._ville.asObservable();
  }

  /**
   * Getter for villes
   */
  get villes$(): Observable<Ville[]> {
    // if(environment.production) {
    //   return new Observable<Ville[]>(obs => {
    //     obs.next(this.datas);
    //   });
    // }
    return this._villes.asObservable();
  }

  /**
   * Getter for pagination for ville cashew
   */
  get paginationVille$(): Observable<TablePagination> {
    return this._paginationVille.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  getSingle(id: string): Observable<Ville> {
    return this.api._get(`${this.url}/${id}`).pipe(
      tap((response: any) => {
        this._ville.next(response.response.data);
      }),
      map((response: any) => response.response.data),
      catchError((error: any) => throwError(error))
    );
  }

  /**
   * Get ville
   */
  getVilles(): Observable<Ville[]> {
    // if(environment.production) {
    //   return new Observable<Ville[]>(obs => {
    //     obs.next(this.datas);
    //   });
    // }
    return this.api
      ._get(`${this.url}`)
      .pipe(
        tap((response: any) => {
          this._villes.next(response?.response.data);
        }),
        map((response: any) => response?.response.data)
      );
  }
}
