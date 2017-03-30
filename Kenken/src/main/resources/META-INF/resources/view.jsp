<%@ include file="/init.jsp" %>

<!doctype html>
<html>
  <head>
    <title>WebGL Demo</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">

    <script type="text/JavaScript">
      var canvas;
      var gl;
      //
      // start
      //
      // Called when the canvas is created to get the ball rolling.
      // Figuratively, that is. There's nothing moving in this demo.
      //
      function start() {
        canvas = document.getElementById("glcanvas");
        initWebGL(canvas);      // Initialize the GL context
        // Only continue if WebGL is available and working
        if (gl) {
          gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Set clear color to black, fully opaque
          gl.clearDepth(1.0);                 // Clear everything
          gl.enable(gl.DEPTH_TEST);           // Enable depth testing
          gl.depthFunc(gl.LEQUAL);            // Near things obscure far things
        }
      }
      //
      // initWebGL
      //
      // Initialize WebGL, returning the GL context or null if
      // WebGL isn't available or could not be initialized.
      //
      function initWebGL() {
        gl = null;
        try {
          gl = canvas.getContext("experimental-webgl");
        }
        catch(e) {
        }
        // If we don't have a GL context, give up now
        if (!gl) {
          alert("Unable to initialize WebGL. Your browser may not support it.");
        }
      }
    </script>
  </head>

  <body onload="start()">
    <canvas id="glcanvas" width="640" height="480">
      Your browser doesn't appear to support the <code>&lt;canvas&gt;</code> element.
    </canvas>
  </body>
</html>