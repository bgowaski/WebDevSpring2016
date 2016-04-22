/**
 * Created by bgowaski on 3/17/16.
 */
(function(){

    angular
        .module("FormBuilderApp")
        .factory("formService", FormService);

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
            form.userId = userId;
            return $http.post("/api/assignment/user/", form);
        }

        function findAllForms(userId){
            return $http.get("/api/assignment/forms/" + userId);
        }

        function findFormById(formId){
            return $http.get("/api/assignment/form/" + formId);
        }

        function updateForm(formId, form) {
            return $http.put("/api/assignment/form/" + formId, form);
        }

        function deleteForm(formId){
            return $http.delete("/api/assignment/form/" + formId);
        }
    }
})();