import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './device-details.reducer';
import { IDeviceDetails } from 'app/shared/model/device-details.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDeviceDetailsDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class DeviceDetailsDetail extends React.Component<IDeviceDetailsDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { deviceDetailsEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            DeviceDetails [<b>{deviceDetailsEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="deviceId">Device Id</span>
            </dt>
            <dd>{deviceDetailsEntity.deviceId}</dd>
            <dt>N G User</dt>
            <dd>{deviceDetailsEntity.nGUser ? deviceDetailsEntity.nGUser.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/device-details" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/device-details/${deviceDetailsEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ deviceDetails }: IRootState) => ({
  deviceDetailsEntity: deviceDetails.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeviceDetailsDetail);
