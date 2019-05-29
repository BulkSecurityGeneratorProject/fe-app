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
import { getEntity, updateEntity, createEntity, reset } from './post.reducer';
import { IPost } from 'app/shared/model/post.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPostUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IPostUpdateState {
  isNew: boolean;
  nGUserId: string;
}

export class PostUpdate extends React.Component<IPostUpdateProps, IPostUpdateState> {
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
    values.startTime = convertDateTimeToServer(values.startTime);
    values.endTime = convertDateTimeToServer(values.endTime);

    if (errors.length === 0) {
      const { postEntity } = this.props;
      const entity = {
        ...postEntity,
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
    this.props.history.push('/entity/post');
  };

  render() {
    const { postEntity, nGUsers, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="feApp.post.home.createOrEditLabel">Create or edit a Post</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : postEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="post-id">ID</Label>
                    <AvInput id="post-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="titleLabel" for="post-title">
                    Title
                  </Label>
                  <AvField id="post-title" type="text" name="title" />
                </AvGroup>
                <AvGroup>
                  <Label id="priceLabel" for="post-price">
                    Price
                  </Label>
                  <AvField id="post-price" type="string" className="form-control" name="price" />
                </AvGroup>
                <AvGroup>
                  <Label id="msrpLabel" for="post-msrp">
                    Msrp
                  </Label>
                  <AvField id="post-msrp" type="string" className="form-control" name="msrp" />
                </AvGroup>
                <AvGroup>
                  <Label id="weightLabel" for="post-weight">
                    Weight
                  </Label>
                  <AvField id="post-weight" type="string" className="form-control" name="weight" />
                </AvGroup>
                <AvGroup>
                  <Label id="availableQtyLabel" for="post-availableQty">
                    Available Qty
                  </Label>
                  <AvField id="post-availableQty" type="string" className="form-control" name="availableQty" />
                </AvGroup>
                <AvGroup>
                  <Label id="remainingQtyLabel" for="post-remainingQty">
                    Remaining Qty
                  </Label>
                  <AvField id="post-remainingQty" type="string" className="form-control" name="remainingQty" />
                </AvGroup>
                <AvGroup>
                  <Label id="descriptionLabel" for="post-description">
                    Description
                  </Label>
                  <AvField id="post-description" type="text" name="description" />
                </AvGroup>
                <AvGroup>
                  <Label id="moreInfoLabel" for="post-moreInfo">
                    More Info
                  </Label>
                  <AvField id="post-moreInfo" type="text" name="moreInfo" />
                </AvGroup>
                <AvGroup>
                  <Label id="startTimeLabel" for="post-startTime">
                    Start Time
                  </Label>
                  <AvInput
                    id="post-startTime"
                    type="datetime-local"
                    className="form-control"
                    name="startTime"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.postEntity.startTime)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="endTimeLabel" for="post-endTime">
                    End Time
                  </Label>
                  <AvInput
                    id="post-endTime"
                    type="datetime-local"
                    className="form-control"
                    name="endTime"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.postEntity.endTime)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="post-nGUser">N G User</Label>
                  <AvInput id="post-nGUser" type="select" className="form-control" name="nGUser.id">
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
                <Button tag={Link} id="cancel-save" to="/entity/post" replace color="info">
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
  postEntity: storeState.post.entity,
  loading: storeState.post.loading,
  updating: storeState.post.updating,
  updateSuccess: storeState.post.updateSuccess
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
)(PostUpdate);
