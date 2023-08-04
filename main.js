let gameOver = false;

  function load() {
    let towers = document.querySelectorAll('.tower');

    towers.forEach(function (tower) {
      let blocks = tower.querySelectorAll('.block');
      let lastBlock = blocks[blocks.length - 1];

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
    let cardId = event.dataTransfer.getData('text/plain');
    let card = document.getElementById(cardId);
    let targetList = event.target.closest('.card-list');

    if (targetList.children.length > 0) {
      let lastBlock = targetList.lastElementChild;
      let currentValue = parseInt(card.getAttribute('value'));
      let lastValue = parseInt(lastBlock.getAttribute('value'));

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
          let blocks = document.querySelectorAll('.block');
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
      let blocks = document.querySelectorAll('.block');
          blocks.forEach(function (block) {
            block.setAttribute('draggable', 'false');
          });
    }
  }

  document.getElementById('ins').addEventListener('click', ()=>{

    Swal.fire({
      title: 'How to play...?',
      text: `You have to transfer all the blocks from tower 1 to tower 3, but you can't place larger block onto a smaller block`,
      confirmButtonColor: "#212121",
    })

  })