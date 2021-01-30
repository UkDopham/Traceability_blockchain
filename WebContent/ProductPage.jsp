<%@ page import="java.util.*,Models.*"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html>
<head>
<title>Gant</title>
<link type="text/css" rel="stylesheet" href="css/style.css">
</head>
<body>
	<!-- ${STUDENT_LIST}-->
	<div id="wrapper">
		<div id="header">
			<h1>Gant</h1>
		</div>
	</div>
		<div id="content">
			<h2>
			${product._name}
       </h2>
       <form action="MainPageControllerServlet" method="get">
				<input type="submit" value="Go to the main page"/>
			</form>
	</div>
</body>
</html>