// 1. make a request for a single card - console.log the value and the suit

// 2. make a request for a 2nd card from same dexk - console.log the value and the suit


//3. draw new card from the deck

$(function(){
    let baseURL = 'https://deckofcardsapi.com/api/deck';
    

    async function req1(){
        let data = await $.getJSON(`${baseURL}/new/draw/`);
        let { suit, value } = data.cards[0];
        console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
    }

    //req1();

    async function req2(){
        let firstCardData = await $.getJSON(`${baseURL}/new/draw/`);
        let deckId = firstCardData.deck_id;
        let secondCardData = await $.getJSON(`${baseURL}/${deckId}/draw/`);
        [firstCardData, secondCardData].forEach(card => {
        let { suit, value } = card.cards[0];
        console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
    });
    }
    // req2();

    async function req3() {
        let $btn = $('button');
        let $cardArea = $('#card-area');
    
        let deckData = await $.getJSON(`${baseURL}/new/shuffle/`);
        $btn.show().on('click', async function() {
          let cardData = await $.getJSON(`${baseURL}/${deckData.deck_id}/draw/`);
          let cardSrc = cardData.cards[0].image;
          $cardArea.append(
            $('<img>', {
              src: cardSrc,
            })
          );
        });
      }
      req3();
});

