import axios from 'axios';

const API_URL = 'https://mysnapchat.epidoc.eu';

let config = {
    headers: {
        'Content-Type': 'application/json',
    },
};

export const login = (email, password) => {
    return axios.put(`${API_URL}/user`, { email, password }, config);
};

export const signUp = (email, username, password, profilePicture = null) => {
    return axios.post(
        `${API_URL}/user`,
        { email, username, password, profilePicture },
        config
    );
};


export const getUser = (token) => {
    let configWithAuth = {
        ...config,
        headers: {
            ...config.headers,
            'Authorization': `Bearer ${token}`
        },
    };
    return axios.get(`${API_URL}/user`, configWithAuth);
};

export const getUserInfo = async (token, userId) => {
    const response = await axios.get(`${API_URL}/user/${userId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
};


export const sendSnap = (token, recipientId, image, duration) => {
    let configWithAuth = {
        ...config,
        headers: {
            ...config.headers,
            'Authorization': `Bearer ${token}`
        },
    };
    const data = { to: recipientId, image: image, duration: duration };
    console.dir(data);
    return axios.post(`${API_URL}/snap`, data, configWithAuth);
};

export const getSnaps = async (token) => {
    const response = await axios.get(`${API_URL}/snap`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
};

export const getSnap = async (token, snapId) => {
    const response = await axios.get(`${API_URL}/snap/${snapId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
};

export const setSnapAsSeen = async (token, snapId) => {
    const response = await axios.put(`${API_URL}/snap/seen/${snapId}`, {}, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
};

export const updateUserInfo = async (token, email, username, password, profilePicture) => {
    const response = await axios.patch(`${API_URL}/user`, { email, username, password, profilePicture }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
};

export const deleteUser = async (token) => {
    const response = await axios.delete(`${API_URL}/user`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
};