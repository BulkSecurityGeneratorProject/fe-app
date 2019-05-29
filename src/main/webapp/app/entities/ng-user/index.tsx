import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import NGUser from './ng-user';
import NGUserDetail from './ng-user-detail';
import NGUserUpdate from './ng-user-update';
import NGUserDeleteDialog from './ng-user-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={NGUserUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={NGUserUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={NGUserDetail} />
      <ErrorBoundaryRoute path={match.url} component={NGUser} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={NGUserDeleteDialog} />
  </>
);

export default Routes;
