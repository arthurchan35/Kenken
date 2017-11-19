class ModelAsset {

	/*
	 * gl.drawElements(mode, count, type, offset)
	 * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/drawElements
	 */
	constructor(mesh, material, mode, count, type, offset) {
		this.mesh = mesh;
		this.material = material;

		this.mode = mode;
		this.count = count;
		this.type = type;
		this.offset = offset;
	}

}

class ModelInstance {

	constructor(modelAsset, modelMatrix) {
		this.modelAsset = modelAsset;
		this.modelMatrix = odelMatrix;
	}

}