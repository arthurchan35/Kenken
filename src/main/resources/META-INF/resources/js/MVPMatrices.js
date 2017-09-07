function getMVPMatrix(gl, translation, rotation, scale) {
    var matrix = projectionMatrix.projection(gl.canvas.clientWidth, gl.canvas.clientHeight, 400);
    matrix = modelMatrix.translate(matrix, translation[0], translation[1], translation[2]);
    matrix = modelMatrix.xRotate(matrix, rotation[0]);
    matrix = modelMatrix.yRotate(matrix, rotation[1]);
    matrix = modelMatrix.zRotate(matrix, rotation[2]);
    matrix = modelMatrix.scale(matrix, scale[0], scale[1], scale[2]);
    return matrix;
}

var projectionMatrix = {

	projection: function(width, height, depth) {
    // Note: This matrix flips the Y axis so 0 is at the top.
		return [
			2 / width, 0, 0, 0,
			0, -2 / height, 0, 0,
			0, 0, 2 / depth, 0,
			-1, 1, 0, 1,
		];
	},
};

var viewMatrix = {
	
	view: function() {
		//dub
		return [
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1,
		];
	}
};

var modelMatrix = {



  translation: function(tx, ty, tz) {
    return [
       1,  0,  0,  0,
       0,  1,  0,  0,
       0,  0,  1,  0,
       tx, ty, tz, 1,
    ];
  },

  xRotation: function(angleInRadians) {
    var c = Math.cos(angleInRadians);
    var s = Math.sin(angleInRadians);

    return [
      1, 0, 0, 0,
      0, c, s, 0,
      0, -s, c, 0,
      0, 0, 0, 1,
    ];
  },

  yRotation: function(angleInRadians) {
    var c = Math.cos(angleInRadians);
    var s = Math.sin(angleInRadians);

    return [
      c, 0, -s, 0,
      0, 1, 0, 0,
      s, 0, c, 0,
      0, 0, 0, 1,
    ];
  },

  zRotation: function(angleInRadians) {
    var c = Math.cos(angleInRadians);
    var s = Math.sin(angleInRadians);

    return [
       c, s, 0, 0,
      -s, c, 0, 0,
       0, 0, 1, 0,
       0, 0, 0, 1,
    ];
  },

  scaling: function(sx, sy, sz) {
    return [
      sx, 0,  0,  0,
      0, sy,  0,  0,
      0,  0, sz,  0,
      0,  0,  0,  1,
    ];
  },

  translate: function(m, tx, ty, tz) {
    return modelMatrix.multiply(m, modelMatrix.translation(tx, ty, tz));
  },

  xRotate: function(m, angleInRadians) {
    return modelMatrix.multiply(m, modelMatrix.xRotation(angleInRadians));
  },

  yRotate: function(m, angleInRadians) {
    return modelMatrix.multiply(m, modelMatrix.yRotation(angleInRadians));
  },

  zRotate: function(m, angleInRadians) {
    return modelMatrix.multiply(m, modelMatrix.zRotation(angleInRadians));
  },

  scale: function(m, sx, sy, sz) {
    return modelMatrix.multiply(m, modelMatrix.scaling(sx, sy, sz));
  },

};