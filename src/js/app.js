import HelloWorld from "dovellous-jsnippets";

let x = HelloWorld.init({
    a: "A",
    b: [1,2,3,4,5]
});

console.log(x);


import $ from 'dom7';

window.$ = $;

window.$$ = $;

import jQuery from 'jquery';

window.$ = jQuery;

window.jQuery = jQuery;

import Framework7, {getDevice} from 'framework7/bundle';

import './frameworks/f7/libs/snippets.js';

import images from './frameworks/f7/libs/images.js';

import helper from './frameworks/f7/libs/helper.js';

// Import F7 Styles
import 'framework7/framework7-bundle.css';

// Import Icons and App Custom Styles
import '../css/icons.css';
import '../css/app.scss';
import './frameworks/f7/styles/app-custom.scss';

// Import Capacitor APIs
import capacitorApp from './frameworks/f7/capacitor/capacitor-app.js';
// Import Routes
import routes from './frameworks/f7/routing/routes.js';
// Import Store
import store from './frameworks/f7/storage/store.js';

// Import main app component
import App from './frameworks/f7/pages/app.f7';

var device = getDevice();

window.app = new Framework7({
    name: '', // App name
    version: '', // App name
    build: '', // App name
    id: '', // App bundle ID
    theme: 'auto', // Automatic theme detection
    language: navigator.language,
    el: '#app', // App root element
    component: App, // App main component
    autoDarkTheme: true,
    data: {},
    dom: {
        dom7: $,
        jQuery: jQuery,
    },
    apps: {
        firebase: null,
    },
    assets: {
        images: images
    },
    device: device,
    // App store
    store: store,
    // App routes
    routes: routes,

    // Input settings
    input: {
        scrollIntoViewOnFocus: device.capacitor,
        scrollIntoViewCentered: device.capacitor,
    },
    // Capacitor Statusbar settings
    statusbar: {
        enabled: true,
        scrollTopOnClick: true,
        iosOverlaysWebView: true,
        androidOverlaysWebView: true,
    },
    view: {
        iosDynamicNavbar: false,
    },

    // Register service worker (only on production build)
    serviceWorker: process.env.NODE_ENV === 'production' ? {
        path: '/service-worker.js',
    } : {},

    on: {
        init: function () {
            const f7 = this;
            if (f7.device.capacitor) {
                // Init capacitor APIs (see capacitor-app.js)
                capacitorApp.init(f7);
            }
        },
        darkThemeChange: function (e) {
            console.log(":: APP THEME CHANGED ::", e);
        },
        connection: function (isOnline) {
            console.log(":: APP CXN STATE CHANGED ::", isOnline);
        },
        online: function () {
            console.log(":: APP CXN STATE CHANGED :: ONLINE ::");
        },
        offline: function () {
            console.log(":: APP CXN STATE CHANGED :: OFFLINE ::");
        },
    },
});
