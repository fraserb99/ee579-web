import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { SignInPage } from './slices/Session/SignInPage';
import { SignUpPage } from './slices/Session/SignUpPage';
import { NavContainer } from './components/Nav/NavContainer';
import { RulesPage } from './slices/Rules/RulesPage';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '.';
import { AccountCreatedPage } from './slices/Session/AccountCreatedPage';
import { Snackbars } from './components/Snackbar/Snackbars';
import { SwitchTenantModal } from './slices/Tenants/SwitchTenantModal';
import { TenantModalContext } from './slices/Tenants/TenantModalContext';
import { TenantModals } from './slices/Tenants/TenantModals';
import { ExternalSignInPage, GoogleExternalSignInPage, MicrosoftExternalSignInPage } from './slices/Session/ExternalLoginPage';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1a2e5a'
    },
    secondary: {
      main: '#018489'
    }
  }
})

function App() {
  const [tenantSwitch, setTenantSwitch] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Snackbars />
        <ConnectedRouter history={history}>
          <TenantModalContext.Provider value={[tenantSwitch, setTenantSwitch]}>
            <Switch>
              <Route path='/signin' component={SignInPage} />
              <Route path='/signup' component={SignUpPage} />
              <Route path='/account-created' component={AccountCreatedPage} />
              <Route path='/google-callback' component={GoogleExternalSignInPage} />
              <Route path='/microsoft-callback' component={MicrosoftExternalSignInPage} />
              <Route path='/' component={NavContainer} />
            </Switch>
            <TenantModals />
          </TenantModalContext.Provider>
        </ConnectedRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
