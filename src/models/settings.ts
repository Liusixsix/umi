import { Effect, Reducer } from 'umi';
import AdminConfig, { Config } from '../config'

export type MenuTheme = 'dark' | 'light';
export interface Settings {
    fixedHeader: boolean;
    theme: MenuTheme;
  
}

const defaults: Settings = {
    fixedHeader: AdminConfig.fixedHeader,
    theme: AdminConfig.theme,
}

export interface settingModel {
    namespace: 'setting';
    state: Settings;
    reducers: {
        updateLayoutSettings: Reducer;
    }
    effects: {};
}

const SettingsModel: settingModel = {
    namespace: 'setting',
    state: defaults,
    reducers: {
        updateLayoutSettings(state = defaults, { payload }) {
            return {
                ...state,
                ...payload,
            }
        }
    },
    effects: {

    },

};

export default SettingsModel