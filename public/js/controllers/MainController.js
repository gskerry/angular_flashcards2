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