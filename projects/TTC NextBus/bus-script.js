$(document).ready(function() {
    setInterval(clock, 1000);
});

function clock() {
    var now = new Date();

    $(".clock").html(now.toLocaleString('en-US', {hour:'numeric', minute:'numeric', hour12:true}));
}

var ttcModule = angular.module("ttc-app", []);
ttcModule.controller("ttc-controller", function($scope, $interval) {
    $scope.busPredictionList = [];
    $scope.pinnedBusList = [];
    var busStopList = {};

    $scope.init = function() {
        if (typeof localStorage !== 'undefined') {
            if (localStorage.pinned) {
                $scope.pinnedBusList = JSON.parse(localStorage.pinned);
            }
        }  

        for (var b in $scope.pinnedBusList) {
            $scope.refreshBus($scope.pinnedBusList[b]);
        }
    }

    $interval(function() {
        for (var b in $scope.pinnedBusList) {
            $scope.refreshBus($scope.pinnedBusList[b]);
        }
    }, 10000);

    $(".route-search").focus(function () {
        getBusRoutes();
    });

    $(".route-search").focusout(function () {
        $('#bus-route-list').html("");
    });

    $(".stop-search").focus(function () {
        var search = $('.route-search').val();
        if (search.length > 0) {
            getBusStops(search);
        }
    });
    
    $(".stop-search").focusout(function () {
        $('#bus-stop-list').html("");
    });

    function getBusRoutes() {
        var nextBusAPIbusRoute = "http://webservices.nextbus.com/service/publicJSONFeed?command=routeList&a=ttc";
        var busRouteList = {};
    
        $.getJSON(nextBusAPIbusRoute, function(data) {
            $.each(data.route, function(key, value) {
                busRouteList[value.tag] = value.title;
             });
             displayBusRoutes(busRouteList);
        });
    }
    
    function displayBusRoutes(busRouteList) {
        var list;
        for (var route in busRouteList) {
            list += ('<option value="' + busRouteList[route] + '"></option>');
        }
        $('#bus-route-list').html(list);
    }
    
    function getBusStops(search) {
        var dashIndex = search.indexOf("-");
        if (dashIndex != -1) {
            search = search.substring(0,dashIndex);
        }
    
        var nextBusAPIbusStops = "http://webservices.nextbus.com/service/publicJSONFeed?command=routeConfig&a=ttc&r=" + search;
        busStopList = {};
    
        $.getJSON(nextBusAPIbusStops, function(data) {
            if (data.route != null) {
                $.each(data.route.stop, function(key, value) {
                    busStopList[value.tag] = value.title;
                });
                displayBusStops(busStopList);
            }
        });
    }
    
    function displayBusStops(busStopList) {
        var list;   
        for (var stop in busStopList) {
            list += ('<option value="' + stop + "-" + busStopList[stop] + '"></option>');
        }
        $('#bus-stop-list').html(list); 
    }

    $scope.refreshBus = function(bus) {
        var nextBusAPI = "http://webservices.nextbus.com/service/publicJSONFeed?command=predictions&a=ttc&r=" + bus.routeNo + "&s=" + bus.stopNo;   
        
        $.getJSON(nextBusAPI, function(data) {   
            var stopPredictionList = [];

            if (!$.isArray(data.predictions.direction)) {
                data.predictions.direction = [data.predictions.direction];
            }
            $.each(data.predictions.direction, function(key, value) {
                if (value != null) {
                    var time = [];
                    
                    if (!$.isArray(value.prediction)) {
                        value.prediction = [value.prediction];
                    }
                    $.each (value.prediction, function(keyB, valueB) {
                        var info = ": ~" + Math.floor(valueB.seconds/60) + "min " + valueB.seconds%60 + "sec";
                        time.push({letter:valueB.branch, time:info});
                    });

                    stopPredictionList.push({direction:value.title, nextBus:time});
                }
            });

            for (var i=0; i<$scope.busPredictionList.length; i++) {
                if (bus === $scope.busPredictionList[i]) {
                    $scope.busPredictionList[i].stopList = stopPredictionList;
                    $scope.$apply();
                }
            }
            for (var i=0; i<$scope.pinnedBusList.length; i++) {
                if (bus === $scope.pinnedBusList[i]) {
                    $scope.pinnedBusList[i].stopList = stopPredictionList;
                    if (typeof localStorage !== 'undefined') {
                        localStorage.setItem("pinned", JSON.stringify($scope.pinnedBusList));
                    }  
                    $scope.$apply();
                }
            }
        });
    }

    $scope.addBus = function() {
        if ($scope.routeID == null || $scope.stopID == null) {
            setMessage("Please select a route and/or stop from the list.");
            return;
        }
        
        var route = $scope.routeID;
        var stop = $scope.stopID;

        var routeDash = route.indexOf("-");
        var stopDash = stop.indexOf("-");

        if (routeDash != -1) {
            route = route.substring(0,routeDash);
        }
        if (stopDash != -1) {
            stop = stop.substring(0,stopDash);
        }

        var nextBusAPI = "http://webservices.nextbus.com/service/publicJSONFeed?command=predictions&a=ttc&r=" + route + "&s=" + stop;   
    
        $.getJSON(nextBusAPI, function(data) {
            if (data.predictions == null) {
                setMessage("Invalid route and/or stop. Please try again.");
                return;
            }

            var routeTitle = data.predictions.routeTitle;
            var stopTitle = data.predictions.stopTitle;

            var stopPredictionList = [];

            if (!$.isArray(data.predictions.direction)) {
                data.predictions.direction = [data.predictions.direction];
            }
            $.each(data.predictions.direction, function(key, value) {
                if (value != null) {
                    var timeList = [];

                    if (!$.isArray(value.prediction)) {
                        value.prediction = [value.prediction];
                    }
                    $.each (value.prediction, function(keyB, valueB) {
                        var info = ": ~" + Math.floor(valueB.seconds/60) + "min " + valueB.seconds%60 + "sec";
                        timeList.push({letter:valueB.branch, time:info});
                    });

                    stopPredictionList.push({direction:value.title, nextBus:timeList});
                }
            });

            $scope.busPredictionList.push({routeNo:route, routeDesc:routeTitle, stopNo:stop, stopDesc:stopTitle, stopList:stopPredictionList});
            $scope.$apply();
        }); 
    }

    $scope.removeBus = function(bus) {
        for (var i=0; i<$scope.busPredictionList.length; i++) {
            if (bus === $scope.busPredictionList[i]) {
                $scope.busPredictionList.splice(i,1);
            }
        }
    }

    $scope.removeBusPinned = function(bus) {
        for (var i=0; i<$scope.pinnedBusList.length; i++) {
            if (bus === $scope.pinnedBusList[i]) {
                $scope.pinnedBusList.splice(i,1);
            }
        }
        
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem("pinned", JSON.stringify($scope.pinnedBusList));
        }  
    }
    
    $scope.pinBus = function(bus) {
        $scope.pinnedBusList.push(bus);
        $scope.removeBus(bus);
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem("pinned", JSON.stringify($scope.pinnedBusList));
        }  
    }

    $scope.unpinBus = function(bus) {
        $scope.busPredictionList.push(bus);
        $scope.removeBusPinned(bus);
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem("pinned", JSON.stringify($scope.pinnedBusList));
        }  
    }

    function setMessage(text) {
        $('#messages').css('display','block');
        $('.message-text').html(text);
        setTimeout($scope.hideMessage, 10000);
    }

    $scope.hideMessage = function() {
        $('#messages').css('display','none');
        $('.message-text').html();
    }
});