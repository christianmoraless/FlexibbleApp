export const getUserQuery = `
    query getUser($email: String!) {
        user(email: $email) {
            id
            name
            email
            avatarUrl
            description
            githubUrl
            linkedinUrl
        }
    }
`;

export const createUserMutation = `
    mutation createUser($input: UserCreateInput!) {
        userCreate(input:$input) {
            user{
                id
                name
                email
                avatarUrl
                githubUrl
                linkedinUrl
            }
        }
    }
`