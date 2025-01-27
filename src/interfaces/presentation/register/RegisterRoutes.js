module.exports = ({ container }) => {
    const {userController, userSchema } = container.cradle;

    return [
        {
            method: 'post',
            path: '/users/signup',
            middlewares: [],
            tags: ['users'],
            validation: {
                body: userSchema.createUserBodySchema.body
            },
            handler: userController.userSingup
        },
        {
            method: 'post',
            path: '/users/login',
            middlewares: [],
            tags: ['login'],
            validation: {
                body: userSchema.loginBodySchema.body
            },
            handler: userController.userLogin
        },
        {
            method: 'put',
            path: '/users',
            tags: ['users'],
            validation: {
                body: userSchema.updateUserBodySchema.body,
                headers: userSchema.updateUsersHeaderSchema.headers
            },
            handler: userController.updateUser
        },

        {
            method: 'delete',
            path: '/users',
            tags: ['users'],
            validation: {
                headers: userSchema.deleteUserHeadersSchema.headers
            },
            handler: userController.deleteUser
        },

        {
            method: 'get',
            path: '/users',
            tags: ['users'],
            validation: {
                query: userSchema.getUserParamsSchema.params
            },
            handler: userController.retrieveUser
        }
    ];
};
