import axios from 'axios';
import { Promise, } from 'bluebird';

import config from './config';

Promise.config({
    cancellation: true,
})


export function gimmePosts() {
    return new Promise((resolve) => {

        return axios.get(`${config.serverUrl}/posts`)
            .then(res => {
                const payload = res.data;
                resolve(payload);
            });

    });
}