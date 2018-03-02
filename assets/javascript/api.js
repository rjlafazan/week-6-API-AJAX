$(document).ready(function() {

  // var config = {
  //   apiKey: "AIzaSyBVNbCKzza-p3o5L0iM0qjkoTFZxKNOxAo",
  //   authDomain: "giphybuttondata.firebaseapp.com",
  //   databaseURL: "https://giphybuttondata.firebaseio.com",
  //   projectId: "giphybuttondata",
  //   storageBucket: "giphybuttondata.appspot.com",
  //   messagingSenderId: "750074347539"
  // };

  // firebase.initializeApp(config);

  // var database = firebase.database();

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

  $('#add-button').on('click', function() {
    event.preventDefault();

    var newArrayItem = $('#makeButtonInput').val().trim();

    searchItemArray.push(newArrayItem);

    buttonMake();

    database.ref().set({
        arrayData: searchItemArray
    });
  });




  $('body').on('click', '.testClass', function() {
    var getSearchItem = $(this).attr('data-item')
    console.log(this);

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + getSearchItem + "&api_key=sQRBNLJFYJUqADVUULepENnHFjGwnJtQ&limit=12";


        // AJAX request to grab giphy api data
        $.ajax({
          url: queryURL,
          method: "GET"
        })

        // Use the response from the giphy api to do the following
        .then(function(response) {
          // clears the image spot when new images are created
          $('#images').empty();

          // check to see what the queryURL and response are pulling
          console.log(queryURL);
          console.log(response);

          // store the data from the response as results
          var results = response.data;

          // loop through the result items and creating some tags and grabbing specific results
          for (var i = 0; i < results.length; i++) {

            var gifStuff = $('<div class="text-center">');

            var gifImage = $('<img class="rounded-circle gifs">');

            var p = $('<p>').text('Rating: ' + results[i].rating);

            gifImage.attr('src', results[i].images.fixed_height.url);

            gifStuff.append(p);
            gifStuff.append(gifImage);

            $('#images').prepend(gifStuff);

          };
        
        });
  });


  // database.ref().on("value", function(snapshot) {
  //     console.log(snapshot.val());
  //     $("#click-value").text(snapshot.val().arrayData);
  //     searchItemArray = snapshot.val().arrayData;
  //   }, function(errorObject) {
  //     console.log("The read failed: " + errorObject.code);
  // });

});









