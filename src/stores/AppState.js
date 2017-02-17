import { observable, action, extendObservable, } from 'mobx'
import { gimmePosts, } from '../api';

export default class AppState {
    constructor() {
        extendObservable(this, {
            posts: [],

            fetchPosts: action(() => {
                return gimmePosts().then(posts => {
                    this.posts = posts;
                })
            }),

        });

        // end ctor
    }
}