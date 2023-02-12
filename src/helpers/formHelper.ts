export const registerForm = [
    {
        name: 'fullName',
        label: 'Full Name',
        type: 'text',
        autoComplete: 'name',
    },
    {
        name: 'email',
        label: 'E-Mail',
        type: 'email',
    },
    {
        name: 'password',
        label: 'Password',
        type: 'password',
        autoComplete: 'new-password',
    },
    {
        name: 'repeatPassword',
        label: 'Repeat Password',
        type: 'password',
        autoComplete: 'new-password',
    }
];

export const loginForm = [
    {
        name: 'email',
        label: 'E-Mail',
        type: 'email',
        autoComplete: 'email',
    },
    {
        name: 'password',
        label: 'Password',
        type: 'password',
        autoComplete: 'current-password',
    },
];