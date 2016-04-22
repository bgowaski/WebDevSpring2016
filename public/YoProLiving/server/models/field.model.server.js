/**
 * Created by bgowaski on 4/1/16.
 */
module.exports = function(mongoose) {
    var fieldSchema = require('./field.schema.server.js')(mongoose);
    var q = require('q');
    var FormModel = mongoose.model('Listing');

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
            field.label = "My Listing";
            field.placeholder = "New Field";
            return field;
        }
        else if (field.type == "Multi Line Text Field") {
            field.type = "TEXTAREA";
            field.label = "About My Listing";
            field.placeholder = "New Field";
            return field;
        }
        else if (field.type == "Date Field") {
            field.type = "DATE";
            field.label = "Move in Date";
            return field;
        }
        else if (field.type == "Dropdown Field") {
            field.type = "OPTIONS";
            field.label = "Number of Bedrooms";
            field.options = [
                {"label": "1 br", "value": "OPTION_1"},
                {"label": "2 br", "value": "OPTION_2"},
                {"label": "3 br", "value": "OPTION_3"},
                {"label": "4 br", "value": "OPTION_3"}

            ];
            return field;
        }
        else if (field.type == "Checkboxes Field") {
            field.type = "CHECKBOXES";
            field.label = "Utilities Included";
            field.options = [
                {"label": "Hot Water/Heat", "value": "OPTION_A"},
                {"label": "Electricity", "value": "OPTION_B"},
                {"label": "Water", "value": "OPTION_C"},
                {"label": "Cable/Internet", "value": "OPTION_D"}

            ];
            return field;
        }
        else if (field.type == "Radio Buttons Field") {
            field.type = "RADIOS";
            field.label = "Pets Allowed";
            field.options = [
                {"label": "None", "value": "OPTION_X"},
                {"label": "Cats Only", "value": "OPTION_X"},
                {"label": "Cats and Dogs", "value": "OPTION_Y"},
                {"label": "Any", "value": "OPTION_Z"}
            ];
            return field;
        }
    }

};