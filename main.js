let gameOver = false;

  function load() {
    var towers = document.querySelectorAll('.tower');

    towers.forEach(function (tower) {
      var blocks = tower.querySelectorAll('.block');
      var lastBlock = blocks[blocks.length - 1];

      blocks.forEach(function (block, index) {
        if (block === lastBlock && !gameOver) {
          block.setAttribute('draggable', 'true');
          block.addEventListener('dragstart', dragStart);
        } else {
          block.setAttribute('draggable', 'false');
        }

        block.addEventListener('dragover', dragOver);
        block.addEventListener('drop', drop);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    load();
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

    if (targetList.children.length > 0) {
      var lastBlock = targetList.lastElementChild;
      var currentValue = parseInt(card.getAttribute('value'));
      var lastValue = parseInt(lastBlock.getAttribute('value'));

      if (currentValue > lastValue) {
        gameOver = true;
        if (gameOver) {
          Swal.fire({
            icon: 'error',
            title: 'Game Over',
            text: 'You put the big block on a small block',
            showConfirmButton: false,
            timer: 2000,
          });

          // Reset draggable attribute for all blocks
          var blocks = document.querySelectorAll('.block');
          blocks.forEach(function (block) {
            block.setAttribute('draggable', 'false');
          });
        }
        return;
      }
    }

    targetList.appendChild(card);
    load();

    // Check if all blocks are in tower 3
    let tower3 = document.querySelector('#tower-3');
    if (tower3.children.length === 4) {
      Swal.fire({
        icon: 'success',
        title: 'You Win',
        text: 'You finished the game',
        showConfirmButton: false,
        timer: 2000,
      });
    }
  }