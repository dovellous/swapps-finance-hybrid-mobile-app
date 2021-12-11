const WidgetAuthLogin = (props, {$f7ready, $f7, $f7route, $on, $update, $store}) => {

    $on('pageMounted', (e, page) => {
        console.log('page mounted');
    });
    $on('pageInit', (e, page) => {
        console.log('page init');
    });
    $on('pageBeforeIn', (e, page) => {
        console.log('page before in');
    });
    $on('pageAfterIn', (e, page) => {
        console.log('page after in');
    });
    $on('pageBeforeOut', (e, page) => {
        console.log('page before out');
    });
    $on('pageAfterOut', (e, page) => {
        console.log('page after out');
    });
    $on('pageBeforeUnmount', (e, page) => {
        console.log('page before unmount');
    });
    $on('pageBeforeRemove', (e, page) => {
        console.log('page before remove');
    });


    const doSendPasswordResetCode = (type, payload) => {

        const passwordRecoveryPayload = {

            data: payload,
            function (result) {

                console.log("SEND PASSWORD RESET CODE RESULT ::: result :::", result);

                isSendingPasswordResetCode = false;

                $update();

                $f7.appModules.plugin.CapLocalNotifications.toast(result.message);

                setTimeout(function () {

                    const eventName = "PASSWORD_RESET_CODE_VALUE";

                    const passCodeType = "PASSWORD";

                    const passCodeLength = 6;

                    $f7.on(eventName, function ( passcodeValue ) {

                        console.log("COMPARE PASSCODE:::"+`CODE_${passwordResetCode}` === `CODE_${passcodeValue}`, `CODE_${passwordResetCode} === CODE_${passcodeValue}`)

                        if( `CODE_${passwordResetCode}` === `CODE_${passcodeValue}`){

                            recoverAccount();

                        }else{

                            setTimeout(function () {

                                if(passwordResetCodeAttempts > 3){

                                    $f7.appModules.plugin.CapLocalNotifications.toast('Could not verify your reset code. Please try again later.');

                                    sendPasswordResetCodeSheetModal.open();

                                }else {

                                    $f7.appModules.plugin.CapLocalNotifications.toast('Invalid password reset code. Please try again');

                                    $f7.appModules.plugin.NavigatorModel.gotoUrl(`/app-auth-passcode/${eventName}/${passCodeType}/${passCodeLength}/`);

                                }

                                passwordResetCodeAttempts++;

                            },500);

                        }

                    });

                    $f7route.gotoUrl(`/app-auth-passcode/${eventName}/${passCodeType}/${passCodeLength}/`);

                },50);

                $update();

            },
            function (error) {

                console.log("SEND PASSWORD RESET CODE ERROR ::: error:::", error);

                isSendingPasswordResetCode = false;

                $update();

                let error_message = error.message;

                if(error_message === null || error_message === ""){
                    error_message = "Error occured while sending password reset code...";
                }

                app.appModules.plugin.CapLocalNotifications.toast(error_message);

            }};

    };


    return () => $h`

        //

    `

};

export default WidgetAuthLogin;
