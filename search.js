<script>
function showResult(str) {
  if (str.length === 0) {
    document.getElementById("livesearch").innerHTML = "";
    document.getElementById("livesearch").style.border = "0px";
    return;
  }

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      displayResults(this.responseXML, str);
    }
  };
  xhttp.open("GET", "products.xml", true);
  xhttp.send();
}

function displayResults(xml, searchStr) {
  var livesearchDiv = document.getElementById("livesearch");
  livesearchDiv.innerHTML = "";

  var products = xml.getElementsByTagName("product");
  for (var i = 0; i < products.length; i++) {
    var title = products[i].getElementsByTagName("title")[0].childNodes[0].nodeValue;
    var description = products[i].getElementsByTagName("description")[0].childNodes[0].nodeValue;
    var image = products[i].getElementsByTagName("image")[0].childNodes[0].nodeValue;

    if (title.toLowerCase().includes(searchStr.toLowerCase())) {
      var resultItem = document.createElement("div");
      resultItem.className = "result-item";

      var imgElement = document.createElement("img");
      imgElement.src = image;
      imgElement.alt = title;

      var titleElement = document.createElement("h3");
      titleElement.textContent = title;

      var descriptionElement = document.createElement("p");
      descriptionElement.textContent = description;

      resultItem.appendChild(imgElement);
      resultItem.appendChild(titleElement);
      resultItem.appendChild(descriptionElement);

      livesearchDiv.appendChild(resultItem);
    }
  }

  if (livesearchDiv.innerHTML === "") {
    livesearchDiv.innerHTML = "No results found.";
  }
}
</script>
