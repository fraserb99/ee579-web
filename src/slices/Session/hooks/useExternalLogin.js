import { UserManager } from "oidc-client"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { externalSignIn } from '../actions';

export const useExternalLogin = (authority, clientId, provider) => {
    const dispatch = useDispatch();

    const userManager = new UserManager({
        authority: authority,
        client_id: clientId,
        
        redirect_uri: window.location.origin + `/${provider}-callback`,
        response_type: 'id_token',
        scope: 'openid profile email',
    });

    const handleLogin = () => {
        userManager.signinRedirect();
    }
    
    const handleExternalSignIn = async () => {
        try {
            const user = await userManager.signinCallback();
            dispatch(externalSignIn(user.id_token));
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        console.log(window.location.hash);
        if (window.location.hash) {
            handleExternalSignIn();
        }
    }, [window.location.hash])

    return handleLogin;
}