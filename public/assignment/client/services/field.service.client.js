/**
 * Created by bgowaski on 3/17/16.
 */
(function() {
    "use strict";
    angular
        .module('FormBuilderApp')
        .factory("fieldService", FieldService);

    function FieldService($http) {

        var service = {
            getFieldsForForm: getFieldsForForm,
            getFieldForForm: getFieldForForm,
            deleteFieldFromForm: deleteFieldFromForm,
            createFieldForForm: createFieldForForm,
            updateField: updateField,
            reorderFields: reorderFields
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

        function updateField(formId, fieldId, field) {
            return $http.put("/api/assignment/form/" + formId + "/field/" + fieldId, field);
        }
        function reorderFields(formId, fields){
            return $http.post("/api/assignments/form/" + formId + "/field/reorder", fields);
        }
    }
})();