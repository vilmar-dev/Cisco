console.log("Hello World");

function{
  


/* ==============================
   CANVA FRAME ITO! 
================================= */


let cameraStream = null;

let frameImage = null;

let capturedPhoto = null;




const video =
document.getElementById("camera");


const frameUpload =
document.getElementById("frameUpload");


const canvas =
document.getElementById("resultCanvas");


const ctx =
canvas.getContext("2d");







/* ===============================
   UPLOAD CANVA FRAME
================================ */


frameUpload.addEventListener(
"change",
function(event){


const file =
event.target.files[0];


if(!file)
return;



const url =
URL.createObjectURL(file);



frameImage =
new Image();



frameImage.onload=function(){


canvas.width =
frameImage.width;


canvas.height =
frameImage.height;



console.log(
"Frame loaded:",
frameImage.width,
frameImage.height
);


};



frameImage.src=url;



});








/* ===============================
   CAMERA START
================================ */


document
.getElementById("startCamera")
.onclick = async function(){



try{


cameraStream =
await navigator
.mediaDevices
.getUserMedia({

video:true

});



video.srcObject =
cameraStream;



}


catch(error){


alert(
"Cannot access camera: "
+
error.message
);


}



};









/* ===============================
   CAPTURE PHOTO
================================ */


document
.getElementById("capture")
.onclick=function(){



if(!frameImage){

alert(
"Please upload your Canva frame first."
);

return;

}




if(!video.videoWidth){

alert(
"Camera not ready."
);

return;

}




let photoCanvas =
document.createElement("canvas");



photoCanvas.width =
video.videoWidth;



photoCanvas.height =
video.videoHeight;



let photoCtx =
photoCanvas.getContext("2d");



photoCtx.drawImage(

video,

0,

0

);



capturedPhoto =
photoCanvas;



createFinalImage();



};









/* ===============================
   CREATE FINAL IMAGE
================================ */


function createFinalImage(){



canvas.width =
frameImage.width;


canvas.height =
frameImage.height;



ctx.clearRect(

0,

0,

canvas.width,

canvas.height

);





/*
    PHOTO LAYER

    The photo is resized
    to fill the frame.

*/



let scale =
Math.max(

canvas.width / capturedPhoto.width,

canvas.height / capturedPhoto.height

);



let newWidth =
capturedPhoto.width * scale;



let newHeight =
capturedPhoto.height * scale;




let x =
(canvas.width-newWidth)/2;


let y =
(canvas.height-newHeight)/2;



ctx.drawImage(

capturedPhoto,

x,

y,

newWidth,

newHeight

);





/*
    FRAME LAYER

    Canva design goes on top

*/


ctx.drawImage(

frameImage,

0,

0,

canvas.width,

canvas.height

);



}









/* ===============================
   DOWNLOAD
================================ */


document
.getElementById("download")
.onclick=function(){



let link =
document.createElement("a");



link.download =
"photobooth-result.png";



link.href =
canvas.toDataURL(
"image/png"
);



link.click();



};








/* ===============================
   PRINT
================================ */


document
.getElementById("print")
.onclick=function(){



let image =
canvas.toDataURL();



let printWindow =
window.open("");



printWindow.document.write(`

<html>

<head>

<title>
Print Photo
</title>


<style>

img{

width:100%;

}

</style>


</head>


<body>


<img src="${image}">


</body>


</html>

`);



printWindow.document.close();



printWindow.print();



};








/* ===============================
   CLEANUP
================================ */


window.addEventListener(
"beforeunload",
function(){


if(cameraStream){


cameraStream
.getTracks()
.forEach(
track=>track.stop()
);


}



});

  function{
    }
