# Traceability_blockchain
Traceability of a garment with a blockchain by an ESILV Team.

# Scénario 

* Coton issu d'un champ chinois et transporté jusqu'à l'usine de Roumanie en train
* Dans cette usine le coton est égrené
* Ce dernier est ensuite transporté en camion dans une usine Italienne où il est transformé en fils de coton
* Une fois filé les fils sont envoyés au Portugal par voie maritime où la chemise est fabriquée
* Ensuite la chemise est expédiée vers les entrepôts parisiens en camion
* La chemise est finalement livrée en magasin et mise en rayon

# Modèle 

* utilisation de la technologie d'IBM basée sur hyperledger fabric pour la réalisation de la blockchain
* utilisation de JSP pour l'interface utilisateur

# Participants

* Producteurs de matières premières
* Usines de transformation
* Transporteurs
* Distributeurs
* Gant
* Clients
* Organismes de certification

# Transactions 

* Création d'un lot de vêtements (Input : Identifiant du lot, Poids, Identifiant producteur, Date) (Output : True)
* Changement de propriétaire (Input : Identifiant du lot, Identifiant producteur, Type, Date) (Output : True)
* Historique des propriétaires (Input : Identifiant du lot) (Output : Liste des propriétaires, Dates)
* Statut (Input : Identifiant du lot) (Output : Identifiant du lot, Poids, Identifiant producteur, Date)
* Ajout d'une certification (Input : Identifiant du lot, Certification) (Output : True)

# Contrat 

* Création : Vérification de la date, de l'identifiant du lot (unique) et de l'identifiant producteur (existant)
* Transfert : Vérification de l'existance de l'identifiant du lot et de l'identifiant producteur. Si le producteur est un manufacturier le type doit être non null
* Historique : Vérification que l'id existe
* Statut : Vérification que l'id existe
* Certification : Vérification que l'id existe et que la certification est valide





