
export const syncSelector = state => state.issue.sync;
export const errorSelector = state => state.issue.error;

export const assignedIssueListSelector = state => state.issue.assignedIssueList;
export const createdIssueListSelector = state => state.issue.createdIssueList;
export const mentionedIssueListSelector = state => state.issue.mentionedIssueList;
export const subscribedIssueListSelector = state => state.issue.subscribedIssueList;
export const allIssueListSelector = state => state.issue.allIssueList;
