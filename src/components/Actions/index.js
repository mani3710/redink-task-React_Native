
import {
    GET_ALL_POST,
    CREATE_POST
} from './types';
import API from '../api';

export const getData = () => {
    return (dispatch) => {
        return API.getAllBlogPost()
            .then(res => res.json())
            .then(resJson => {
                console.log("response", resJson);
                dispatch(getAllPOST(resJson));
            })
    }
}

export const getAllPOST = (data) => {
    return {
        type: GET_ALL_POST,
        payload: { dataList: data },
    }
}