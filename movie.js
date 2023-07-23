var movies_display= document.getElementById('movies_list')
var search=document.getElementById('search')
var pagination = document.getElementById("pagination")
movies_list(1)
/*Fetching Data from OMDB API*/
async function movies_list(pagenumber){
    if(search.value=='')
    {
     const result = await fetch(`http://www.omdbapi.com/?s=har&page=${pagenumber}&apikey=9a374ba9`);
     const data = await result.json(); 
     Movies(data.Search);   
    }
    else
    {
        const result = await fetch(`http://www.omdbapi.com/?s=${search.value}&page=${pagenumber}&apikey=9a374ba9`);
        const data = await result.json(); 
        Movies(data.Search);   
    }
}

/*Displaying Movies*/

let Movies=(item)=>{
    movies_display.innerHTML=''
    for(var i=0;i<item.length;i++)
    {
        each_movie_item = document.createElement('div')
        each_movie_item.classList.add('each_movie')
        each_movie_item.innerHTML = `<div  class="movie_poster">
                                     <img src=${item[i].Poster} >
                                     </div>
                                     <div class="movie_name">${item[i].Title}</div>`
        movies_display.append(each_movie_item)
    }       
}


/*Previous Page navigation*/

let prev=()=> {
    let page_text = pagination.innerText
    let pagenum = Number(page_text)
    movies_list(pagenum-1);
    if (pagenum === 2) {
        pagination.innerHTML = `${pagenum-1}<a onclick="next()">
        <i class="fa fa-angle-double-right"></i>
        </a>`
    } 
    else{
        pagination.innerHTML = `<a onclick="prev()">
        <i class="fa fa-angle-double-left"></i></a>
    ${pagenum-1}<a onclick="next()">
    <i class="fa fa-angle-double-right"></i>
    </a>`
    }
}

/*Next Page Navigation*/

let next =()=>{
    let page_text = pagination.innerText
    let pagenum = Number(page_text)
    movies_list( pagenum+1)
    pagination.innerHTML = `<a onclick="prev()">
    <i class="fa fa-angle-double-left"></i></a>
    ${pagenum + 1}<a onclick="next()">
    <i class="fa fa-angle-double-right"></i></a>`
}

async function search_movie(pagenumber){
    if(search.value=='')
    {
        movies_list(1)
    }
    const result = await fetch(`http://www.omdbapi.com/?s=${search.value}&apikey=9a374ba9`);
    const data = await result.json();
    if(data.Search!==undefined)
    Movies(data.Search);
}
