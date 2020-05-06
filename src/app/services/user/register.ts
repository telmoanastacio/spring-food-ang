export interface Register
{
    username: string;
    password: string;
    confirmpassword: string;
    name?: string;
    surname?: string;
    email?: string;
    _csrf: string;
}