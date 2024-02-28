const accesskey="i7xsQA6iBh0fHUkCrTELvF2MNdJNFtSPTFcdLZl5wZY";

const formEl=document.querySelector("form")
const inputEl=document.getElementById("search-input")
const searchresults=document.querySelector(".image-conatiner")
const moreBtn=document.getElementById("show-more-btn")

let inputData=""
let page=1;

async function searchImage(){
    inputData=inputEl.value;

    const url=`https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accesskey}`
    
    const response=await fetch(url);
    const data=await response.json();

    const results=data.results;


    if(page===1){
        searchresults.innerHTML="";
    }

    results.map((x)=>{
        const imageWrapper=document.createElement('div');
        imageWrapper.classList.add("card");
        const image=document.createElement('img');
        image.src=x.urls.small;
        image.alt=x.alt_description;
        const imageLink=document.createElement('a');
        imageLink.href=x.links.html;
        imageLink.target="_blank";
        imageLink.textContent=x.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchresults.appendChild(imageWrapper);
    })
      page++;
      if(page>1){
        moreBtn.style.display="block";
      }
      
    
}

formEl.addEventListener("submit",(event)=>{
    event.preventDefault();
    page=1;
    searchImage();
  })
  moreBtn.addEventListener("click",()=>{
   
    searchImage();
  })