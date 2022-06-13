////////////// Hooking canvas features from "fabric.min.js" /////////////////
var canvas = new fabric.Canvas("canvas")

/////////////Taking Input as a file accessing dom //////////////////
document
  .getElementById("picture-upload")
  .addEventListener("change", function (e) {
    var file = e.target.files[0]

    // accessing FileReader object for containing file stored on the users computer
    var reader = new FileReader()
    reader.onload = function (f) {
      var data = f.target.result
      fabric.Image.fromURL(data, function (img) {
        var newImg = img
          //////////////////////   size of holdding image //////////////
          .set({
            left: 200,
            top: 100,
            angle: 0,
            width: img.width,
            height: img.height,
          })
          .scale(0.9)
        canvas.add(newImg).renderAll()
        var a = canvas.setActiveObject(newImg)
        var dataURL = canvas.toDataURL({ format: "svg", quality: 0.8 })
      })
    }
    reader.readAsDataURL(file)
  })

///////////////////////////////   feature for zooming in and zooming out////////////////////////////
canvas.on("mouse:wheel", function (opt) {
  var delta = opt.e.deltaY
  var zoom = canvas.getZoom() // get zoom is a function which calling from fabric.min.js
  zoom *= 0.999 ** delta
  if (zoom > 20) zoom = 20
  if (zoom < 0.01) zoom = 0.01
  canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom)
  opt.e.preventDefault() //stop defalt behavior
  opt.e.stopPropagation()
})
