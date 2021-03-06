import React, { Component } from 'react';

import Post from '../../posts/containers/Post';
import Loading from '../../shared/components/Loading';

import api from '../../api';

import styles from './Page.css';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      posts: [],
      loading: true,
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  async componentDidMount() {
    this.initialFecth();
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  async initialFecth() {
    const posts = await api.users.getTimeline(this.state.page);

    this.setState({
      posts,
      page: this.state.page + 1,
      loading: false,
    });
  }

  handleScroll() {
    if (this.state.loading) return null;

    const scrolled = window.scrollY;
    const viewportHeight = window.innerHeight;
    const fullHeight = document.body.clientHeight;

    if (!(scrolled + viewportHeight + 300 >= fullHeight)) {
      return null;
    }

    return this.setState({ loading: true }, async () => {
      try {
        const posts = await api.users.getTimeline(this.state.page);
        console.log('posts', posts);
        this.setState({
          posts: this.state.posts.concat(posts.tweets),
          page: this.state.page + 1,
          loading: false,
        });
      } catch (error) {
        console.error(error);
        this.setState({ loading: false });
      }
    });
  }
  render() {
    return (
      <section name="Home" className={styles.section}>
        <section className={styles.list}>
          {this.state.loading && (
            <Loading />
          )}
          {this.state.posts
            .map(tweet => <Post key={tweet.id} {...tweet} />)}
        </section>
      </section>
    );
  }
}

export default Home;
