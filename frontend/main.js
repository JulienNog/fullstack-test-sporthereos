angular.module('app', [])
.factory('RankingList', function ($http) {
    var RankingList = {};

    RankingList.getRanking = function(rankingId) {
        var ranking = [],
            userIds = "",
            users = [];

        return $http.get('/ranking/' + rankingId)
        .then(function successCallback (response) {
            //success callback for GET /ranking/:id
            ranking = response.data;
            userIds += ranking[0].user;
            for (var i = 1; i < ranking.length; i++) {
                userIds += "," + ranking[i].user;
            }
            //can make http requests GET /users
            return $http.get('/users?ids=' + userIds);
        }, function errorCallback (response) {
            //error callback
            return {code: -1, message: "Failed to get ranking with id="+rankingId};
        })
        .then(function successCallback (response) {
            //success callback for GET /users?ids=...
            var userId,
                user;

            users = response.data;

            var findUser = function (user) {
                return user.id === userId;
            }

            for (var i = 0; i < ranking.length; i++) {
                userId = ranking[i].user;
                user = users.find(findUser);
                ranking[i].firstName = user.firstName;
                ranking[i].lastName = user.lastName;
                delete ranking[i].user;
            }

            return ranking;
        }, function errorCallback (response) {
            //error callback
            return {code: -2, message: "Failed to get users with ids="+userIds};
        });
    }

    return RankingList;
});