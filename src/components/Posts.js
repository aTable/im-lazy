import React, { Component, PropTypes, } from 'react';
import { inject, observer, } from 'mobx-react';
import { Link, } from 'react-router';

import Loading from './Loading';

export default inject('store')(observer(class Posts extends Component {
    static propTypes = {
        children: PropTypes.object,
        // store: PropTypes.shape({
        //     posts: PropTypes.array,
        // }),
    }

    componentDidMount() {
        this.props.store.fetchPosts();
    }

    render() {
        // TODO: properly detect empty mobx array
        if (this.props.store.posts.length === 0)
            return <Loading />

        const posts = this.props.store.posts.map(x => (
            <li key={x.id}><Link to={`posts/${x.id}`}>{x.title}</Link></li>
        ));

        return (
            <section className="container">
                <h5>Posts</h5>
                <ul>
                    {posts}
                </ul>

                {this.props.children}
            </section>
        );
    }
}
))
