var app = angular.module('flashCards', []);

// ****************
// (Sort of) Callback Approach
// ****************

/*
app.factory('FlashCardsFactory', function ($http) {
    return {
        getFlashCards: function (cb) {
            // JSON (http://localhost:4567/cards)
            return $http.get('/cards')
                .then(function(response){
                    // console.log(response.data);
                    cb(response.data);
                });
        }
    };
});

app.controller('MainController', function ($scope, FlashCardsFactory) { 

    // What Factory is sending...
    // console.log(FlashCardsFactory.getFlashCards);
    // console.log(FlashCardsFactory.getFlashCards());

    var something = function(arg){
        // console.log("I'm LOGGED",arg);
        $scope.flashCards = arg        
        console.log("LOOK OVER HERE!!!!",$scope.flashCards);
    };

    FlashCardsFactory.getFlashCards(something)    

});
*/


// ******************
// Promises Approach
// ******************

/*app.factory('FlashCardsFactory', function ($http) {
    return {
        getFlashCards: function () {
            // JSON (http://localhost:4567/cards)
            return $http.get('/cards')
                .then(function(response){
                    // console.log(response.data);
                    return response.data;
                });
        }
    };
});*/

app.factory('FlashCardsFactory', function ($http) {
    return {
        getFlashCards: function (category) {
            
            var queryParams = {};

            if(category){
                queryParams.category = category
            } 
            return $http.get('/cards', {
                params : queryParams
            })
            .then(function(response){
                // console.log(response.data);
                return response.data;
            });
            
        }
    };
});

app.factory('ScoreFactory', function () {

        return {
            correct: 0,
            incorrect: 0
        };

});


app.controller('MainController', function ($scope, FlashCardsFactory, ScoreFactory) { 
    // What Factory is sending...
    // console.log(FlashCardsFactory.getFlashCards);
    // console.log(FlashCardsFactory.getFlashCards());

    // !! Seems redundant... defined in getCategory
    FlashCardsFactory.getFlashCards().then(
        function(arg){
            $scope.flashCards = arg
            console.log($scope.flashCards);
        }
    )

    $scope.categories = [
        'MongoDB',
        'Express',
        'Angular',
        'Node',
        null
    ];

    $scope.getCategoryCards = function(category){
        FlashCardsFactory.getFlashCards(category).then(
        function(arg){
            $scope.flashCards = arg
            console.log($scope.flashCards);
        })

        $scope.status = category;
        // pulls from the angular object? 
        // does read from the button pushed (on some level)
        // gets picked up by digest re-run...
    }

    $scope.answerQuestion = function (answer, flashCard) {
        if (!flashCard.answered) {
            flashCard.answered = true;
            flashCard.answeredCorrectly = answer.correct;
            if(flashCard.answeredCorrectly === true){
                ScoreFactory.correct += 1;
            } else {
                ScoreFactory.incorrect += 1;
            }
        }
    }

}); // End MainController


app.controller('StatsController', function ($scope, ScoreFactory) {
    $scope.scores = ScoreFactory;

}); 







