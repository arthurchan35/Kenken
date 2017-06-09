 var translation = [45, 150, 0];
 var rotation = [degToRad(40), degToRad(25), degToRad(325)];
 var scale = [1, 1, 1];

function updatePosition(index) {
    return function(event, ui) {
      translation[index] = ui.value;
      drawScene();
    }
  }

  function updateRotation(index) {
    return function(event, ui) {
      var angleInDegrees = ui.value;
      var angleInRadians = angleInDegrees * Math.PI / 180;
      rotation[index] = angleInRadians;
      drawScene();
    }
  }

  function updateScale(index) {
    return function(event, ui) {
      scale[index] = ui.value;
      drawScene();
    }
  }