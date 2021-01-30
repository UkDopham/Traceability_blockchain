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
	<div id="container">
		<div id="content">
		</div>
	</div>
	<div>
		<br>
		<div>
			<form action="ProductControllerServlet" method="get">
				<input type="text" id="name" name = "searchProduct">
				<input type="submit" value="Search"/>
			</form>
		</div>
	</div>
</body>
</html>