ranking-list
=========

A service returning a ranking list in a specific format

## Installation

  bower install ranking-list

## Usage

```js
  angular.module("app", [
    "ranking-list"
  ]);

  angular.module("app").controller("MainCtrl", ['$scope', '$RankingList', function($scope, $RankingList) {
    var res = $RankingList.getRanking(1);
  }]);
```

## Tests

  npm install
  npm test

## Contributing

Take care to maintain the existing coding style.
Add unit tests for any new or changed functionality.

## Release History

* 0.0.1 Initial release