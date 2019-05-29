import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './ng-user.reducer';
import { INGUser } from 'app/shared/model/ng-user.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface INGUserDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class NGUserDetail extends React.Component<INGUserDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { nGUserEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            NGUser [<b>{nGUserEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="phoneNumber">Phone Number</span>
            </dt>
            <dd>{nGUserEntity.phoneNumber}</dd>
            <dt>
              <span id="firstName">First Name</span>
            </dt>
            <dd>{nGUserEntity.firstName}</dd>
            <dt>
              <span id="lastName">Last Name</span>
            </dt>
            <dd>{nGUserEntity.lastName}</dd>
            <dt>
              <span id="vegetationType">Vegetation Type</span>
            </dt>
            <dd>{nGUserEntity.vegetationType}</dd>
            <dt>
              <span id="gardenDescription">Garden Description</span>
            </dt>
            <dd>{nGUserEntity.gardenDescription}</dd>
            <dt>
              <span id="email">Email</span>
            </dt>
            <dd>{nGUserEntity.email}</dd>
            <dt>
              <span id="status">Status</span>
            </dt>
            <dd>{nGUserEntity.status}</dd>
            <dt>Location</dt>
            <dd>{nGUserEntity.location ? nGUserEntity.location.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/ng-user" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/ng-user/${nGUserEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ nGUser }: IRootState) => ({
  nGUserEntity: nGUser.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NGUserDetail);
