import { GET_ALL_POST } from "../Actions/types";

const initialState = {
};

const BlogPostReducer = (state = initialState, action) => {
    console.log("action", action);
    switch (action.type) {
        case GET_ALL_POST:
            return { blogPostList: action.payload.dataList };
        default:
            return state;
    }
}
export default BlogPostReducer;