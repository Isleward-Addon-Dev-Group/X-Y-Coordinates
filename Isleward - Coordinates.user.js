// ==UserScript==
// @name         Isleward - Coordniates 
// @namespace    Isleward.Addon
// @version      0.1
// @description  Displays the current coordinates of the user
// @author       Anubis5
// @match        isleward-test.herokuapp.com/*
// @grant        none
// ==/UserScript==

(function () {
    var scriptElement = document.createElement( "script" );
    scriptElement.type = "text/javascript";
    scriptElement.src = "https://cdn.rawgit.com/Isleward-Addon-Dev-Group/X-Y-Coordnates/master/coordinates.js";
    document.body.appendChild( scriptElement );
})();
