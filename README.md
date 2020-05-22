[![Known Vulnerabilities](https://snyk.io/test/github/stfanmichel/ESIR-TP5-SUBJECT/badge.svg?targetFile=package.json)](https://snyk.io/test/github/stfanmichel/ESIR-TP5-SUBJECT?targetFile=package.json)

# ESIR-TP5 - Authentification
## auteurs : 
  + TIDJET Kousaila
  + KAM Sie Vincent

## Objectifs :

Nous nous occuperons pendant cette scéance de réaliser un serveur d'authentification qui vous servira pour la suite du projet.


## Lancement de l'api : 
```console
npm install
npm start
```
## Lancement des tests
```console
npm test
```
## Les identifiants: 
login : pedro
password : koukou

# Step 1 - TDD : tests unitaires de l'API
Nous avons réalisé 5 test pour tester notre api en plus des 12 tests déja fournis


(tag : **TP5-ESIR-STEP1**)

# Step 2 - modèle de données
Nous avons étendu le model de l'utilisateur en ajoutant le mot de passe haché


(tag : **TP5-ESIR-STEP2**)

# Step 3 - implémentation de l'API

  + Implémentation de l'API et passage des tests
  + L'API est déja implémenté avec des appels asynchrones



(tag : **TP5-ESIR-STEP3**)


# Step 4 - sécurisation des services web

+ ajout du midlware pour la sécurisation des routes d'accés aux différente tache d'utilisateur.
+ un utilisateur ne peux donc pas au CRUD sauf si il a le bon login et mot de passe
+ les test unitaires des  users ne passe pas meme avec un token valide.
+ à la place nous avont fournit un fichier **postman-test.json** qui est une collection de tests postmant qui marche trés bien avec l'authentification sur le headeravec un token valide

(tag : **TP5-ESIR-STEP4**)
