document.querySelector("form").addEventListener("submit", event => {
    event.preventDefault();

    let textarea = document.querySelector("textarea");
    // Split text by zero or more non-words followed by one or more whitespace characters
    let words = textarea.value.trim().split(/\W*\s+/);
    if (words.length === 1 && words[0] === "") words = [];

    document.getElementById("num").value = words.length;
    // If the array is not empty, find the longest word and get length of it
    document.getElementById("max").value = words.length && words.reduce((a, b) => a.length > b.length ? a : b).length;

    // If the array is not empty, find the shortest word and get length of it
    document.getElementById("min").value = words.length && words.reduce((a, b) => a.length > b.length ? b : a).length;
    // Get sum of words' length divided by their quantity, if the array is not empty
    document.getElementById("avg").value = words.length && (words.reduce((a, b) => a + b.length, 0) / words.length).toFixed(2);
});