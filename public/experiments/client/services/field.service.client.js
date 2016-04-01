
(function(){
    angular
        .module("YoProLivingApp")
        .factory("fieldService", FieldService);

    function FieldService($http){

        var service = {
            getFieldsForForm: getFieldsForForm,
            getFieldForForm: getFieldForForm,
            deleteFieldFromForm: deleteFieldFromForm,
            createFieldForForm: createFieldForForm,
            updateField: updateField,
            moveField: moveField
        };

        return service;

        function getFieldsForForm(formId){
           return $http.get("/api/experiments/form/" + formId + "/field/");
        }

        function getFieldForForm(formId, fieldId){
            return $http.get("/api/experiments/form/" + formId + "/field/" + fieldId);
        }

        function deleteFieldFromForm(formId, fieldId){
            return $http.delete("/api/experiments/form/" + formId + "/field/" + fieldId);
        }

        function createFieldForForm(formId, field){
            return $http.post("/api/experiments/form/" + formId + "/field", field);
        }

        function updateField(formId, fieldId, field){
            return $http.put("/api/experiments/form/" + formId + "/field/" + fieldId, field);
        }

        function moveField(formId, fieldId, direction){
            return $http.post("/api/experiments/form/" + formId + "/field/" + fieldId + "/move", direction);
        }
    }

})();