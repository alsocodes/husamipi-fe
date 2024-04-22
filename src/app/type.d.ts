export const AUTH_KEY = 'AUTH_KEY';
export const APP_CONFIG_KEY = 'APP_CONFIG_KEY';
export const APP_LIST_CABANG = 'APP_LIST_CABANG';
export const APP_CABANG_SELECTED = 'APP_CABANG_SELECTED';

export interface FormResult {
  statusCode: number;
  message: string;
  publicId: string;
}

export interface IGetParam {
  page?: number;
  size?: number;
  search?: string;
  orderBy?: string;
  order?: string;
}

export type PageParam = {
  action?: string;
  objectId?: number;
};
