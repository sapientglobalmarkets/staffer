import * as _ from 'lodash';
import { createSelector } from 'reselect';

export const getNeedMap = (state) => state.needMap;
export const getPersonMap = (state) => state.personMap;
export const getProjectMap = (state) => state.projectMap;
export const getSkillMap = (state) => state.skillMap;
export const getStatusMap = (state) => state.statusMap;

export const getFilter = (state) => state.filter;
export const getFilteredNeedIds = (state) => state.filteredNeedIds;
export const getMatchedPeopleIds = (state) => state.matchedPeopleIds;
export const getSelectedNeedId = (state) => state.selectedNeedId;

export const getProjects = createSelector(
    [getProjectMap],
    projectMap => _.sortBy(_.values(projectMap), 'name')
);

export const getSkills = createSelector(
    [getSkillMap],
    skillMap => _.values(skillMap)
);

export const getStatuses = createSelector(
    [getStatusMap],
    statusMap => _.values(statusMap)
);

export const getNeedsSummary = createSelector(
    [getFilteredNeedIds, getNeedMap],
    (filteredNeedIds, needMap) => {

        let summary = {
            open: 0,
            closed: 0,
            total: 0
        };

        if (!filteredNeedIds) return summary;

        _.each(filteredNeedIds, (needId) => {
            let need = needMap[needId];
            need.personId ? summary.closed++ : summary.open++;
        });
        summary.total = filteredNeedIds.length;
        return summary;
    }
);
