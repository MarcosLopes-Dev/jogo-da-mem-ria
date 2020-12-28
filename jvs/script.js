const cards = document.querySelectorAll('.card');
let hasFlipped = false;
let first, second;
let lockBoard = false;

function flipCard() {
    if(lockBoard)return;
    if(this === first) return;

    this.classList.add('flip');
    if(!hasFlipped){
        hasFlipped = true;
        first = this;
        return;
    }

    second = this;
    hasFlipped = false;
    checkForMatch();
}

function checkForMatch (){
    if(first.dataset.card === second.dataset.card){
        disableCards();
        return;
    }
    unflipCard();
}

function disableCards(){
    first.removeEventListener('click', flipCard);
    second.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCard(){
    lockBoard = true;

    setTimeout(() => {
        first.classList.remove('flip');
        second.classList.remove('flip');
       resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlipped, lockBoard] = [false, false];
    [first, second] = [null, null];
}

(function shuffle(){
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 12); // random sorteia e floor arredonda
        card.style.order = randomPosition;
    })
})();

cards.forEach((card) => {
    card.addEventListener('click',flipCard, false)
})

