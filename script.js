const accessKey = "QnZo5Px-L1D_Ltnk8-46mltgLvmcDSbwfbr6MTV-whk";

const web_name = document.getElementById("name");
const circleVault =document.getElementById("circle-vault");
const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const search_btn = document.getElementById("search");
const showMorebtn = document.getElementById("show-more-btn");
const start_btn = document.getElementById("start");

let keyword = "";
let page = 1;

async function searchImages(){
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=18`;

    const response = await fetch(url);
    const data = await response.json();

    if(page === 1){
        searchResult.innerHTML = "";
    }

    // console.log(data)
    const results = data.results;

    results.map((result) => {
        //for the image to flip
        let isFlipped = false; 
        const polaroid = document.createElement("div"); //polaroid
        polaroid.className = "polaroid";  //polaroid
        const image = document.createElement("img");
        image.src = result.urls.small;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";

        imageLink.appendChild(image);
        polaroid.appendChild(imageLink); //ataches pic to polaroid
        searchResult.appendChild(polaroid); // attaches polaroid img

        const caption = document.createElement("div");
        caption.className = "polaroid-caption";
        caption.textContent = result.alt_description || "No Caption";
        //to flip!
        polaroid.addEventListener("click", () => {
            if(!isFlipped){
            polaroid.style.transition = "transform 0.6s ease"
            polaroid.style.transformStyle = "preserve-3d";
            polaroid.style.transform = "rotateY(180deg)";

            setTimeout(() => {
                    image.style.transition = "opacity 0.2s ease";
                    image.style.opacity = "0";
                    polaroid.appendChild(caption);
                    caption.style.display = "block";
                }, 100); 
            } else {
                polaroid.style.transition = "transform 0.6s ease"
                polaroid.style.transformStyle = "preserve-3d";
                polaroid.style.transform = "rotateY(0deg)";
                caption.style.display = "none";
                setTimeout(() => {
                    image.style.transition = "opacity 0.2s ease";
                    image.style.opacity = "1";
                }, 300);
            }
            isFlipped = !isFlipped;
        })
    })
    showMorebtn.style.display = "block";
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
    //move top left
    web_name.style.display = "flex";
    web_name.style.float = "left";
    web_name.style.marginTop = "15px";
    web_name.style.marginLeft = "20px";
    web_name.style.fontSize = "2.5em";
    web_name.style.transition = "all 1s ease";
    //circle vault
    circleVault.style.display = "flex";
    circleVault.style.float = "left";
    circleVault.style.width = "5%";
    circleVault.style.marginTop = "5px";
    circleVault.style.marginLeft = "2px";
    circleVault.style.transition = "all 1s ease";
    // move to top right
    searchForm.style.display = "flex";
    searchForm.style.float = "right";
    searchForm.style.width = "30%";
    searchForm.style.height = "30px";
    searchForm.style.marginTop = "10px";
    searchForm.style.marginRight = "5%";
    searchBox.style.display = "block";
    search_btn.style.display = "block";
    searchForm.style.transition = "all 1s ease";
});

showMorebtn.addEventListener("click", ()=>{
    page++;
    searchImages();
});
//when u press the vault img
start_btn.addEventListener("click", () => {
    start_btn.style.display = "none";
    searchForm.style.display = "flex";
    searchBox.style.display = "block";
    search_btn.style.display = "block";
});