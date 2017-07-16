import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import api from '../../api';

import styles from './Post.css';
import MdFavoriteOutline from 'react-icons/lib/md/favorite-outline';
import MdLoop from 'react-icons/lib/md/loop';

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      user: props.user || null,
      comments: props.comments || null,
    };
  }

  componentDidMount() {
    this.initialFetch();
  }

  async initialFetch() {
    if (!!this.state.user && !!this.state.comments) return this.setState({ loading: false });
    const [
      user,
      comments,
    ] = await Promise.all([
      !this.state.user ? api.users.getSingle(this.props.userId) : Promise.resolve(null),
      !this.state.comments ? api.posts.getComments(this.props.userId) : Promise.resolve(null),
    ]);

    return this.setState({
      loading: false,
      user: user || this.state.user,
      comments: comments || this.state.comments,
    });
  }
  render() {
    return (
      <article id={`post-${this.props.id}`} className={styles.post}>
        <p className={styles.title}>
            {this.props.user_id}
        </p>
        <p className={styles.tweet}>
            {this.props.tweet}
        </p>
        <a className={styles.rtCaract}><MdLoop /> {this.props.rt}</a>
        <a className={styles.favCaract}><MdFavoriteOutline /> {this.props.fav}</a>
        <p className={styles.body}>
          {this.props.body}
        </p>
        {this.props.loading && (
          <div className={styles.meta}>
            <Link to={`/user/${this.state.user.id}`} className={styles.user}>
              {this.state.user.name}
            </Link>
            <span className={styles.comments}>
              hay {this.state.comments.length} comentarios
            </span>
          </div>
        )}
      </article>
    );
  }
}

Post.propTypes = {
  id: PropTypes.number,
  userId: PropTypes.number,
  title: PropTypes.string,
  body: PropTypes.string,
  loading: PropTypes.bool,
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
  comments: PropTypes.arrayOf(
    PropTypes.objects),
};

export default Post;
