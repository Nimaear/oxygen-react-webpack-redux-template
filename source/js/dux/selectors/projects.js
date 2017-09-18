import { createSelector } from 'reselect';

const makeGetProjects = () => {
  return createSelector(
    (state) => state.entities.project,
    (projects) => {
      const ids = Object.keys(projects);
      return ids.map(id => projects[id]);
    }
  );
};

export const getProjects = makeGetProjects();
