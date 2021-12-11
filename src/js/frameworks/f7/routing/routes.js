import HomeScreen from '../pages/html/landing/index.f7';

import AboutPage from '../pages/html/about/about-index.f7';

import Notifications from '../pages/html/messaging/messaging-index.f7';

import SettingsPage from '../pages/html/settings/settings-index.f7';

import AuthSignInPage from '../pages/html/auth/auth-signin.f7';
import AuthSignUpPage from '../pages/html/auth/auth-signup.f7';
import AuthRecoverPasswordPage from '../pages/html/auth/auth-recover-password.f7';
import AuthLockScreenPage from '../pages/html/auth/auth-lock-screen.f7';

import NicheWalletIndexPage from '../pages/html/niche/wallet/wallet-index.f7';
import NicheDAppsIndexPage from '../pages/html/niche/daaps/daaps-index.f7';
import NicheDeFiIndexPage from '../pages/html/niche/defi/defi-index.f7';
import NicheNFTsIndexPage from '../pages/html/niche/nfts/nfts-index.f7';

import PanelLeftDefault from '../pages/html/panels/panel-left-default.f7';
import PanelRightDefault from '../pages/html/panels/panel-right-default.f7';

import NotFoundPage from '../pages/404.f7';

var routes = [
    {
        path: '/',
        component: HomeScreen,
    },
    {
        path: '/home/',
        component: HomeScreen,
    },
    {
        path: '/about/',
        component: AboutPage,
    },
    {
        path: '/notifications/',
        component: Notifications,
    },
    {
        path: '/settings/',
        component: SettingsPage,
    },
    {
        path: '/auth-sign-in/',
        component: AuthSignInPage,
    },
    {
        path: '/auth-sign-up/',
        component: AuthSignUpPage,
    },
    {
        path: '/auth-recover-password/',
        component: AuthRecoverPasswordPage,
    },
    {
        path: '/auth-lock-screen/',
        component: AuthLockScreenPage,
    },
    {
        path: '/wallet-landing/',
        component: NicheWalletIndexPage,
    },
    {
        path: '/dapps-landing/',
        component: NicheDAppsIndexPage,
    },
    {
        path: '/defi-landing/',
        component: NicheDeFiIndexPage,
    },
    {
        path: '/nfts-landing/',
        component: NicheNFTsIndexPage,
    },
    {
        path: '/panel-left-default/',
        component: PanelLeftDefault,
    },
    {
        path: '/panel-right-default/',
        component: PanelRightDefault,
    },
    {
        path: '(.*)',
        component: NotFoundPage,
    },
];

export default routes;