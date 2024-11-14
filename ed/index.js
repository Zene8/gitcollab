let adjectives = [], adverbs = [], nouns = [], verbs = []

const fetch_JSON = new Promise((resolve, reject) => {
    fetch("words.json")
        .then(res => res.json())
        .then(data => {
            adjectives = data.adjective;
            adverbs = data.adverb;
            nouns = data.noun;
            verbs = data.verb;
            resolve();
        })
})

const load_DOM = new Promise((resolve, reject) => {
    addEventListener("DOMContentLoaded", (event) => resolve());
})

function get_random(list) {
    const t = list[Math.floor((Math.random()*list.length))];
    return t;
}

function load_words() {
    document.getElementById("article-title").innerHTML = `The ${get_random(adjectives)} ${get_random(nouns)}
    ${get_random(verbs)} ${get_random(adverbs)}`;
}

Promise.allSettled([fetch_JSON, load_DOM]).then((values) => {
    console.log("test")
    load_words();
});