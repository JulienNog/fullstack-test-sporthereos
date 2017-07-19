describe('ranking-list:', function() {
    var $httpBackend, getRankingRequestHandler, getUsersRequestHandler, res, RankingList;

    // Set up the module
    beforeEach(module('app'));

    beforeEach(inject(function($injector, _RankingList_) {
    RankingList = _RankingList_;
    // Set up the mock http service responses
    $httpBackend = $injector.get('$httpBackend');
    // backend definition common for all tests
    getRankingRequestHandler = $httpBackend.when('GET', '/ranking/1')
                            .respond([
                                {position:1,user:1234,score:100},
                                {position:2,user:12341234,score:97},
                                {position:3,user:1089,score:78},
                                {position:4,user:567,score:54},
                                {position:5,user:18736,score:32}
                            ]);

    getUsersRequestHandler = $httpBackend.when('GET', '/users?ids=1234,12341234,1089,567,18736')
                            .respond([
                                {id:1234,score:100,firstName:'UserA',lastName:'Alan'},
                                {id:567,score:54,firstName:'UserB',lastName:'Bobby'},
                                {id:18736,score:32,firstName:'UserC',lastName:'Cedric'},
                                {id:1089,score:78,firstName:'UserD',lastName:'Dominic'},
                                {id:12341234,score:97,firstName:'UserE',lastName:'Erwan'}
                            ]);
    }));


    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('RankingList should exist', function() {
        expect(RankingList).toBeDefined();
    });

    it('RankingList.getRanking should exist', function() {
        expect(RankingList.getRanking).toBeDefined();
    });


    it('RankingList.getRanking should returned valid result', function () {
        RankingList.getRanking(1).then(function (response) {
            res = response;
        });
        $httpBackend.flush();
        expect(res).toEqual([
                            {position:1,score:100,firstName:'UserA',lastName:'Alan'},
                            {position:2,score:97,firstName:'UserE',lastName:'Erwan'},
                            {position:3,score:78,firstName:'UserD',lastName:'Dominic'},
                            {position:4,score:54,firstName:'UserB',lastName:'Bobby'},
                            {position:5,score:32,firstName:'UserC',lastName:'Cedric'}
                        ]);
    });
});