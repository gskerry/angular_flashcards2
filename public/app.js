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


app.controller('MainController', function ($scope, FlashCardsFactory) { 
    // What Factory is sending...
    // console.log(FlashCardsFactory.getFlashCards);
    // console.log(FlashCardsFactory.getFlashCards());

    FlashCardsFactory.getFlashCards().then(
        function(arg){
            $scope.flashCards = arg
            console.log($scope.flashCards);
        }
    )

    $scope.getCategoryCards = function(category){
        FlashCardsFactory.getFlashCards(category).then(
        function(arg){
            $scope.flashCards = arg
            console.log($scope.flashCards);
        })
    }

    $scope.categories = [
        'MongoDB',
        'Express',
        'Angular',
        'Node',
        null
    ];

});









