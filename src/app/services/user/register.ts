export interface Register
{
    username: string;
    password: string;
    confirmPassword: string;
    name?: string;
    surname?: string;
    _csrf: string;
}