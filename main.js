document.addEventListener('DOMContentLoaded', function() {
  var cards = document.querySelectorAll('.block');

  cards.forEach(function(card) {
    card.addEventListener('dragstart', dragStart);
    card.addEventListener('dragover', dragOver);
    card.addEventListener('drop', drop);
  });
});

function allowDrop(event) {
  event.preventDefault();
}

function dragStart(event) {
  event.dataTransfer.setData('text/plain', event.target.id);
}

function dragOver(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  var cardId = event.dataTransfer.getData('text/plain');
  var card = document.getElementById(cardId);
  var targetList = event.target.closest('.card-list');
  targetList.appendChild(card);
}

let towers = document.querySelectorAll("tower")

