import {app, BrowserWindow} from 'electron'
 
function createWindow () {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    //icon: null,
    webPreferences: {
      nodeIntegration: true
    }
  })
 
  // and load the index.html of the app.
  win.loadFile('index.html')
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', () => {
  console.log('app is ready');
  createWindow();
});

app.on('quit', function () {
  console.log('Application quit.');
});