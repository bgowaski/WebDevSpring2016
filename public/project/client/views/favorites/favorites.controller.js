(function()
{
    angular
        .module("YoProLivingApp")
        .controller("FavoritesController", ['UserService', '$location', '$rootScope', FavoritesController]);

    function FavoritesController(UserService, $location, $rootScope)
    {
        var vm = this;
        vm.selectItem = selectItem;

        function init(){
            vm.$location = $location;
            vm.user = $rootScope.currentUser;
        }
        return init();

        function selectItem(item){
            return{
                $location:path('/listing/' + item.id)
            }
        }
    }
})();