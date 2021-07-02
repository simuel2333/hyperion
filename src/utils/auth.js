export const getToken = () => {
    return localStorage.getItem('token');
}

export const getToken2 = () => {
    return localStorage.getItem('token2');
}

export const setToken2 = (token) => {
    localStorage.setItem('token2', token);
}

export const setToken = (token) => {
    localStorage.setItem('token', token);
}

export const clearToken = () => {
    localStorage.removeItem('token');
}

export const isLogined = () => {
    if(localStorage.getItem('token')) {
        return true;
    }
    return false;
}