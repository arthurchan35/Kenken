<%@ include file="/init.jsp" %>


<body onload="start()">
	<canvas id="glcanvas" width="1920" height="1080"></canvas>
	<div id="uiContainer">
		<div id="ui">
			<div id="x"></div>
			<div id="y"></div>
			<div id="z"></div>
			<div id="angleX"></div>
			<div id="angleY"></div>
			<div id="angleZ"></div>
			<div id="scaleX"></div>
			<div id="scaleY"></div>
			<div id="scaleZ"></div>	
		</div>
	</div>
</body>

<script id="shader-fs" type="x-shader/x-fragment">#version 300 es

precision mediump float;

in vec4 v_color;
out vec4 outColor;

void main(void) {
	outColor = v_color;
}

</script>

<script id="shader-vs" type="x-shader/x-vertex">#version 300 es

layout(location = 0) in vec4 a_position;
layout(location = 1) in vec3 a_normal;
layout(location = 2) in vec2 a_texcoord;

uniform mat4 m_matrix;
uniform mat4 v_matrix;
uniform mat4 p_matrix;

out vec4 v_color;

void main(void) {
	gl_Position = p_matrix * v_matrix * m_matrix * a_position;
	v_color = gl_Position;
}

</script>