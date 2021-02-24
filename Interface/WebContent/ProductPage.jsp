<%@ page import="java.util.*,Models.*"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html>
<title>{% block title %} Product {% endblock %}</title>
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
      <h3><b>Etape 1: ${steps[0]._name}</b></h3>
    </div>

    <div class="w3-container">
      <img src="Images/Coton.png" style="max-width:100%;height:auto;" alt="Coton" >
      <p>Le coton qui compose votre chemise est issu de <b><span style=color:cornflowerBlue>${steps[0]._location}</span>
      </b> prélevé du <b><span style=color:cornflowerBlue>${steps[0]._startDate} au ${steps[0]._endDate}</span>
      </b>. En 2018, 77% de notre collection était en coton. D'ici 2022, nous envisageons de nous tourner vers de meilleures alternatives que le coton conventionel tel que <b>
      <span style=color:cornflowerBlue>le coton biologique, le coton recyclé, le coton régénératif</span></b> et <b><span style=color:cornflowerBlue>le coton de transition</span></b>.</p>
      <div class="w3-row">
        <div class="w3-col m8 s12">
          <p><a class="w3-button w3-padding-large w3-white w3-border" href="ReadMoreCotonBio.jsp"><b>READ MORE »</b></a></p>
        </div>
      </div>
    </div>
  </div>
  <hr>
  
  <!-- Blog entry 2 -->
  <div class="w3-card-4 w3-margin w3-white">
    <div class="w3-container">
      <h3><b>Etape 2: ${steps[1]._name}</b></h3>
    </div>

    <div class="w3-container">
      <img src="Images/Egrenage_Coton.png" style="max-width:100%;height:auto;" alt="Egrenage du coton" >
      <p>Le coton qui compose votre chemise a été égréné à <b><span style=color:cornflowerBlue> ${steps[1]._location}</span></b> du <b>
      <span style=color:cornflowerBlue>${steps[1]._startDate} au ${steps[1]._endDate}</span></b>.</p>
      <p> Nous récupérons à la fin de ce procédé <b><span style=color:cornflowerBlue>une fibre naturelle comme 89% de nos matériaux</span></b>.</p>
    
      <div class="w3-row">
        <div class="w3-col m8 s12">
          <p><a class="w3-button w3-padding-large w3-white w3-border" href="ReadMoreBCI.jsp" ><b>READ MORE »</b></a></p>
        </div>
      </div>
    </div>
  </div>
  <hr>
  
  <!-- Blog entry 3 -->
  <div class="w3-card-4 w3-margin w3-white">
    <div class="w3-container">
      <h3><b>Etape 3: ${steps[2]._name}</b></h3>
    </div>

    <div class="w3-container">
      <img src="Images/Filature_Coton.jpg" style="max-width:100%;height:auto;" alt="Filature du Coton" >
      <p>Une fois égrenées, les fibres naturelles de coton ont ensuite été transformées en fils de coton à <b>
      <span style=color:cornflowerBlue>${steps[2]._location}</span></b> du <b><span style=color:cornflowerBlue>${steps[2]._startDate} au ${steps[2]._endDate}</span></b>.</p>
  
    
      <div class="w3-row">
        <div class="w3-col m8 s12">
          <p><a class="w3-button w3-padding-large w3-white w3-border" href="ReadMoreAMFORI.jsp"><b>READ MORE »</b></a></p>
        </div>
      </div>
    </div>
  </div>
  <hr>
  
  <!-- Blog entry 4 -->
  <div class="w3-card-4 w3-margin w3-white">
    <div class="w3-container">
      <h3><b>Etape 4: ${steps[3]._name}</b></h3>
    </div>

    <div class="w3-container">
      <img src="Images/Manufacture_Coton.png" style="max-width:100%;height:auto;" alt="Manufacture" >
      <p>Une fois les fils de coton collectés, votre chemise a été fabriquée à <b><span style=color:cornflowerBlue>${steps[3]._location}</span></b> du <b><span style=color:cornflowerBlue>${steps[3]._startDate} au ${steps[3]._endDate}</span></b>.</p>
  
      <p>Partenaire d'Amfori BSCI, nous croyons à la production durable, sociale et équitable. Gant fait partie de cette communauté ambicieuse avec plus de 27000 producteurs engagés.</p>
  
    
      <div class="w3-row">
        <div class="w3-col m8 s12">
          <p><a class="w3-button w3-padding-large w3-white w3-border" href="ReadMoreCotonBio.jsp"><b>READ MORE »</b></a></p>
        </div>
      </div>
    </div>
  </div>
  <hr>
  
  <!-- Blog entry 5 -->
  <div class="w3-card-4 w3-margin w3-white">
    <div class="w3-container">
      <h3><b>Etape 5: ${steps[4]._name}</b></h3>
    </div>

    <div class="w3-container">
      <img src="Images/Expedition_Coton.png" style="max-width:100%;height:auto;" alt="Expédition" >
      <p>Une fois fabriquée,votre chemise a été expédiée depuis <b><span style=color:cornflowerBlue> ${steps[4]._location}</span></b> le <b><span style=color:cornflowerBlue>${steps[4]._startDate}</span></b>.</p>
  
      <p>En 2018, <b><span style=color:cornflowerBlue>72% des produits ont été expédiés par voie maritime, 21% par voie routière et 2% par voie aérienne. Le transport maritime des produits représentait au total 3% de l'impact total sur le climat</span></b>.</p>
  
    
      <div class="w3-row">
        <div class="w3-col m8 s12">
          <p><a class="w3-button w3-padding-large w3-white w3-border" href="ReadMoreExpedition.jsp"><b>READ MORE »</b></a></p>
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
      <h4>Descriptif du produit</h4>
    </div>
    <ul class="w3-ul w3-hoverable w3-white">
      <li> Nom: TODO</li>
      <li> Reference: TODO</li>
      <li> Prix: TODO</li>
      <li> Photo: TODO
        <!-- Image -->
      </li>
    </ul>
  </div>
  <hr> 
  
  <!-- Posts -->
  <div class="w3-card w3-margin">
    <div class="w3-container w3-padding">
      <h4>Autres Produits</h4>
    </div>
    <ul class="w3-ul w3-hoverable w3-white">
      <li class="w3-padding-16">
        <img src="Images/Pull_Torsade.jpg" alt="Image" class="w3-left w3-margin-right" style="width:50px">
        <span class="w3-large">Pull Torsade</span><br>
        <span>Le plus populaire</span>
      </li>
      <li class="w3-padding-16">
        <img src="Images/Oxford_Shirt.jpg" alt="Image" class="w3-left w3-margin-right" style="width:50px">
        <span class="w3-large">Oxford shirt</span><br>
        <span>L'incontournable</span>
      </li> 
      <li class="w3-padding-16">
        <img src="Images/Chino_Pant.jpg" alt="Image" class="w3-left w3-margin-right" style="width:50px">
        <span class="w3-large">Chino Pant</span><br>
        <span>Le polyvalent</span>
      </li>   
	  <li class="w3-padding-16" style="font-size:20px;text-align:center;">
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
