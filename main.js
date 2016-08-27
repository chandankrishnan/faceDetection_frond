var app = require('electron').app;
var browserWindow = require("electron").BrowserWindow;
const ipcMain = require("electron").ipcMain;
const web = require('electron').webView


var mainWindow = null;

app.on('window-all-closed', function() {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

app.on('ready', function() {
    mainWindow = new browserWindow({ width: 800, height: 600, 'dark-theme': true });
    mainWindow.loadURL('file://' + __dirname + '/template/main.html');

    // var htmlContents = mainWindow.webContents;

    // console.log(htmlContents);

    ipcMain.on("login-attempt", function(event, body) {
        console.log(body == "correctfsd");
        global.sharedObj = null;
        if (body == "correct") {
            global.sharedObj = { prop1: "login sucessfully" };
            console.log("login master" + JSON.stringify(global.sharedObj));
            ipcMain.on('login', function(event) {
                console.log(global.sharedObj.prop1);
            });
        } else {
            global.sharedObj = { prop1: "Data uncorrect" };
            ipcMain.on('login', function(event) {
                console.log(global.sharedObj.prop1);
            })
        }
    });


    ipcMain.on("show_image",function(event,body){
        global.showImage={disp_img:null};
        cosole.log(global.showImage);
    })

    // mainWindow.openDevTools();
    mainWindow.on('close', function() {
        mainWindow = null;
    });
});
