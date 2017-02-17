import React, { Component, PropTypes, } from 'react';
import { inject, observer, } from 'mobx-react';

export default inject('store')(observer(class Posts extends Component {
    render() {
        const postId = parseInt(this.props.params.id, 10)
        const post = this.props.store.posts.find(x => x.id === postId);
        return (
            <section className="container" >
                <p>id: {this.post.id}</p>
                <p>title: {this.post.title}</p>
                <p>body: {this.post.body}</p>
            </section >
        );
    }
}
))