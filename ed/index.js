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
    return list[Math.floor((Math.random()*list.length))];
}

function load_words() {
    document.getElementById("article-title").innerHTML = `The ${get_random(adjectives)} ${get_random(nouns)}
    ${get_random(verbs)} ${get_random(adverbs)}`;
}

function fetch_textarea(name) {
    const result = document.getElementById(`input-${name}`).value;
    document.getElementById(`input-${name}`).value = "";
    return result;
}

function add_words() {
    fetch_textarea("adjectives").split(", ").forEach(adjective => {
        adjectives.push(adjective);
    })
    fetch_textarea("adverbs").split(", ").forEach(adverb => {
        adverbs.push(adverb);
    })
    fetch_textarea("nouns").split(", ").forEach(noun => {
        nouns.push(noun);
    })
    fetch_textarea("verbs").split(", ").forEach(verb => {
        verbs.push(verb);
    })
}

Promise.allSettled([fetch_JSON, load_DOM]).then((values) => {
    document.getElementById("article-reload").addEventListener("click", load_words);
    document.getElementById("add-words").addEventListener("click", add_words);
    load_words();
});
