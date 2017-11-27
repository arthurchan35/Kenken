package Kenken.portlet;

import com.liferay.portal.kernel.portlet.bridges.mvc.MVCPortlet;

import javax.portlet.Portlet;

import org.osgi.service.component.annotations.Component;

/**
 * @author arthurchan35
 */
@Component(
	immediate = true,
	property = {
		"com.liferay.portlet.display-category=category.sample",
		"com.liferay.portlet.instanceable=true",
		"com.liferay.portlet.header-portlet-css=/css/webgl.css",
		"com.liferay.portlet.header-portlet-javascript=/js/Camera.js",
		"com.liferay.portlet.header-portlet-javascript=/js/Geometries.js",
		"com.liferay.portlet.header-portlet-javascript=/js/InputUtils.js",
		"com.liferay.portlet.header-portlet-javascript=/js/Material.js",
		"com.liferay.portlet.header-portlet-javascript=/js/MathUtils.js",
		"com.liferay.portlet.header-portlet-javascript=/js/Matrix.js",
		"com.liferay.portlet.header-portlet-javascript=/js/Mesh.js",
		"com.liferay.portlet.header-portlet-javascript=/js/Model.js",
		"com.liferay.portlet.header-portlet-javascript=/js/UIElements.js",
		"com.liferay.portlet.header-portlet-javascript=/js/UIUtils.js",
		"com.liferay.portlet.header-portlet-javascript=/js/Vector.js",
		"com.liferay.portlet.header-portlet-javascript=/js/WebGL.js",
		"com.liferay.portlet.header-portlet-javascript=/js/shaders/shaders_cube.js",
		"javax.portlet.display-name=Kenken Portlet",
		"javax.portlet.init-param.template-path=/",
		"javax.portlet.init-param.view-template=/view.jsp",
		"javax.portlet.resource-bundle=content.Language",
		"javax.portlet.security-role-ref=power-user,user"
	},
	service = Portlet.class
)
public class KenkenPortlet extends MVCPortlet {
}