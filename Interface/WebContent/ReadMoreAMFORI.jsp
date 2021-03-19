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
<body class="w3-white">

<!-- w3-content defines a container for fixed size centered content, 
and is wrapped around the whole page content, except for the footer in this example -->
<div class="w3-content" style="max-width:1400px">

<!-- Header -->
<header class="w3-container w3-center w3-padding-32" style="text-align:center;"> 
  <img src="Images/create_back.png" style="max-width:100%;height:auto;" alt="Banniere" >
</header>

<!-- Grid -->
<div class="w3-row">

<!-- Blog entries -->
<div class="w3-col l8 s12">
  
  <!-- Blog entry 1-->
  <div class="w3-card-4 w3-margin w3-white">
  <div class='container center'>
  	<div class="align-left center"><a href="ProductPage.jsp"><img src="Images/Vector.png" style="margin:20px 0 0 0;"/></a></div>
  	<div class="align-right center"><h2><b>AMFORI BSCI</b></h2></div>
</div>	
    <img src="Images/amfori_Logo.png" style="max-width:40%;height:auto; margin:20px 100px 0 100px;"alt="CotonBio" >
    
    <div class="w3-container">
	  <p>GANT est membre de la <b><span style=color:cornflowerBlue>Business Social Compliance Initiative (BSCI)</span></b>, une initiative internationale qui fait partie de <b><span style=color:cornflowerBlue>Amfori</span></b> et qui a pour but d'am�liorer les conditions de travail dans la cha�ne d'approvisionnement mondiale.</p>
	  <p><b><span style=color:cornflowerBlue>En 2018, toutes les usines d'Asie, d'Afrique et de Turquie ont fait l'objet d'audits sociaux concluants conduits par un tiers.</span></b> Nous avons mis en place un programme d'am�lioration ayant pour but de renforcer la capacit� de notre base de fournisseurs.</p>
	  <img src="Images/world.png" style="max-width:100%;height:auto;" alt="BetterCotonInitiative" >
      <p style=text-align:center>Emplacements des usines GANT</p>
	  <div class="w3-row">
        <div class="w3-col m8 s12">
			<form action="ListeUsinesGant.jsp">
				<p><b><input class="w3-button w3-padding-large w3-white w3-border" value="Voir notre liste d'usines �" type="submit"/></b></p>
			</form>
        </div>
      </div>
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