import React, { Component, PropTypes, } from 'react';
import { Link, } from 'react-router';

export default class MyApp extends Component {
    static propTypes = {
        children: PropTypes.object,
    }

    render() {
        return (
            <div id="application">
                <nav>
                    <div className="nav-wrapper">
                        <a href="#" className="brand-logo">im-lazy</a>
                        <ul id="nav-mobile" className="right hide-on-small-and-down">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="posts">Posts</Link></li>
                        </ul>
                    </div>
                </nav>
                {this.props.children}
            </div>
        );
    }
}