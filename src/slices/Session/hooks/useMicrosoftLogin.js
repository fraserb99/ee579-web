import { useExternalLogin } from "./useExternalLogin";

export const useMicrosoftLogin = () => useExternalLogin(
    'https://login.microsoftonline.com/631e0763-1533-47eb-a5cd-0457bee5944e/v2.0',
    '2159bbf6-2fd9-4cad-aa56-dfab875f1cd5',
    'microsoft'
)