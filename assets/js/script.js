const categoriesContainer = document.querySelector("#categoriesContainer");
const newsContainer = document.querySelector("#newsContainer");
const showMoreBtn = document.querySelector("#showMore");
let page = 1;
let currentCategory = '';

// Function for fetching categories
async function getCategories() {
  const res = await fetch(`https://all-api.bitcode.az/api/news/category`);
  const data = await res.json();
  createCategories(data);
  console.log(data);
}
getCategories();

// Function for creating categories UI
function createCategories(data) {
  categoriesContainer.innerHTML = "";
  data.forEach((item) => {
    categoriesContainer.innerHTML += `
      <li class="flex items-center space-x-5 mb-6 pl-8" data-slug="${item.slug}" ">
        <div class="w-6 h-6">
          <img class="object-cover" src="./assets/images/${item.slug}.svg" alt="${item.name}" />
        </div>
        <a href="#" class="font-normal text-[15px] text-[#072D4B]">${item.name}</a>
      </li>`;
  });

  // Add event listeners after the category elements are created
  document.querySelectorAll("#categoriesContainer li").forEach((element) => {
    element.addEventListener("click", handleClickCategory);
  });
}

// Function to handle category click
function handleClickCategory(e) {
  e.preventDefault();
  currentCategory = this.getAttribute('data-slug');
  page = 1;
  newsContainer.innerHTML = "";
  fetchNews();
}

function formatDate(dateString) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

// Function for fetching news
async function fetchNews() {
  const categoryFilter = currentCategory ? `&category=${currentCategory}` : '';
  const res = await fetch(`https://all-api.bitcode.az/api/news?page=${page}${categoryFilter}`);
  const data = await res.json();
  createNews(data.data);
  console.log(data.data);
}
fetchNews();

// Function for creating news UI
function createNews(data) {
  data.forEach((news) => {
    newsContainer.innerHTML += `
      <div class="bg-[#FFFFFF] p-4 rounded-[4px] flex flex-col justify-between min-h-[130px]">
        <div class="flex space-x-[18px]">
          <div class="flex flex-col w-[179px]">
            <h2 class="text-[17px] font-medium text-[#072D4B] mb-[9px]">
              ${news.title}
            </h2>
            <p class="text-[14px] font-normal text-[#6a8193] w-[179px] h-[60px] overflow-hidden text-ellipsis">
              ${news.description}
            </p>
          </div>
          <figure class="aspect-[1/1] rounded-[4px] bg-gray-100">
            <img src=${news.photo} alt="${news.title}" class="size-full object-cover rounded-[4px]" />
          </figure>
        </div>

        <div class="flex justify-between items-center mt-4">
          <p class="font-normal text-[12px] text-[#9cabb7]">${news.category.slug}</p>
          <p class="whitespace-nowrap overflow-hidden text-ellipsis font-normal text-[12px] text-[#9cabb7]">
            ${formatDate(news.published_date)}
          </p>
          <div class="flex space-x-[8px] items-center">
            <figure class="size-[16px]">
              <img src="./assets/images/share.svg" class="object-cover" />
            </figure>
            <p class="font-normal text-[12px] text-[#0768b5]">Share</p>
          </div>
          <div class="flex space-x-[8px] items-center">
            <figure class="size-[16px]">
              <img src="./assets/images/pocket.svg" class="object-cover" />
            </figure>
            <p class="font-normal text-[12px] text-[#0768b5]">
              Read Later
            </p>
          </div>
        </div>
      </div>
    `;
  });
}

// Updating the event listener to fetch and append more news
showMoreBtn.addEventListener("click", async () => {
  page++;
  await fetchNews(); // Fetch and append new news
});
