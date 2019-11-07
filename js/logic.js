statusClick = true;

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

// get('quiz')
//     .then(function(text) {
//         console.log(JSON.parse(text));
// });

$('<div ></div>').attr('class', 'card-columns').appendTo('.container');

$('#search').click(function(){
    let gifSearch =  $('#searchVal').val();
    console.log(gifSearch);

    get(gifSearch, 0 )
        .then(function(respone) {
            giphyObj = JSON.parse(respone);
            console.log(giphyObj);
            giphyObj.data.forEach(element => {
                console.log(element.title, element.embed_url);
                $('.card-columns ').append(template(element));
            });
           
        })
        .then(function(){
             
            if(statusClick === true){
                createBtn();
                statusClick = !statusClick;
            }
            $('#more').click(function(){
                get(gifSearch, 10 )
                .then(function(respone) {
                    giphyObj = JSON.parse(respone);
                    console.log(giphyObj);
                    giphyObj.data.forEach(element => {
                        console.log(element.title, element.embed_url);
                        $('.card-columns ').append(template(element));
                    });
                   
                })

                
            })
            
        })

});





function template (giphy){
    return `<div class="card bg-light">
      <div class="card-body text-center">
        <p class="card-text">${giphy.title}</p>
        <a href="${giphy.embed_url}">${giphy.embed_url}</a>
      </div>
   `
}

function createBtn(){
    $('<button>More</button>').attr({
        'type':'button',
        'class':'btn btn-dark ',
        'id': 'more'
    }).appendTo('.container');
}