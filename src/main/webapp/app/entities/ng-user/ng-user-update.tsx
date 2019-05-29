import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ILocation } from 'app/shared/model/location.model';
import { getEntities as getLocations } from 'app/entities/location/location.reducer';
import { getEntity, updateEntity, createEntity, reset } from './ng-user.reducer';
import { INGUser } from 'app/shared/model/ng-user.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface INGUserUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface INGUserUpdateState {
  isNew: boolean;
  locationId: string;
}

export class NGUserUpdate extends React.Component<INGUserUpdateProps, INGUserUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      locationId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getLocations();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { nGUserEntity } = this.props;
      const entity = {
        ...nGUserEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/ng-user');
  };

  render() {
    const { nGUserEntity, locations, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="feApp.nGUser.home.createOrEditLabel">Create or edit a NGUser</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : nGUserEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="ng-user-id">ID</Label>
                    <AvInput id="ng-user-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="phoneNumberLabel" for="ng-user-phoneNumber">
                    Phone Number
                  </Label>
                  <AvField
                    id="ng-user-phoneNumber"
                    type="text"
                    name="phoneNumber"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="firstNameLabel" for="ng-user-firstName">
                    First Name
                  </Label>
                  <AvField id="ng-user-firstName" type="text" name="firstName" />
                </AvGroup>
                <AvGroup>
                  <Label id="lastNameLabel" for="ng-user-lastName">
                    Last Name
                  </Label>
                  <AvField id="ng-user-lastName" type="text" name="lastName" />
                </AvGroup>
                <AvGroup>
                  <Label id="vegetationTypeLabel" for="ng-user-vegetationType">
                    Vegetation Type
                  </Label>
                  <AvInput
                    id="ng-user-vegetationType"
                    type="select"
                    className="form-control"
                    name="vegetationType"
                    value={(!isNew && nGUserEntity.vegetationType) || 'ORGANIC'}
                  >
                    <option value="ORGANIC">ORGANIC</option>
                    <option value="NONORGANIC">NONORGANIC</option>
                    <option value="BOTH">BOTH</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="gardenDescriptionLabel" for="ng-user-gardenDescription">
                    Garden Description
                  </Label>
                  <AvField id="ng-user-gardenDescription" type="text" name="gardenDescription" />
                </AvGroup>
                <AvGroup>
                  <Label id="emailLabel" for="ng-user-email">
                    Email
                  </Label>
                  <AvField id="ng-user-email" type="text" name="email" />
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel" for="ng-user-status">
                    Status
                  </Label>
                  <AvInput
                    id="ng-user-status"
                    type="select"
                    className="form-control"
                    name="status"
                    value={(!isNew && nGUserEntity.status) || 'INVITED'}
                  >
                    <option value="INVITED">INVITED</option>
                    <option value="CONFIRMED">CONFIRMED</option>
                    <option value="DENIED">DENIED</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="ng-user-location">Location</Label>
                  <AvInput id="ng-user-location" type="select" className="form-control" name="location.id">
                    <option value="" key="0" />
                    {locations
                      ? locations.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/ng-user" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">Back</span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp; Save
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  locations: storeState.location.entities,
  nGUserEntity: storeState.nGUser.entity,
  loading: storeState.nGUser.loading,
  updating: storeState.nGUser.updating,
  updateSuccess: storeState.nGUser.updateSuccess
});

const mapDispatchToProps = {
  getLocations,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NGUserUpdate);
