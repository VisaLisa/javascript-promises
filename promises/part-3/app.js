//steps
//1. request to the Pokemon API to get names and URLs for every pokemon
//2. pick three at random and make requests to their URLs
//3. store the name of pokemon and flavor_text_entries key of the response data

$(function(){
    let baseURL = "https://pokeapi.co/api/v2";

// 1. requesting from the API to get names and URLS
// $.getJSON(`${baseURL}/pokemon/?limit=1000`)
//     .then(data => {
//         console.log(data);
// });

//2. picking three pokemon at random
$.getJSON(`${baseURL}/pokemon/?limit=1000`)
    .then(data => {
        let randomPokemon = [];
        for (let i = 0; i < 3; i++) {
            let randomIdx = Math.floor(Math.random() * data.results.length);
            let url = data.results.splice(randomIdx, 1)[0].url;
            randomPokemon.push(url);
        }
        return Promise.all(randomPokemon.map(url => $.getJSON(url)));
    })
    . then(pokemon => {
        pokemon.forEach(p => console.log(p));
    });

//on click, show the name and image of the three random pokemon
let $btn = $("button");
let $pokeArea = $("#pokemon-area");

$btn.on("click", function(){
    $pokeArea.empty();
    let pokeSet = [];
    $.getJSON(`${baseURL}/pokemon/?limit=1000`)
        .then(data => {
            let randomUrls = []
            for (let i = 0; i < 3; i++) {
                let randomIdx = Math.floor(Math.random() * data.results.length);
                let url = data.results.splice(randomIdx, 1)[0].url;
                randomUrls.push(url);
            }
            return Promise.all(randomUrls.map(url => $.getJSON(url)));
        })
        .then(pokemonData => {
            pokeSet = pokemonData.map(p => ({
                name: p.name,
                imgSrc: p.sprites.front_default
            }));
            return Promise.all(pokemonData.map(p => $.getJSON(p.species.url)))
        })
        .then(speciesData => {
            speciesData.forEach((d, i) => {
                let descriptionObj = d.flavor_text_entries.find(function(entry){
                    return entry.language.name === "en";
                });
                let description = descriptionObj ? descriptionObj.flavor_text : "";
                let { name, imgSrc } = pokeSet[i];
                $pokeArea.append(showPokemon(name, imgSrc, description));
            });
        });

});
function showPokemon(name, imgSrc, description) {
    return `
    <div class = "card">
        <h1>${name}</h1>
        <img src=${imgSrc}>
        <p>${description}</p>
    </div>
    `;
}
});
