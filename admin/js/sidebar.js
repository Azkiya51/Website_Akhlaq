function toggleSidebar(){

  document
  .getElementById('sidebar')
  .classList.toggle('active');

  document
  .getElementById('overlay')
  .classList.toggle('show');
}

function closeSidebar(){

  document
  .getElementById('sidebar')
  .classList.remove('active');

  document
  .getElementById('overlay')
  .classList.remove('show');
}