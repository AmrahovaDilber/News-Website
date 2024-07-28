const categoriesContainer=document.querySelector("#categoriesContainer")

async function getCategories() {
    const res = await fetch(`https://all-api.bitcode.az/api/news/category`)
    const data = await res.json()
    createCategories(data)
    console.log(data)
}
getCategories()

function createCategories(data) {
    categoriesContainer.innerHTML=""
    data.forEach((item) => {
        categoriesContainer.innerHTML +=`
        <li class="flex items-center space-x-5 mb-6 pl-8">
                    <div class="w-6 h-6">
                        <img class="object-cover" src="./assets/images/${item.slug}.svg" alt="Globe" />
                    </div>
                    <a href="#" class="font-normal text-[15px] text-[#072D4B]">${item.name}</a>
                </li>`
})
   
}
