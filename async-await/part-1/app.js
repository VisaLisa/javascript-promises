//1. Make a request for a fact about your favorite number. (Make sure you get back JSON by including the json query key, specific to this API. Details.

//2. Figure out how to get data on multiple numbers in a single request. Make that request and when you get the data back, put all of the number facts on the page.

//3. Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page.

let baseURL = "http://numbersapi.com";

async function req1(){
    let favNum = 20;
    let data = await $.getJSON(`${baseURL}/${favNum}?json`);
    console.log(data);
}

req1();

async function req2(){
    let favNum = [2,10,54];
    let data = await $.getJSON(`${baseURL}/${favNum}?json`);
    console.log(data);
}

req2();

async function req3(){
    let favNum = 2;
    let facts  = await Promise.all(
        Array.from({length: 4}, () => $.getJSON(`${baseURL}/${favNum}?json`))
    );
    facts.forEach(data => {
        $('body').append(
            `
            <p>${data.text}</p>
            `
        );
    });
}
req3();
