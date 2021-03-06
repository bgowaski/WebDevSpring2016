/**
 * Created by bgowaski on 3/17/16.
 */
(function() {
    "use strict";
    angular
        .module('YoProLivingApp')
        .factory("FieldService", FieldService);

    function FieldService($http) {

        var service = {
            createFieldForForm: createFieldForForm,
            getFieldsForForm: getFieldsForForm,
            getFieldForForm: getFieldForForm,
            deleteFieldFromForm: deleteFieldFromForm,
            updateField: updateField,
            updateAllFields: updateAllFields,
            reorderFields: reorderFields
        };
        return service;

        function createFieldForForm(formId, field) {
            return $http.post("/api/YoProLiving/form/" + formId + "/field", field);
        }

        function getFieldsForForm(formId) {
            return $http.get("/api/YoProLiving/form/" + formId + "/field/");
        }

        function getFieldForForm(formId, fieldId) {
            console.log('Field id: ', fieldId);
            return $http.get("/api/YoProLiving/form/" + formId + "/field/" + fieldId);
        }

        function deleteFieldFromForm(formId, fieldId) {
            return $http.delete("/api/YoProLiving/form/" + formId + "/field/" + fieldId);
        }


        function updateField(formId, fieldId, field) {
            return $http.put("/api/YoProLiving/form/" + formId + "/field/" + fieldId, field);
        }

        function updateAllFields(formId, fields) {
            return $http.put("/api/YoProLiving/form/" + formId + "/field", fields);
        }

        function reorderFields(formId, fields){
            return $http.post("/api/YoProLiving/form/" + formId + "/field/reorder", fields);
        }
    }
})();