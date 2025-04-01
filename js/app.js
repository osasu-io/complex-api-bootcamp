function fetchPokemon() {
    const name = document.getElementById("pokeInput").value.toLowerCase();

    fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`)
        .then(res => {
            if (!res.ok) throw new Error("Pokémon not found.");
            return res.json();
        })
        .then(data => {
            const entry = data.flavor_text_entries.find(e => e.language.name === "en");
            const originalDesc = entry.flavor_text.replace(/\n|\f/g, " ");

            return fetch("https://api.funtranslations.com/translate/shakespeare.json", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({ text: originalDesc })
            }).then(res => res.json())
              .then(translation => ({
                  original: originalDesc,
                  translated: translation.contents.translated
              }));
        })
        .then(result => {
            document.getElementById("original").textContent = result.original;
            document.getElementById("translated").textContent = result.translated;
        })
        .catch(err => {
            console.error(err);
            alert("Error fetching or translating Pokémon data.");
        });
}
