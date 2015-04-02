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