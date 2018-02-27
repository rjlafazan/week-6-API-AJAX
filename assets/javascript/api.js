searchItemArray = [
  'judo',
  'muay thai',
  'hiking',
  'camping',
  'whiskey',
  'beer'
];

function buttonMake() {
  $('#buttonSpot').empty();

  for (var i = 0; i < searchItemArray.length; i++) {
    searchItemArray[i]
    var a = $('<button>');
    a.addClass('testClass');
    a.attr('data-item', searchItemArray[i]);
    a.text(searchItemArray[i]);
    $('#buttonSpot').append(a);
  };
};
buttonMake();


$(".testClass").on("click", function() {
  var getSearchItem = $(this).attr('data-item')
  console.log(this);

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + getSearchItem + "&api_key=sQRBNLJFYJUqADVUULepENnHFjGwnJtQ&limit=10";


      // AJAX request to grab giphy api data
      $.ajax({
        url: queryURL,
        method: "GET"
      })

      // Use the response from the giphy api to do the following
      .then(function(response) {

        // check to see what the queryURL and response are pulling
        console.log(queryURL);
        console.log(response);

        // store the data from the response as results
        var results = response.data;

        // loop through the result items and creating some tags and grabbing specific results
        for (var i = 0; i < results.length; i++) {

          var gifStuff = $('<div>');

          var p = $('<p>').text('Rating: ' + results[i].rating);

          var gifImage = $('<img>');

          gifImage.attr('src', results[i].images.fixed_height.url);

          gifStuff.append(p);
          gifStuff.append(gifImage);

          $('#images').prepend(gifStuff);

        };


        // for (var i = 0; i < results.length; i++) {

        //   var gifStuff = $('<div>');
        //   gifStuff.addClass('carousel-item');


        //   // var p = $('<p>').text('Rating: ' + results[i].rating);

        //   var gifImage = $('<img>');

        //   gifImage.attr('src', results[i].images.fixed_height.url);
        //   gifImage.addClass('d-block w-100');

        //   // gifStuff.append(p);
        //   gifStuff.append(gifImage);

        //   $('#carousel-images').prepend(gifStuff);

        // };
      
      });
});








