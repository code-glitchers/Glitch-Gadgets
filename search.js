<script>
const links = [
  { 
    title: "HTML a tag",
    description: "Learn about the HTML anchor tag",
    imageUrl: "https://code-glitchers.github.io/Glitch-Gadgets/glitch-gadegts.png",
    url: "https://www.w3schools.com/tags/tag_a.asp"
  },
  { 
    title: "HTML br tag",
    description: "Explore the HTML line break tag",
    imageUrl: "https://code-glitchers.github.io/Glitch-Gadgets/glitch-gadegts.png",
    url: "https://www.w3schools.com/tags/tag_br.asp"
  },
  { 
    title: "CSS background Property",
    description: "Understand the CSS background property",
    imageUrl: "https://code-glitchers.github.io/Glitch-Gadgets/glitch-gadegts.png",
    url: "https://www.w3schools.com/cssref/css3_pr_background.asp"
  },
  // Add more link objects here
];

function showResult(str) {
  const livesearch = document.getElementById("livesearch");
  livesearch.innerHTML = ""; // Clear existing results
  livesearch.style.border = "0px"; // Reset border

  if (str.length === 0) {
    return;
  }

  const matchingLinks = links.filter(link => 
    link.title.toLowerCase().includes(str.toLowerCase()) || 
    link.description.toLowerCase().includes(str.toLowerCase())
  );
  
  if (matchingLinks.length === 0) {
    livesearch.innerHTML = "No suggestions";
    return;
  }

  matchingLinks.forEach(link => {
    const linkContainer = document.createElement("div");
    linkContainer.classList.add("link-container");

    const image = document.createElement("img");
    image.src = link.imageUrl;
    image.alt = link.title;
    image.classList.add("link-image");

    const linkInfo = document.createElement("div");
    linkInfo.innerHTML = `<a href="${link.url}" target="_blank">${link.title}</a><br>${link.description}`;

    linkContainer.appendChild(image);
    linkContainer.appendChild(linkInfo);

    livesearch.appendChild(linkContainer);
  });

  livesearch.style.border = "1px solid #A5ACB2";
}
</script>
