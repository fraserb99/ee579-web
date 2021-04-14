import { useExternalLogin } from "./useExternalLogin";

export const useGoogleLogin = () => useExternalLogin(
    'https://accounts.google.com',
    '394944070114-das844gmn89hk3t9npp62680n52tjtlu.apps.googleusercontent.com',
    'google'
)