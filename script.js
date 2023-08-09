const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

searchInput.addEventListener('input', function() {
  const query = searchInput.value;

  if (query.trim() === '') {
    searchResults.innerHTML = '';
    return;
  }

  const xhr = new XMLHttpRequest();
  xhr.open('GET', `http://cubex.atwebpages.com/github/glich-gadgets/search.php?q=${query}`, true);

  xhr.onload = function() {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      displayResults(response);
    }
  };

  xhr.send();
});

function displayResults(results) {
  let output = '';
  results.forEach(result => {
    output += `<div class="result">${result}</div>`;
  });
  searchResults.innerHTML = output;
}
