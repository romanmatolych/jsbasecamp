document.querySelector("form").addEventListener("submit", event => {
    event.preventDefault();

    let textarea = document.querySelector("textarea");
    // Split text by zero or more non-words followed by one or more whitespace characters
    let words = textarea.value.trim().split(/\W*\s+/);

    document.getElementById("num").value = words.length;
    // Find longest word and get length of it
    document.getElementById("max").value = words.reduce((a, b) => a.length > b.length ? a : b).length;
    // Find shortest word and get length of it
    document.getElementById("min").value = words.reduce((a, b) => a.length < b.length ? a : b).length;
    // Sum of words' length divided by their quantity
    document.getElementById("avg").value = (words.reduce((a, b) => a + b.length, 0) / words.length).toFixed(2);
});