(function(){
    angular
        .module("YoProLivingApp")
        .config(function($routeProvider){
            $routeProvider
                .when("/home", {
                    templateUrl: "views/home/home.view.html",
                    controller: "HomeController",
                    controllerAs: "model",
                    resolve: {
                        loggedin: checkCurrentUser
                    }
                })
                .when("/profile", {
                    templateUrl: "views/users/profile.view.html",
                    controller: "ProfileController",
                    controllerAs: "model",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when("/login", {
                    templateUrl: "views/users/login.view.html",
                    controller: "LoginController",
                    controllerAs: "model"
                })
                .when("/register", {
                    templateUrl: "views/users/register.view.html",
                    controller: "RegisterController",
                    controllerAs: "model"
                })
                .when("/listing", {
                    templateUrl: "views/listing/listing.view.html",
                    controller: "ListingController",
                    controllerAs: "model",
                    resolve: {
                        loggedin: checkCurrentUser
                    }
                })
                .when("/listing/:id", {
                    templateUrl: "views/detail/listing.detail.view.html",
                    controller: "ListingDetailController",
                    controllerAs: "model",
                    resolve: {
                        loggedin: checkCurrentUser
                    }
                })
                .when("/admin", {
                    templateUrl: "views/admin/admin.view.html",
                    controller: "AdminController",
                    controllerAs: "model",
                    resolve: {
                        loggedin: checkAdmin
                    }
                })
                .when("/AdminListing", {
                    templateUrl: "views/admin/admin.listing.view.html",
                    controller: "AdminListingController",
                    controllerAs: "model",
                    resolve: {
                        loggedin: checkCurrentUser
                    }
                })
                .when("/AdminListing/:listingId", {
                    templateUrl: "views/admin/admin.listing.details.view.html",
                    controller: "AdminListingDetailController",
                    controllerAs: "model",
                    resolve: {
                        loggedin: checkCurrentUser
                    }
                })
                .otherwise({
                    redirectTo: "/home"
                });
        });

    var checkAdmin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0' && user.roles.indexOf('admin') != -1)
            {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
            else
            {
                $rootScope.errorMessage = 'Admin Only!';
                deferred.reject();
                $location.url('/home');
            }
        });

        return deferred.promise;
    };


    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
            // User is Not Authenticated
            else
            {
                $rootScope.errorMessage = 'Please Login';
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    };

    var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
            }
            deferred.resolve();
        });

        return deferred.promise;
    };

})();