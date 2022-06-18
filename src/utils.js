export const InvalidChar = ['+', '-', '.'];
export const getToken = () => {
    return localStorage.getItem('auth-token');
};

export const setToken = (token) => {
    localStorage.setItem('auth-token', token);
};

export const removeToken = (navigate) => {
    localStorage.removeItem('auth-token');
    navigate('/auth')
};


export const isLoggedIn = () => {
    return localStorage.getItem('auth-token') !== null;
};

