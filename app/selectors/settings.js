import { createSelector } from 'reselect';

export const settingsSelector = state => state.settings;
export const reposSelector = state => state.settings.repos;
export const ownersSelector = state => state.settings.owners;
const activeRepoSelector = state => state.settings.activeRepo;
export const userSelector = state => state.settings.user;
export const usernameSelector = state => state.settings.username;
export const tokenSelector = state => state.settings.token;

const getSettings = createSelector(
  settingsSelector,
  settings => settings
);

export const getActiveRepo = createSelector(
  activeRepoSelector,
  reposSelector,
  (activeRepo, repos) => repos.filter(r => r.id === activeRepo)[0]
);

export default getSettings;
