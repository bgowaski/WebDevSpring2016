/**
 * Created by bgowaski on 3/17/16.
 */
(function() {
    "use strict";
    angular
        .module('FormBuilderApp')
        .factory("FieldService", FieldService);

    function FieldService($http) {

        var service = {
            createFieldForForm: createFieldForForm,
            getFieldsForForm: getFieldsForForm,
            getFieldForForm: getFieldForForm,
            deleteFieldFromForm: deleteFieldFromForm,
            moveField: moveField,
            updateField: updateField,
            updateAllFields: updateAllFields
        };
        return service;

        function createFieldForForm(formId, field) {
            return $http.post("/api/assignment/form/" + formId + "/field", field);
        }

        function getFieldsForForm(formId) {
            return $http.get("/api/assignment/form/" + formId + "/field/");
        }

        function getFieldForForm(formId, fieldId) {
            return $http.get("/api/assignment/form/" + formId + "/field/" + fieldId);
        }

        function deleteFieldFromForm(formId, fieldId) {
            return $http.delete("/api/assignment/form/" + formId + "/field/" + fieldId);
        }

        function moveField(formId, fieldId, direction){
            return $http.post("/api/assignment/form/" + formId + "/field/" + fieldId + "/move", direction);
        }

        function updateField(formId, fieldId, field) {
            return $http.put("/api/assignment/form/" + formId + "/field/" + fieldId, field);
        }

        function updateAllFields(formId, fields) {
            return $http.put("/api/assignment/form/" + formId + "/field", fields);
        }
    }
})();