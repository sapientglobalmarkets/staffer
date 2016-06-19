import values from 'lodash/values';
import sortBy from 'lodash/sortBy';
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
    projectMap => sortBy(values(projectMap), 'name')
);

export const getSkills = createSelector(
    [getSkillMap],
    skillMap => values(skillMap)
);

export const getStatuses = createSelector(
    [getStatusMap],
    statusMap => values(statusMap)
);
