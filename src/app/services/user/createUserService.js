const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');

const { REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXPIRY } = process.env;

module.exports = ({ userRepository }) => ({
    execute: async (body) => {
        try {
            body.user_id = uuidv4();

            if (body.image) {
                const base64 = body.image.replace(/^data:image\/[a-z]+;base64,/, "");

                const byteCharacters = atob(base64);
                const byteArrays = [];
                const sliceSize = 512;

                for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                    const slice = byteCharacters.slice(offset, offset + sliceSize);

                    const byteNumbers = new Array(slice.length);
                    for (let i = 0; i < slice.length; i++) {
                        byteNumbers[i] = slice.charCodeAt(i);
                    }

                    const byteArray = new Uint8Array(byteNumbers);
                    byteArrays.push(byteArray);
                }

                const blob = new Blob(byteArrays, { type: 'image/png' });

                body.image = Buffer.from(await blob.arrayBuffer())
            }

            const createdUser = await userRepository.createUser(body);

            if (createdUser) {
                let token = jwt.sign(
                    {
                        name: createdUser.username, password: createdUser.password, email: createdUser.email, role: createdUser.role,
                        user_id: createdUser.user_id
                    },
                    REFRESH_TOKEN_SECRET,
                    { expiresIn: REFRESH_TOKEN_EXPIRY }
                );



                console.log("user", JSON.stringify(createdUser, null, 2));
                console.log(token);

                return createdUser;
            }
        } catch (error) {
            console.log('createUser - [Error]: ', error);
            throw error;
        }
    }
});
