var cubeVertexShaderSource = `#version 300 es

	layout(location = 0) in vec3 a_position;
	layout(location = 1) in vec3 a_normal;
	layout(location = 2) in vec2 a_texcoord;

	uniform mat4 m_matrix;
	uniform mat4 v_matrix;
	uniform mat4 p_matrix;

	out vec2 v_texcoord;

	void main(void) {
		gl_Position = p_matrix * v_matrix * m_matrix * vec4(a_position, 1.0);
		v_texcoord = a_texcoord;
	}`
;

var cubeFragmentShaderSource = `#version 300 es

	precision mediump float;

	in vec2 v_texcoord;

	uniform sampler2D u_texture;

	out vec4 outColor;

	void main(void) {
		outColor = texture(u_texture, v_texcoord);
	}`
;