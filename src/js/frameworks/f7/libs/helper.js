import Framework7 from 'framework7/bundle';

import {Device} from '@capacitor/device';
import {App} from '@capacitor/app';
import {Storage} from '@capacitor/storage';
import CryptoJS from 'crypto-js';
import JSEncrypt from 'jsencrypt';


const helper = {

    encryption: {

        encrypt: async (callbackSuccess, callbackError, publicKey, text) => {

            const encrypt = new JSEncrypt();

            encrypt.setPublicKey(publicKey);

            if (typeof callbackSuccess === "function") {

                callbackSuccess(encrypt.encrypt(text));

            }

        },
        decrypt: async (callbackSuccess, callbackError, privateKey, encrypted) => {

            const decrypt = new JSEncrypt();

            decrypt.setPrivateKey(privateKey);

            if (typeof callbackSuccess === "function") {

                callbackSuccess(decrypt.decrypt(encrypted));

            }

        },

        generateKeyPair: async (callbackSuccess, callbackError, default_key_size) => {

            //console.log(":: PREPARE TO GENERATE ENCRYPTION KEYS :0:");

            const obj = new JSEncrypt({default_key_size: default_key_size});

            //console.log(":: PREPARE TO OBJ :1:", obj);

            if (default_key_size % 1024 === 0) {

                //console.log(":: PREPARE TO OBJ :2:", obj);

                const publicKey = obj.getPublicKey();

                //console.log(":: ENCRYPTION OBJ CREATED :4:publicKey", publicKey);

                const privateKey = obj.getPrivateKey();

                //console.log(":: ENCRYPTION OBJ CREATED :5:privateKey", privateKey);

                callbackSuccess({
                    publicKey: publicKey,
                    privateKey: privateKey
                });

            } else {

                console.log(":: ENCRYPTION OBJ ERROR :4:", obj);

                callbackError(obj);

            }

        },

    },

    base64: {

        // private property
        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

        // public method for encoding
        encode: function (input) {
            let output = "";
            let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            let i = 0;

            input = helper.base64._utf8_encode(input);

            while (i < input.length) {

                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output +
                    this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                    this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
            }
            return output;
        },

        // public method for decoding
        decode: function (input) {
            let output = "";
            let chr1, chr2, chr3;
            let enc1, enc2, enc3, enc4;
            let i = 0;

            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            while (i < input.length) {

                enc1 = this._keyStr.indexOf(input.charAt(i++));
                enc2 = this._keyStr.indexOf(input.charAt(i++));
                enc3 = this._keyStr.indexOf(input.charAt(i++));
                enc4 = this._keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 !== 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 !== 64) {
                    output = output + String.fromCharCode(chr3);
                }
            }

            output = helper.base64._utf8_decode(output);

            return output;
        },

        // private method for UTF-8 encoding
        _utf8_encode: function (string) {
            string = string.replace(/\r\n/g, "\n");
            let utftext = "";

            for (let n = 0; n < string.length; n++) {

                const c = string.charCodeAt(n);

                if (c < 128) {
                    utftext += String.fromCharCode(c);
                }
                else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
                else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
            }
            return utftext;
        },

        // private method for UTF-8 decoding
        _utf8_decode: function (utftext) {
            let string = "";
            let i = 0;
            let c = 0;
            let c1 = 0;
            let c2 = 0;
            let c3 = 0;

            while (i < utftext.length) {

                c = utftext.charCodeAt(i);

                if (c < 128) {
                    string += String.fromCharCode(c);
                    i++;
                }
                else if ((c > 191) && (c < 224)) {
                    c2 = utftext.charCodeAt(i + 1);
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                }
                else {
                    c2 = utftext.charCodeAt(i + 1);
                    c3 = utftext.charCodeAt(i + 2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }
            }
            return string;
        }

    },

    device: {

        getDeviceInfo: async (callbackSuccess) => {

            const info = await Device.getInfo();

            callbackSuccess(info);

        },
        getDeviceId: async (callbackSuccess) => {

            const id = await Device.getId();

            callbackSuccess(id);

        },
        getAppInfo: async (callbackSuccess) => {

            helper.device.getDeviceInfo(async function (deviceInfo) {

                if (deviceInfo.platform !== "web") {

                    const info = await App.getInfo();

                    callbackSuccess(info);

                } else {

                    callbackSuccess(
                        {
                            build: "APP_BUILD",
                            id: "APP_ID",
                            name: "APP_NAME",
                            version: "APP_VERSION"
                        }
                    )

                }

            });

        },


        getDeviceData: async (callbackSuccess) => {

            let deviceData = {}

            helper.device.getDeviceInfo(function (deviceInfo) {

                const deviceName = deviceInfo.name;

                deviceInfo.deviceName = deviceName;

                delete deviceInfo.name;

                deviceData = Framework7.utils.extend(deviceData, deviceInfo);

                helper.device.getDeviceId(function (deviceId) {

                    deviceData = Framework7.utils.extend(deviceData, deviceId);

                    helper.device.getAppInfo(function (appInfo) {

                        deviceData = Framework7.utils.extend(deviceData, appInfo);

                        const deviceString = `${deviceData.id}:${deviceData.manufacturer}:${deviceData.model}:${deviceData.operatingSystem}:${deviceData.uuid}`;

                        helper.device.getDeviceKey(deviceString, function (deviceKey) {

                            if (typeof callbackSuccess === "function") {

                                callbackSuccess({data: deviceData, key: deviceKey});

                            }

                        });

                    });

                });

            });

        },

        getBatteryInfo: async (callbackSuccess) => {

            const info = await Device.getBatteryInfo();

            callbackSuccess(info);
        },


        getDeviceKey: async (deviceString, callbackSuccess) => {

            const hash = CryptoJS.SHA512(deviceString);

            const deviceKey = CryptoJS.enc.Hex.stringify(hash);

            callbackSuccess(deviceKey);

        },

    },
    data: {
        setKey: async (key, value, callbackSuccess, callbackError) => {

            Storage.set({
                key: key,
                value: value,
            }).then(success => {

                //console.log("SAVED",key);

                if (typeof callbackSuccess === "function") {

                    Storage.get({key: key})
                        .then(savedValue => {
                            callbackSuccess(savedValue.value);
                        })
                        .catch(error => {

                            if (typeof callbackError === "function") {

                                console.warn('Item with specified key does not exist.', 3, key, error);

                                callbackError(error);

                            }

                        });

                }

            }).catch(error => {

                if (typeof callbackError === "function") {

                    console.warn('Item with specified key does not exist.', 2, key, error);

                    callbackError(error);

                }

            });

        },

        getKey: async (key, callbackSuccess, callbackError) => {

            Storage.get({key: key})
                .then(savedValue => {

                    if (typeof callbackSuccess === "function") {

                        callbackSuccess(savedValue.value);

                    }

                })
                .catch(error => {

                    if (typeof callbackError === "function") {

                        console.warn('Item with specified key does not exist.', 1, key, error);

                        callbackError(error);

                    }

                });

        }
    }

};

export default helper;
