$(document).ready(function () {

    // Array for gif buttons on html

    var terms = ["Bitcoin", "BTC", "Doge Coin", "HODL", "Sell", "Bitcoin Crash", "Dump", "Buy", "Mooning", "To the moon", "Rekt", "Altcoins", "Crypto","Bitcoin is Dead", "Crypto Bubble", "Millionaire", "Bankrupt", "Hacked", "Ethereum", "Hot Wallet", "Hack"];

 
    var newTerm = "";


    // Call function on page load to populate buttons
    function termbuttons() {
        $("#termBtn").empty();
        for (var i = 0; i < terms.length; i++) {

            // create buttons from array and append
            var button = $("<button>").text(terms[i]);
            button.attr("data-terms", terms[i]);
            button.addClass("crypto-btn");

            $("#termBtn").append(button);

            // $("#submitBtn").show();
                // $("#termInput").empty();
            
        }
    }
    termbuttons();

    $("#add-term").on("click", function(event) {
        event.preventDefault();
        var newTerm = $("#term").val().trim();
          terms.push(newTerm);
    termbuttons();
    $('#add-term').empty();
    });

    // create on click functionality for event
    $(document).on("click", ".crypto-btn", function (event) {
        event.preventDefault();
        $("#displayGifs").empty();
        // Set up ajax - query url and call data - set 10 gif response limit
        var term = $(this).attr("data-terms");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + term + "&api_key=Zti4a3t5E28B18AmKHQIalruF6te4HIv&limit=10";



        // Use ajax to call term search
        $.ajax({
                url: queryURL,
                method: 'GET'
            })
            .then(function (response) {
                var results = response.data;
                // Append gif image, create still/animation functionality, add gif rating
                for (i = 0; i < response.data.length; i++) {
                    var gifDiv = $("<div>");
                    var gif = $("<img>").attr("src", results[i].images.fixed_height_still.url);
                    gif.addClass('gifDiv');
                    var gifRating = $("<p>").text("Rating: " + results[i].rating);
                    // create click action
                    gif.attr("data-still", results[i].images.fixed_height_still.url);
                    gif.attr("data-animate", results[i].images.fixed_height.url);
                    gif.attr("data-state", "still");
                    gifDiv.append(gif);
                    gifDiv.append(gifRating);
                    $("#displayGifs").append(gifDiv);
                    // append response data to html
                    // create onclick function for search
                    // run function for search/submit
                }
                
            });
        
            });

    });
    $(document).on("click", ".gifDiv", function() {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
        console.log(state);

});