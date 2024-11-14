let adjectives = [], adverbs = [], nouns = [], verbs = []
let words = {};

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

async function fetch_words() {
    try {
        const response = await fetch("https://random-word-api.herokuapp.com/word?number=1000&lang=en");
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json().then(data => {
            data.forEach(word => {
                const syllables = syllable_count(word)
                if (words[syllables] === undefined) {
                    words[syllables] = [word];
                } else {
                    words[syllables].push(word);
                }
            });
        })
    } catch (error) {
        console.error(error.message);
    }
}

function syllable_count(word) {
    word = word.toLowerCase();                                     //word.downcase!
    if(word.length <= 3) { return 1; }                             //return 1 if word.length <= 3
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');   //word.sub!(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '')
    word = word.replace(/^y/, '');                                 //word.sub!(/^y/, '')
    return word.match(/[aeiouy]{1,2}/g).length;                    //word.scan(/[aeiouy]{1,2}/).size
}

fetch_words()
console.log(words);

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
    return result.length > 0 ? result.split(", ") : [];
}

function add_words() {
    fetch_textarea("adjectives").forEach(adjective => {
        adjectives.push(adjective);
    })
    fetch_textarea("adverbs").forEach(adverb => {
        adverbs.push(adverb);
    })
    fetch_textarea("nouns").forEach(noun => {
        nouns.push(noun);
    })
    fetch_textarea("verbs").forEach(verb => {
        verbs.push(verb);
    })
}

Promise.allSettled([fetch_JSON, load_DOM]).then((values) => {
    document.getElementById("article-reload").addEventListener("click", load_words);
    document.getElementById("add-words").addEventListener("click", add_words);
    load_words();
});
