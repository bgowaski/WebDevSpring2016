(function(){
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($location, UserService){
        var vm = this;

        vm.currentUser = null;
        vm.users = [];
        vm.error = null;
        vm.sort = {
            username: {
                active: false,
                down: true
            },
            first: {
                active: false,
                down: true
            },
            last: {
                active: false,
                down: true
            }
        };
        vm.add    = add;
        vm.select = select;
        vm.update = update;
        vm.remove = remove;
        vm.sortByUsername = sortByUsername;
        vm.sortByFirst = sortByFirst;
        vm.sortByLast = sortByLast;

        function init(){
            UserService
                .findAllUsers()
                .then(successAction, errorAction);
        }
        init();

        function add(user) {
            UserService
                .createUser(user)
                .then(successAction, errorAction);
        }

        function select(user) {
            vm.currentUser = angular.copy(user);
            delete vm.currentUser.password;
        }

        function update(user) {
            UserService
                .updateUserAdmin(user._id, user)
                .then(successAction, errorAction);
        }

        function remove(user) {
            UserService
                .deleteUser(user._id)
                .then(successAction, errorAction);
        }

        function successAction(response) {
            vm.users = response.data;
            vm.users = rolesToString(vm.users);
            vm.currentUser = null;
        }

        function errorAction(err) {
            vm.error = err;
        }

        function rolesToString(users) {
            for (var i in users) {
                var rolesString = "";
                for(var x in users[i].roles){
                    {x == 0 ? rolesString += users[i].roles[x] : rolesString += "," + users[i].roles[x]}
                }
                users[i].roles = rolesString;
            }
            return users;
        }


        function sortByUsername() {
            deactivateFilters();
            vm.sort.username.active = true;
            vm.users = sortUsers(vm.users, "username", vm.sort.username.down);
            {vm.sort.username.down ? vm.sort.username.down = false : vm.sort.username.down = true}
        }

        function sortByFirst() {
            deactivateFilters();
            vm.sort.first.active = true;
            vm.users = sortUsers(vm.users, "firstName", vm.sort.first.down);
            {vm.sort.first.down ? vm.sort.first.down = false : vm.sort.first.down = true}
        }

        function sortByLast() {
            deactivateFilters();
            vm.sort.last.active = true;
            vm.users = sortUsers(vm.users, "lastName", vm.sort.last.down);
            {vm.sort.last.down ? vm.sort.last.down = false : vm.sort.last.down = true}
        }

        function deactivateFilters(){
            vm.sort.username.active = false;
            vm.sort.first.active = false;
            vm.sort.last.active = false;
        }

        function sortUsers(users, field, down) {
            return users.sort(function(a, b){
                if(a[field] < b[field]) return down ? -1 : 1;
                if(a[field] > b[field]) return down ? 1 : -1;
                return 0;
            });
        }


    }

})();;