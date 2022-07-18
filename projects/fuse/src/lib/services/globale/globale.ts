import { Setting, User } from '@kolab/fuse/src/lib/services/indexed-db/indexed-db.types';
import * as CryptoJS from 'crypto-js';

export class Globale {
  public static user: User;
  public static setting: Setting;
  public static token: string;
  public static speculation: any;
  public static speculation_id = '9e59fc8a-db1b-405e-bf9d-b6fa2601d38c';
  public static accessCode: string;
  public static accessTenant: string;

  public static formFieldHelpers =  [
    'mat-form-field',
    'min-w-50',
    'mat-form-field-appearance-fill',
    'fuse-mat-no-subscript',
    'mat-form-field-wrapper',
    'fuse-mat-search',
    'mat-form-field-flex',
    'mat-form-field-prefix',
    'mat-form-field-infix',
    'mat-input-element',
    'fuse-mat-dense',
  ];
}

export function Encrypt(word: any, key = 'TUc0emRqRXpkdw==') {
  const encJson = CryptoJS.AES.encrypt(JSON.stringify(word), key).toString();
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encJson));
}

// Fonction a utiliser dans une librairie et appeler simplement
export function Decrypt(word: any, key = 'TUc0emRqRXpkdw==') {
  const decData = CryptoJS.enc.Base64.parse(word).toString(CryptoJS.enc.Utf8)
  return CryptoJS.AES.decrypt(decData, key).toString(CryptoJS.enc.Utf8);
}

export function errosForm(title: string, genre?: string): string {
  const msg = title + ((genre && genre === 'F') ? ' est requise !' : ' est requis !');
  return msg;
}

export enum ValidatorsEnums {
  email = "[a-z-0-9_.+-,;]+@[a-z-0-9-]+[.a-z]*",
  name = "^[a-zA-Z-0-9\\s-àâçéèêëîïôùûüœÀÂÇÉÈÊËÎÏÔÙÛÜ_-]*$",
  number = "^[0-9\\s]*$",
  decimal = "^[0-9]+([.,][0-9]+)?$",
  unsignedNumber = "^-?[0-9]\\d*(\\.\\d+)?$"
}

