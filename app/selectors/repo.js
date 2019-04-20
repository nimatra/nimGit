import { createSelector } from 'reselect';

export const reposSelector = state => state.repo;

export const getRepoByName = name => createSelector(
  reposSelector,
  repos => repos.filter(repo => repo.name === name)
);

export const getReposNames = createSelector(
  reposSelector,
  repos => repos.map(repo => repo.name)
);
