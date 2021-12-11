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

    return () => $h`

        //

    `

};

export default WidgetAuthLogin;
