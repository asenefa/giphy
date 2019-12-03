statusClick = true;
count = 0;
function get (search, offset){
    return new Promise(function(resolve, reject){
        let xhr = new XMLHttpRequest();
        xhr.open('GET', `https://api.giphy.com/v1/gifs/search?api_key=4zFW26G2Sr4PhL9tBd9vnYZvuTP5PvhW&q=${search}&limit=9&offset=${offset}&rating=G&lang=en`, true);
        xhr.addEventListener('load', function(){
            if (xhr.status < 400)
        resolve(xhr.response);
      else
        reject(new Error("Request failed: " + xhr.statusText));
        })
        xhr.send();
    });

};
searhGiphy ('trending');


// createBtn(); // more-btn
$('#search__btn').click(function(){
    let gifSearch =  $('#request').val();
    console.log(gifSearch);

    searhGiphy (gifSearch);

});

$('#request').keypress(function(e){
    if (e.which==13){
        $('#search__btn').click();

    }
})
    

function searhMenu (id) {
    $(id).click(function(){

        searhGiphy ($(id).text());    
    
    });
}

searhMenu ('#reactions');
searhMenu ('#entertainment');
searhMenu ('#sports');
searhMenu ('#animals');
searhMenu ('#psychedelic');



function searhGiphy (request){
    get(request, count )
    .then(function(respone) {
        $('.gif').empty();
        $('.title').remove();
        giphyObj = JSON.parse(respone);
        $('.gif').before($(`<h1>${request} GIFs</h1>`).addClass('title'));    
        render(giphyObj);
        $(".more-btn-hidden").css("visibility", "visible")
    })
    .then(function(){
        console.log("WORKS");
        $('#more').click(function(){
            console.log("CLICKED");
            get(request, count )
            .then(function(respone) {
                giphyObj = JSON.parse(respone);
                render(giphyObj);
            })
        })
        
    })
}


function render(obj){
    obj.data.forEach(element => {
        count++;
        console.log(element.title, element.embed_url);
        $('.gif ').append(template(element));
    });

}


function template (giphy){
    return `
      <div class="col-lg-4">
      <img class="gif__img" src="${giphy.images.fixed_height_downsampled.url}" alt="">
  </div>
   `
}
