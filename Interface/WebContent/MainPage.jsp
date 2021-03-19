<%@ page import="java.util.*,Models.*"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html>
<title>GANT - Recherche Produit</title>
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
  <img src="Images/Banniere_Recherche.png" style="max-width:100%;height:auto;" alt="Banniere" >
</header>

<!-- Grid -->
<div class="w3-row">

<!-- Blog entries -->
<div class="w3-col l8 s12">
  <!-- Blog entry -->
  <div class="w3-card-4 w3-margin w3-white">
    <img src="Images/Gant_clothes.png" alt="Nature" style="width:100%">
    <div class="w3-container">
      <h3><b>Saisissez la r�f�rence de votre produit</b></h3>	  
		
		<form action="ProductControllerServlet" method="get">
		<h5>Rechercher</h5> 
		<input type="text" id="name" name = "searchProduct">	

		<div class="w3-row">
			<div class="w3-col m8 s12">
				<p><b><input class="w3-button w3-padding-large w3-white w3-border" type="submit" value="Continuer"/><b></p>
			</div>
		</div>		
		
	  </form>
    </div>
  </div>
  <hr>

</div>

<!-- Introduction menu -->
<div class="w3-col l4">
  
  <!-- Posts -->
  <div class="w3-card w3-margin">
    <div class="w3-container w3-padding">
      <h4>Voir aussi - Nos produits iconiques</h4>
    </div>
    <ul class="w3-ul w3-hoverable w3-white">
      <li class="w3-padding-16">
        <img src="Images/Pull_Torsade.jpg" alt="Image" class="w3-left w3-margin-right" style="width:50px">
        <a class="w3-large" href="https://fr.gant.com/pulls-a-torsades" target="blank"><b>Pull Torsade</b></a><br>
        <span><b>Le plus populaire</b></span>
      </li>
      <li class="w3-padding-16">
        <img src="Images/Oxford_Shirt.jpg" alt="Image" class="w3-left w3-margin-right" style="width:50px">
		<a class="w3-large" href="https://fr.gant.com/chemises-homme-oxford" target="blank"><b>Oxford shirt</b></a><br>
        <span><b>L'incontournable</b></span>
      </li> 
      <li class="w3-padding-16">
        <img src="Images/Chino_Pant.jpg" alt="Image" class="w3-left w3-margin-right" style="width:50px">
		<a class="w3-large" href="https://fr.gant.com/homme-chinos" target="blank"><b>Chino Pant</b></a><br>
        <span><b>Le polyvalent</b></span>
      </li>   
	  <li class="w3-padding-16">
        <img src="Images/Polo.PNG" alt="Image" class="w3-left w3-margin-right" style="width:50px">
		<a class="w3-large" href="https://fr.gant.com/homme-polos/blanc-polo-en-coton-piqu%C3%A9/33979?gclid=Cj0KCQiAgomBBhDXARIsAFNyUqPsKWbQhypnAGmLOGvqhXNO9tmNqa55rFL-Z2nun77R3iHnqXtuO3oaAubpEALw_wcB" target="blank"><b>Polo en coton piqu�</b></a><br>
        <span><b>Pour un c�t� sportif</b></span>
      </li>
	  <li class="w3-padding-16" style="font-size:20px;text-align:center;">
		<a href="MainPage.jsp"><b>Recherche</b></a>
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

