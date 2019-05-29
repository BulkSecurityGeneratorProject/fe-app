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
import { IPost } from 'app/shared/model/post.model';
import { getEntities as getPosts } from 'app/entities/post/post.reducer';
import { getEntity, updateEntity, createEntity, reset } from './images.reducer';
import { IImages } from 'app/shared/model/images.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IImagesUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IImagesUpdateState {
  isNew: boolean;
  nGUserId: string;
  postId: string;
}

export class ImagesUpdate extends React.Component<IImagesUpdateProps, IImagesUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      nGUserId: '0',
      postId: '0',
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
    this.props.getPosts();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { imagesEntity } = this.props;
      const entity = {
        ...imagesEntity,
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
    this.props.history.push('/entity/images');
  };

  render() {
    const { imagesEntity, nGUsers, posts, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="feApp.images.home.createOrEditLabel">Create or edit a Images</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : imagesEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="images-id">ID</Label>
                    <AvInput id="images-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="imageURLLabel" for="images-imageURL">
                    Image URL
                  </Label>
                  <AvField
                    id="images-imageURL"
                    type="text"
                    name="imageURL"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="imageTypeLabel" for="images-imageType">
                    Image Type
                  </Label>
                  <AvInput
                    id="images-imageType"
                    type="select"
                    className="form-control"
                    name="imageType"
                    value={(!isNew && imagesEntity.imageType) || 'POST'}
                  >
                    <option value="POST">POST</option>
                    <option value="PRODUCT">PRODUCT</option>
                    <option value="GARDEN">GARDEN</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="images-nGUser">N G User</Label>
                  <AvInput id="images-nGUser" type="select" className="form-control" name="nGUser.id">
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
                <AvGroup>
                  <Label for="images-post">Post</Label>
                  <AvInput id="images-post" type="select" className="form-control" name="post.id">
                    <option value="" key="0" />
                    {posts
                      ? posts.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/images" replace color="info">
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
  posts: storeState.post.entities,
  imagesEntity: storeState.images.entity,
  loading: storeState.images.loading,
  updating: storeState.images.updating,
  updateSuccess: storeState.images.updateSuccess
});

const mapDispatchToProps = {
  getNGUsers,
  getPosts,
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
)(ImagesUpdate);
