import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Dashboard from 'views/Dashboard';
import Editor from 'views/Editor';
import Building from 'views/Building';
import Personel from 'views/Personel';
import Project from 'views/Project';
import NotFound from 'views/NotFound';

const publicPath = '/';

export const routes = [
  {
    path: publicPath,
    component: Dashboard,
  },
  {
    path: `${ publicPath }editor`,
    component: Editor,
  },
  {
    path: `${ publicPath }project/:projectId`,
    component: Project,
  },
  {
    path: `${ publicPath }building/:buildingId`,
    component: Building,
  },
  {
    path: `${ publicPath }personel`,
    component: Personel,
  },
];


export default () => (
  <Switch>
    {routes.map(route => {
      const exact = route.path === publicPath;
      return <Route exact={ exact } path={ route.path } component={ route.component } key={ route.path } />;
    })}
    <Route path='*' component={ NotFound } />
  </Switch>
);


// export default () => (
//   <Switch>
//     <Route exact path={ routeCodes.DASHBOARD } component={ Dashboard } />
//     <Route path={ routeCodes.EDITOR } component={ Editor } />
//     <Route path='*' component={ NotFound } />
//   </Switch>
// );
