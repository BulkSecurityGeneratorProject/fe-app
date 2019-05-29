import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import NGUser from './ng-user';
import Location from './location';
import Images from './images';
import DeviceDetails from './device-details';
import Post from './post';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/ng-user`} component={NGUser} />
      <ErrorBoundaryRoute path={`${match.url}/location`} component={Location} />
      <ErrorBoundaryRoute path={`${match.url}/images`} component={Images} />
      <ErrorBoundaryRoute path={`${match.url}/device-details`} component={DeviceDetails} />
      <ErrorBoundaryRoute path={`${match.url}/post`} component={Post} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
