<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="f"  uri="http://java.sun.com/jsf/core"%>
<%@ taglib prefix="h"  uri="http://java.sun.com/jsf/html"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<title>Coton</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel='stylesheet' href='css/style.css'/>
<style>
body,h1,h2,h3,h4,h5 {font-family: "Raleway", sans-serif}
</style>
<body class="w3-light-grey">

<!-- w3-content defines a container for fixed size centered content, 
and is wrapped around the whole page content, except for the footer in this example -->
<div class="w3-content" style="max-width:1400px">

<!-- Header -->
<header class="w3-container w3-center w3-padding-32" style="text-align:center;"> 
  <img src="Images/Banniere_Produit.png" style="max-width:100%;height:auto;" alt="Banniere" >
</header>

<!-- Grid -->
<div class="w3-row">

<!-- Blog entries -->
<div class="w3-col l8 s12">
  
  <!-- Blog entry 1-->
  <div class="w3-card-4 w3-margin w3-white">
    <div class="w3-container">
	  <img src="Images/BCI_Logo.png" style="max-width:10%;height:auto;float: right; margin:20px 350px 0 0;" alt="BCILogo" >
      <h1><b>Le coton biologique</b></h1>
    </div>

    <div class="w3-container">
	  <img src="Images/CotonBio.jpg" style="max-width:100%;height:auto;" alt="CotonBio" >
	  <p>Chez GANT, nous pensons que l'achat de coton biologique est un investissement durable pour un avenir meilleur.</p>
	  <p><b><span style=color:cornflowerBlue>D'ici 2022, nous prévoyons de remplacer tout le coton conventionnel que nous utilisons par du coton biologique, du coton issu de l'initiative Better Coton Initiative, du coton recyclé, du coton régénératif et du coton de transition.</span></b></p>
    </div>
  </div>
  <hr>
  

<!-- END BLOG ENTRIES -->
</div>

<!-- Introduction menu -->
<div class="w3-col l4">
  
  <!-- Posts -->
  <div class="w3-card w3-margin">
    <div class="w3-container w3-padding">
      <h4>Menu</h4>
    </div>
    <ul class="w3-ul w3-hoverable w3-white" style="font-size:18px;">
	  <li class="w3-padding-16" >
		<a class="w3-large" href="ReadMoreBCI.jsp"><b>Read more Better Cotton Initiative</b></a>
      </li> 
	  <li class="w3-padding-16" style="font-size:18px;">
		<a href="ReadMoreCotonBio.jsp"><b>Read more Coton Bio</b></a>
      </li> 
	  <li class="w3-padding-16" style="font-size:18px;">
		<a href="ReadMoreAMFORI.jsp"><b>Read more AMFORI</b></a>
      </li> 
	  <li class="w3-padding-16" style="font-size:18px;">
		<a href="ReadMoreExpedition.jsp"><b>Read more Expedition</b></a>
      </li> 
	  <li class="w3-padding-16" style="font-size:18px;text-align:center;">
		<a href="MainPage.jsp">Recherche</a>
      </li> 
    </ul>
  </div>
  <hr> 
  
<!-- END Introduction Menu -->
</div>

<!-- END GRID -->
</div><br>

<!-- END w3-content -->
</div>


</body>
</html>