$(function() {
    let baseURL = 'https://deckofcardsapi.com/api/deck';
  
    // Request card
    // $.getJSON(`${baseURL}/new/draw/`).then(data => {
    //   let { suit, value } = data.cards[0];
    //   console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
    // });
  
    // Draw a second call
    let firstCard = null;
    $.getJSON(`${baseURL}/new/draw/`)
      .then(data => {
        firstCard = data.cards[0];
        let deckId = data.deck_id;
        return $.getJSON(`${baseURL}/${deckId}/draw/`);
      })
      .then(data => {
        let secondCard = data.cards[0];
        [firstCard, secondCard].forEach(function(card) {
          console.log(
            `${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`
          );
        });
      });

    let deckId = null;
    let $btn = $('button');
    let $cardArea = $('#card-area');

    // shuffle deck -> get the deck id ->  at click, draw card
    // solved for when the deck runs out - do you reshuffle or another prompt


    $.getJSON(`${baseURL}/new/shuffle/`).then(data => {
      deckId = data.deck_id;
      $btn.show();
    })

    $btn.on('click', function(){
        $.getJSON(`${baseURL}/${deckId}/draw/`)
        .then(data => {
            let cardSrc = data.cards[0].image;
            $cardArea.append(
                $('<img>', {
                    src: cardSrc,
                })
            )
            //requesting the card's image 
            //image, number, suit
            //bring into DOM
        });
    });
    
});
  