import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { INGUser } from 'app/shared/model/ng-user.model';
import { getEntities as getNGUsers } from 'app/entities/ng-user/ng-user.reducer';
import { getEntity, updateEntity, createEntity, reset } from './device-details.reducer';
import { IDeviceDetails } from 'app/shared/model/device-details.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDeviceDetailsUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IDeviceDetailsUpdateState {
  isNew: boolean;
  nGUserId: string;
}

export class DeviceDetailsUpdate extends React.Component<IDeviceDetailsUpdateProps, IDeviceDetailsUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      nGUserId: '0',
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

    this.props.getNGUsers();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { deviceDetailsEntity } = this.props;
      const entity = {
        ...deviceDetailsEntity,
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
    this.props.history.push('/entity/device-details');
  };

  render() {
    const { deviceDetailsEntity, nGUsers, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="feApp.deviceDetails.home.createOrEditLabel">Create or edit a DeviceDetails</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : deviceDetailsEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="device-details-id">ID</Label>
                    <AvInput id="device-details-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="deviceIdLabel" for="device-details-deviceId">
                    Device Id
                  </Label>
                  <AvField
                    id="device-details-deviceId"
                    type="text"
                    name="deviceId"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="device-details-nGUser">N G User</Label>
                  <AvInput id="device-details-nGUser" type="select" className="form-control" name="nGUser.id">
                    <option value="" key="0" />
                    {nGUsers
                      ? nGUsers.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/device-details" replace color="info">
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
  nGUsers: storeState.nGUser.entities,
  deviceDetailsEntity: storeState.deviceDetails.entity,
  loading: storeState.deviceDetails.loading,
  updating: storeState.deviceDetails.updating,
  updateSuccess: storeState.deviceDetails.updateSuccess
});

const mapDispatchToProps = {
  getNGUsers,
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
)(DeviceDetailsUpdate);
