module.exports = ({ container }) => {
    const {userController, userSchema } = container.cradle;

    return [
        {
            method: 'post',
            path: '/users/signup',
            middlewares: [],
            validation: userSchema.loginBodySchema,
            handler: userController.signup
        },
        {
            method: 'post',
            path: '/login',
            validation: {
                body: userSchema.createUserBodySchema
            },
            handler: userController.login
        },

        {
            method: 'put',
            path: '/users/:email',
            validation: {
                body: userSchema.updateUserBodySchema,
                headers: userSchema.updateUsersHeaderSchema
            },
            handler: userController.updateUser
        },

        {
            method: 'delete',
            path: '/users/:email',
            validation: {
                headers: userSchema.deleteUserHeadersSchema
            },
            handler: userController.deleteUser
        },

        {
            method: 'get',
            path: '/users',
            validation: {
                headers: userSchema.getUserHeadersSchema
            },
            handler: userController.getUser
        }
    ];
};
