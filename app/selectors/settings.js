import { createSelector } from 'reselect';

export const settingsSelector = state => state.settings;
export const reposSelector = state => state.settings.repos;
export const activeRepoSelector = state => state.settings.activeRepo;
export const userSelector = state => state.settings.user;
export const usernameSelector = state => state.settings.username;
export const tokenSelector = state => state.settings.token;

const getSettings = createSelector(
    settingsSelector,
    settings => settings);

export default getSettings;
