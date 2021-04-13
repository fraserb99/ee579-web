export const showSuccessSnackbar = message => {
    return {
        type: "SNACKBAR_SUCCESS", 
        message
    };
};

export const clearSnackbar = () => {
    return {
        type: "SNACKBAR_CLEAR"
    };
};