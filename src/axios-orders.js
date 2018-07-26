import axios from 'axios';

const instance = axios.create({
    baseURL:"https://react-demo-app-b007a.firebaseio.com/"
});

export default instance;

