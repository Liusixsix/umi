/*
 * @Description: 
 * @Author: liu yan
 * @Date: 2020-07-01 16:12:28
 * @LastEditTime: 2020-07-04 11:27:38
 */ 
import { GlobalModelState } from './global';
import { LoginModelState } from './login';
import { QueryTableState } from './queryTable';
import { Settings } from './settings'
export { GlobalModelState, LoginModelState, QueryTableState, Settings };

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    global?: boolean;
    menu?: boolean;
    setting?: boolean;
    user?: boolean;
    login: boolean;
    queryTable: boolean;
  };
}

export interface ConnectState {
  global: GlobalModelState;
  login: LoginModelState;
  loading: Loading;
}

export interface Route {
  routes?: Route[];
}

export interface LoginUserInfoState {
  id: string;
  name: string;
  role?: string;
  [key: string]: any;
}
