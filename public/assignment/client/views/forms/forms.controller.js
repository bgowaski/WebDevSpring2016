/**
 * Created by bgowaski on 3/17/16.
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FormsController", FormController);
    FormController.$inject=["$scope","$rootScope","FormsService"];
    function FormController($scope, $rootScope, formService){
        var vm = this;
        vm.form = {};

        vm.addForm = addForm;
        vm.updateForm = updateForm;
        vm.selectForm = selectForm;
        vm.deleteForm = deleteForm;

        console.log($rootScope.currentUser);
        function init() {
            formService
                .findAllForms($rootScope.currentUser._id)
                .then(function (response) {
                    vm.availableForms = response.data;
                });
        }
        init();

        function addForm(){
            formService
                .createForm($rootScope.currentUser._id, vm.form)
                .then(function(response){
                    vm.availableForms.push(response.data);
                    vm.form = null;
                });
        }

        function updateForm(){
            formService
                .updateForm(vm.availableForms[vm.selectedFormIndex]._id, vm.form)
                .then(function(response){
                    vm.availableForms[vm.selectedFormIndex] = response.data;
                    vm.form = null;
                });
        }

        function selectForm(index){
            vm.selectedFormIndex = index;
            vm.form = {
                _id: vm.availableForms[index]._id,
                title: vm.availableForms[index].title,
                userId: vm.availableForms[index].userId
            };
        }

        function deleteForm(index){
            formService
                .deleteForm(vm.availableForms[index]._id)
                .then(function(response){
                    vm.availableForms.splice(index, 1);
                    vm.form = null;
                });

        }

    }

})();