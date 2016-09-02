(function () {

  var addCardButton = document.querySelector('.add-card-button');
  var addCardModal = document.querySelector('.add-card-modal');


  if (! addCardModal.showModal) {
    dialogPolyfill.registerDialog(addCardModal);
  }

  addCardButton.addEventListener('click', function () {
    addCardModal.showModal();
  });

  addCardModal.querySelector('.close').addEventListener('click', function() {
    addCardModal.close();
  });

}());
