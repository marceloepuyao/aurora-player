const packager = require('electron-packager')

packager({
    dir: __dirname+'/../app',
    electronVersion: '1.6.6',
    platform: 'win32',
    all: true,
    asar: true,
    icon: __dirname+'/../app/assets/img/icons/icon.ico',
    overwrite: true,
    out: __dirname+'/../releases',
    extraResource: __dirname+'/../plugins'
}, (err, appPaths) => {
    if(err) {
        console.log(err);
    } else {
        console.log(appPaths);
    }
})
