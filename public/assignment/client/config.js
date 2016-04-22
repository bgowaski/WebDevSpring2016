/**
 * Created by bgowaski on 3/17/16.
 */
(function () {
    angular
        .module("FormBuilderApp")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })
            .when("/register", {
                templateUrl: "./views/users/register.view.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "./views/users/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/profile", {
                templateUrl: "./views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
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
            .when("/forms", {
                templateUrl: "./views/forms/forms.view.html",
                controller: "FormsController",
                controllerAs: "model"
            })
            .when("/form/:formId/fields", {
                templateUrl: "views/forms/field.view.html",
                controller: "FieldController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }

        var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
        {
            var deferred = $q.defer();

            $http.get('/api/assignment/loggedin').success(function(user)
            {
                $rootScope.errorMessage = null;
                if (user !== '0')
                {
                    $rootScope.currentUser = user;
                    deferred.resolve();
                }
                else
                {
                    $rootScope.errorMessage = 'Please Login';
                    deferred.reject();
                    $location.url('/login');
                }
            });

            return deferred.promise;
        };

        var checkAdmin = function($q, $timeout, $http, $location, $rootScope)
        {
            var deferred = $q.defer();

            $http.get('/api/assignment/loggedin').success(function(user)
            {
                $rootScope.errorMessage = null;
                if (user !== '0' && user.roles.indexOf('admin') != -1)
                {
                    $rootScope.currentUser = user;
                    deferred.resolve();
                }
            });

            return deferred.promise;
        };

        var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope)
        {
            var deferred = $q.defer();

            $http.get('/api/assignment/loggedin').success(function(user)
            {
                $rootScope.errorMessage = null;
                if (user !== '0')
                {
                    $rootScope.currentUser = user;
                }
                deferred.resolve();
            });

            return deferred.promise;
        };

})();