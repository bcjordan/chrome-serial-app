'use strict';
document.addEventListener('DOMContentLoaded', function() {
  console.log('We have launched.');
  console.log('We have launched again.');
  window.alert('I am backgroundy');

  var h1 = document.getElementsByTagName('h1');
  if (h1.length > 0) {
    h1[0].innerText = h1[0].innerText + ' \'Allo';
  }
}, false);
