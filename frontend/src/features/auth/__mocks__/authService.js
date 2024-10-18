const mockUserData = {
    email: 'testuser@example.com',
    password: 'password123',
    access: 'fake_access_token',
    refresh: 'fake_refresh_token',
    username: 'testuser',
    first_name: 'Test',
    last_name: 'User',
    pkid: 1,
};

export const register = jest.fn(
    /** @param {import('../authService').RegisterUserDetails} userData */
    async (userData) => {
        if (userData.password !== userData.rePassword) {
            throw new Error('Passwords do not match');
        }

        return {
            email: userData.email,
            username: userData.username,
            firstName: userData.firstName,
            lastName: userData.lastName,
            pkid: mockUserData.pkid,
            access: mockUserData.access,
            refresh: mockUserData.refresh,
        };
    },
);

export const login = jest.fn(
    /** @param {import('../authService').LoginUserDetails} userData */
    async (userData) => {
        // FIXME
        if (
            userData.email === mockUserData.email &&
            userData.password === mockUserData.password
        ) {
            localStorage.setItem(
                'user',
                JSON.stringify({
                    email: mockUserData.email,
                    access: mockUserData.access,
                    refresh: mockUserData.refresh,
                }),
            );
            return {
                access: mockUserData.access,
                refresh: mockUserData.refresh,
            };
        }
        throw new Error('Invalid credentials');
    },
);

export const logout = jest.fn(() => {
    localStorage.removeItem('user');
});

const authService = { login, logout, register };

export default authService;
