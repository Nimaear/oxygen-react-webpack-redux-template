import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Dashboard from 'views/Dashboard';
import Editor from 'views/Editor';
import Buildings from 'views/Buildings';
import Personel from 'views/Personel';
import NotFound from 'views/NotFound';

const publicPath = '/';

export const routeCodes = {
  DASHBOARD: publicPath,
  ABOUT: `${ publicPath }about`,
  EDITOR: `${ publicPath }editor`,
  BUILDINGS: `${ publicPath }buildings`,
  PERSONEL: `${ publicPath }personel`,
};

export const routes = [
  {
    path: publicPath,
    component: Dashboard,
  },
  {
    path: routeCodes.EDITOR,
    component: Editor,
  },
  {
    path: routeCodes.BUILDINGS,
    component: Buildings,
  },
  {
    path: routeCodes.PERSONEL,
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
//     <Route path='*' component={ NotFound } />
//   </Switch>
// );
