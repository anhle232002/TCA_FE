const storage = {
    getToken: () => {
        return window.localStorage.getItem(`access-token`) as string;
    },
    setToken: (token: string) => {
        window.localStorage.setItem(`access-token`, token);
    },
    clearToken: () => {
        window.localStorage.removeItem(`access-token`);
    },
};

export default storage;
