import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './images.reducer';
import { IImages } from 'app/shared/model/images.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IImagesDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ImagesDetail extends React.Component<IImagesDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { imagesEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Images [<b>{imagesEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="imageURL">Image URL</span>
            </dt>
            <dd>{imagesEntity.imageURL}</dd>
            <dt>
              <span id="imageType">Image Type</span>
            </dt>
            <dd>{imagesEntity.imageType}</dd>
            <dt>N G User</dt>
            <dd>{imagesEntity.nGUser ? imagesEntity.nGUser.id : ''}</dd>
            <dt>Post</dt>
            <dd>{imagesEntity.post ? imagesEntity.post.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/images" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/images/${imagesEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ images }: IRootState) => ({
  imagesEntity: images.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImagesDetail);
