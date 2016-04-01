
(function(){
    angular
        .module("YoProLivingApp")
        .factory("formService", FormService);

    function FormService($http){

        var service = {
            createForm: createForm,
            findAllForms: findAllForms,
            findFormById: findFormById,
            findFormByTitle: findFormByTitle,
            updateForm: updateForm,
            deleteForm: deleteForm
        };

        return service;

        function createForm(userId, form){
            form._id = (new Date).getTime();
            form.userId = userId;
            return $http.post("/api/experiments/form/", form);
        }

        function findFormById(formId){
            return $http.get("/api/experiments/form/" + formId);
        }

        function findFormByTitle(title){
            var data = {
                title: title
            };
            return $http.post("/api/experiments/title", data);
        }

        function findAllForms(userId){
            return $http.get("/api/experiments/forms/" + userId);
        }

        function deleteForm(formId){
            return $http.delete("/api/experiments/form/" + formId);
        }

        function updateForm(formId, form) {
            return $http.put("/api/experiments/form/" + formId, form);
        }

    }

})();