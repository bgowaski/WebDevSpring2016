/**
 * Created by bgowaski on 3/17/16.
 */
(function(){
    'use strict';

    angular
        .module("YoProLivingApp")
        .factory("FormsService", FormService);

    function FormService($http){

        var service = {
            createForm: createForm,
            findAllForms: findAllForms,
            findFormById: findFormById,
            updateForm: updateForm,
            deleteForm: deleteForm
        };
        return service;

        function createForm(userId, form){
            return $http.post("/api/YoProLiving/user/" + userId + "/form", form);
        }

        function findAllForms(userId){
            return $http.get("/api/YoProLiving/forms/" + userId);
        }

        function findFormById(formId){
            return $http.get("/api/YoProLiving/form/" + formId);
        }

        function updateForm(formId, form) {
            return $http.put("/api/YoProLiving/form/" + formId, form);
        }

        function deleteForm(formId){
            return $http.delete("/api/YoProLiving/form/" + formId);
        }
    }
})();