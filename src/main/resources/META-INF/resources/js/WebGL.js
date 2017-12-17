var gl;
var modelInstances;
var camera;

// Initialize WebGL, returning the GL context or null if
// WebGL isn't available or could not be initialized.
function createWebGL(canvas) {

	var gl = canvas.getContext("webgl2");
	// If we don't have a GL context, give up now

	if (!gl) {
		alert("Unable to initialize WebGL. Your browser may not support it.");
		return;
	}
	
	gl.clearColor(0.0, 0.0, 0.0, 1.0);	// Clear to black, fully opaque
	gl.clearDepth(1.0);					// Clear everything
	gl.enable(gl.DEPTH_TEST);			// Enable depth testing
	gl.depthFunc(gl.LEQUAL);			// Near things obscure far things

	return gl;
}

function drawInstance(instance) {
	gl.useProgram(instance.modelAsset.material.shader);

	gl.uniformMatrix4fv(instance.modelAsset.material.projUniLoc, false, camera.projection().array);
	gl.uniformMatrix4fv(instance.modelAsset.material.viewUniLoc, false, camera.view(new Vector([0, 0, 0]), new Vector([0, 1, 0])).array);
	gl.uniformMatrix4fv(instance.modelAsset.material.modelUniLoc, false, instance.modelMatrix.array);

	gl.bindVertexArray(instance.modelAsset.mesh.vao);

	gl.drawElements(instance.modelAsset.mode, instance.modelAsset.count, instance.modelAsset.type, instance.modelAsset.offset);

	gl.bindVertexArray(null);
}

//Draw the scene.
function drawScene() {
	// Clear the canvas before we start drawing on it.
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

	modelInstances.forEach(
		function(instance) {
			drawInstance(instance);
		}
	);
}

function createACubeMesh() {
	var cube_geometry = new Cube();
	var cube_mesh = new Mesh();
	cube_mesh.loadMesh(cube_geometry.vertices, cube_geometry.indices);
	cube_mesh.initMesh(gl);
	return cube_mesh;
}

function createACubeMaterial() {
	var cube_material = new Material();
	cube_material.createShaderProgram(gl, cubeVertexShaderSource, cubeFragmentShaderSource);
	cube_material.loadTexture(gl, "o/Kenken/textures/cube_crate_texture01.jpg");
	cube_material.setMVPUniforms(gl, "m_matrix", "v_matrix", "p_matrix");
	return cube_material;
}

function createACubeModelAsset(mesh, material) {
	var cube_model_asset = new ModelAsset(mesh, material, gl.TRIANGLES, 6 * 2 * 3, gl.UNSIGNED_SHORT, 0);
	return cube_model_asset;
}

function createACubeModelInstance(asset, modelMatrix) {
	var instance = new ModelInstance(asset, modelMatrix);
	return instance;
}

// Called when the canvas is created.
function start() {
	var canvas = document.getElementById("glcanvas");
	gl = createWebGL(canvas);
	modelInstances = new Array();
	camera = new Camera(gl);

	var cube_mesh = createACubeMesh();
	var cube_material = createACubeMaterial();

	var cube_model_asset = createACubeModelAsset(cube_mesh, cube_material);

	//instance 1 has model space aligned with world space
	var cube_model_instance_01 = createACubeModelInstance(cube_model_asset, SquareMatrix.identityMatrix(4));
	modelInstances.push(cube_model_instance_01);

	setInterval(drawScene, 20);

	window.addEventListener(
		"keydown",
		function (event) {
			if (event.defaultPrevented) {
				return; // Do nothing if the event was already processed
			}

			switch (event.key) {
			case "ArrowDown":
				camera.position = camera.position.subtract(new Vector([0, 0, -1]));
				break;
			case "ArrowUp":
				camera.position = camera.position.subtract(new Vector([0, 0, 1]));
				break;
			case "ArrowLeft":
				camera.position = camera.position.subtract(new Vector([-1, 0, 0]));
				break;
			case "ArrowRight":
				camera.position = camera.position.subtract(new Vector([1, 0, 0]));
				break;
			default:
				return; // Quit when this doesn't handle the key event.
			}

			event.preventDefault();
		},
		true
	);
}