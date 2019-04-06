import { createSelector } from 'reselect';

export const syncSelector = state => state.pullRequest.sync;
export const errorSelector = state => state.pullRequest.error;
export const pullRequestListSelector = state => state.pullRequest.pullRequestList;

export const CreatedPullRequestList = createSelector(
  pullRequestListSelector,
  pullRequests => pullRequests
);
export const AssignedPullRequestList = createSelector(
  pullRequestListSelector,
  pullRequests => pullRequests
);
export const MentionedPullRequestList = createSelector(
  pullRequestListSelector,
  pullRequests => pullRequests
);
export const ReviewRequestsPullRequestList = createSelector(
  pullRequestListSelector,
  pullRequests => pullRequests
);
