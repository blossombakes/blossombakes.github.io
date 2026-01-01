async function loadData(url, containerId, type) {
  const res = await fetch(url);
  const data = await res.json();
  const container = document.getElementById(containerId);

  data.forEach(item => {
    const card = document.createElement('article');
    card.className = 'card';
    if (type !== 'paid') {
      card.tabIndex = 0; // make focusable for keyboard users
    }

    // create inner content
    const imgWrap = document.createElement('div');
    imgWrap.className = 'card-media';
    imgWrap.innerHTML = `<img src="${item.image}" alt="${item.title}">`;

    const body = document.createElement('div');
    body.className = 'card-body';
    body.innerHTML = `
      <div class="card-badge">${item.title}</div>
      <p class="card-desc">${item.description}</p>
    `;

    card.appendChild(imgWrap);
    card.appendChild(body);

    // navigate to detail page when clicked or when Enter pressed (only for free recipes)
    if (type === 'free') {
      card.classList.add('clickable');
      const goToDetail = () => {
        const slug = item.slug || encodeURIComponent(item.title.toLowerCase().replace(/[^a-z0-9]+/g,'-'));
        window.location.href = `free-recipe.html?slug=${slug}`;
      };
      card.addEventListener('click', goToDetail);
      card.addEventListener('keydown', (e) => { if (e.key === 'Enter') goToDetail(); });
    }

    container.appendChild(card);
  });
}

if (document.getElementById("freeRecipes")) {
  loadData("data/free-recipes.json", "freeRecipes", "free");
}
if (document.getElementById("paidRecipes")) {
  loadData("data/paid-recipes.json", "paidRecipes", "paid");
}
if (document.getElementById("classes")) {
  loadData("data/classes.json", "classes");
}
