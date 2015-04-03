app.controller('StatsController', function ($scope, ScoreFactory) {
    // Injection... e.g. ScoreFactory... 
    // Not the function, but what the function returns...
    // Here, a scores object... 

    // linking... "reference"
    // x = {}; x = y x === y >> true
    // x = {}; y = {}; x === y >> false

    $scope.scores = ScoreFactory;

}); 