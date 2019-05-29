import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import DeviceDetails from './device-details';
import DeviceDetailsDetail from './device-details-detail';
import DeviceDetailsUpdate from './device-details-update';
import DeviceDetailsDeleteDialog from './device-details-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={DeviceDetailsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={DeviceDetailsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={DeviceDetailsDetail} />
      <ErrorBoundaryRoute path={match.url} component={DeviceDetails} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={DeviceDetailsDeleteDialog} />
  </>
);

export default Routes;
