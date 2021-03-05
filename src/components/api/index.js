const domain = "http://192.168.43.175:3000";

const API = {
    getAllBlogPost() {
        let URL = domain + "/getAll";
        return fetch(URL, {
            method: 'GET',
        });
    },
    createPost(author, title, description) {

        const body = JSON.stringify({
            title: title,
            description: description,
            author: author


        });
        var Url = `${domain}`;
        return fetch(Url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body
        });
    },
    deletePost(id) {
        var Url = `${domain}/${id}`;
        return fetch(Url, {
            method: 'DELETE',
        });
    },
    updatePost(id, author, title, description) {

        const body = JSON.stringify({
            title: title,
            description: description,
            author: author

        });
        var Url = `${domain}/${id}`;
        return fetch(Url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body
        });
    }
};

export default API;
