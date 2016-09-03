/**
 * @define 
 */
let socket = io.connect('http://localhost:8089'),
    canvas = document.getElementById('canvas-video'),
    context = canvas.getContext('2d'),
    img = new Image();
/**
 *show image loading 
 */
context.fillStyle = '#333';
context.fillText('Loading...', canvas.width / 2 - 30, canvas.height / 3);
/**
 * on socket.io
 */
socket.on('frame', function(data) {
    let uint8Arr = new Uint8Array(data.buffer);
    str = String.fromCharCode.apply(null, uint8Arr),
        base64String = btoa(str);

    img.onload = function() {
        context.drawImage(this, 0, 0, canvas.width, canvas.height);
    };
    img.src = 'data:image/png;base64,' + base64String;
});
