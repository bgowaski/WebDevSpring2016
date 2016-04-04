/**
 * Created by bgowaski on 4/1/16.
 */
module.exports = function(db,mongoose) {
    var fieldSchema = require('./field.schema.server.js')(mongoose);
    var q = require('q');
    var FormModel = mongoose.model('Form');

    var api = {
        findFields: findFields,
        findFieldById: findFieldById,
        deleteField: deleteField,
        createField: createField,
        updateField: updateField,
        reorderFields: reorderFields
    };
    return api;


    function findFields(formId) {
        var deferred = q.defer();

        FormModel.findById(formId, function (error, result) {
            if (error) {
                deferred.reject(error);
            } else {
                var fields = result.fields;
                deferred.resolve(fields);
            }
        });
        return deferred.promise;
    }

    function findFieldById(formId, fieldId) {
        var deferred = q.defer();

        FormModel.findById(formId, function (error, result) {
            if (error) {
                deferred.reject(error);
            } else {
                var field = result.fields.id(fieldId);
                deferred.resolve(field);
            }
        });
        return deferred.promise;
    }

    function deleteField(formId, fieldId) {
        var deferred = q.defer();

        FormModel.findById(formId, function (error, result) {
            if (error) {
                deferred.reject(error);
            } else {
                result.fields.id(fieldId).remove();
                result.save(function(error, result){
                    if (error) {
                        deferred.reject(error);
                    } else {
                        deferred.resolve(result);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function createField(formId, field) {
        var deferred = q.defer();

        FormModel.findById(formId, function (error, result) {
            if (error) {
                deferred.reject(error);
            } else {
                field = addNewField(field);
                result.fields.push(field);
                result.save(function(error, result){
                    if (error) {
                        deferred.reject(error);
                    } else {
                        deferred.resolve(result);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function updateField(formId, fieldId, field) {
        var deferred = q.defer();
        console.log("Reached Model");
        FormModel.findById(formId, function (error, result) {
            if (error) {
                deferred.reject(error);
            } else {
                var formField = result.fields.id(fieldId);
                formField.label = field.label || formField.label;
                formField.type = field.type || formField.type;
                if (formField.type != "DATE") {
                    if (formField.type == "TEXT" || formField.type == "TEXTAREA") {
                        formField.placeholder = field.placeholder || formField.placeholder;
                    }
                    else {
                        formField.options = field.options || formField.options;
                    }
                }
                result.save(function(error, result){
                    if (error) {
                        deferred.reject(error);
                    } else {
                        deferred.resolve(result);
                    }
                });
                deferred.resolve(field);
            }
        });
        return deferred.promise;
    }

    function reorderFields(formId, fields) {
        var deferred = q.defer();

        FormModel.findById(formId, function (error, result) {
            if (err) {
                deferred.reject(err);
            } else {
                result.fields = fields;
                result.save(function(error, result){
                    if (err) {
                        deferred.reject(error);
                    } else {
                        deferred.resolve(result);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function addNewField(field) {
        if (field.type == "Single Line Text Field") {
            field.type = "TEXT";
            field.label = "New Text Field";
            field.placeholder = "New Field";
            return field;
        }
        else if (field.type == "Multi Line Text Field") {
            field.type = "TEXTAREA";
            field.label = "New Text Field";
            field.placeholder = "New Field";
            return field;
        }
        else if (field.type == "Date Field") {
            field.type = "DATE";
            field.label = "New Date Field";
            return field;
        }
        else if (field.type == "Dropdown Field") {
            field.type = "OPTIONS";
            field.label = "New Dropdown";
            field.options = [
                {"label": "Option 1", "value": "OPTION_1"},
                {"label": "Option 2", "value": "OPTION_2"},
                {"label": "Option 3", "value": "OPTION_3"}
            ];
            return field;
        }
        else if (field.type == "Checkboxes Field") {
            field.type = "CHECKBOXES";
            field.label = "New Checkboxes";
            field.options = [
                {"label": "Option A", "value": "OPTION_A"},
                {"label": "Option B", "value": "OPTION_B"},
                {"label": "Option C", "value": "OPTION_C"}
            ];
            return field;
        }
        else if (field.type == "Radio Buttons Field") {
            field.type = "RADIOS";
            field.label = "New Radio Buttons";
            field.options = [
                {"label": "Option X", "value": "OPTION_X"},
                {"label": "Option Y", "value": "OPTION_Y"},
                {"label": "Option Z", "value": "OPTION_Z"}
            ];
            return field;
        }
    }

};