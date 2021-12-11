const konstants = {
    oauth: {
        BEARER_TOKEN: "Bearer Token",
        BASIC: "Basic",
        DIGEST: "Digest",
        OAUTH1: "Oauth v1",
        OAUTH2: "Oauth v2",
        API_KEY: "Api Key",
        NONE: "none"
    },
    requestMethods: {
        GET: 'get',
        POST: 'post',
        PUT: 'put',
        DELETE: 'delete'
    },
    inputs: {
        TEXT: 'text',
        PASSWORD: 'password',
        EMAIL: 'email',
        NUMBER: 'number',
        URL: 'url',
        DATE: 'date',
        TIME: 'time',
        TEXTAREA: 'textarea',
        RADIO: 'radio',
        CHECKBOX: 'checkbox',
        TOGGLE: 'toggle',
        SLIDER: 'slider'
    },
    events: {

        device: {

            DEVICE_READY: 'event_device_ready',

        }

    }
};

export default konstants;
