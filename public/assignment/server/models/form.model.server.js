/**
 * Created by bgowaski on 3/17/16.
 */
var forms = require('./form.mock.json');
module.exports = function() {
    var api = {
        findAllForms: findAllForms,
        findFormByTitle: findFormByTitle,
        findFormById: findFormById,
        createForm: createForm,
        updateForm: updateForm,
        deleteForm: deleteForm,
        findFields: findFields,
        findFieldById: findFieldById,
        createField: createField,
        updateField: updateField,
        deleteField: deleteField,
        moveFormField: moveFormField,
        addNewField: addNewField
    };
    return api;

    function findAllForms(userId) {
        var result = [];
        for (var x in forms) {
            if (forms[x].userId == userId) {
                result.push(forms[x]);
            }
        }
        return result;
    }

    function findFormByTitle(title) {
        for (var x in forms) {
            if (forms[x].title == title) {
                return forms[x];
            }
        }
        return null;
    }

    function findFormById(formId) {
        for (var x in forms) {
            if (forms[x]._id == formId) {
                return forms[x];
            }
        }
        return null;
    }

    function createForm(form) {
        form._id = (new Date()).getTime();
        form.fields = [];
        forms.push(form);
        return form;
    }

    function updateForm(formId, form) {
        for (var x in forms) {
            if (forms[x]._id == formId) {
                forms[x].title = form.title || forms[x].title;
                forms[x].userId = form.userId || forms[x].userId;
                return forms[x];
            }
        }
        return null;
    }

    function deleteForm(formId) {
        for (var x in forms) {
            if (forms[x]._id == formId) {
                forms.splice(x, 1);
            }
        }
    }

    function findFields(formId) {
        for (var x in forms) {
            if (forms[x]._id == formId) {
                return forms[x].fields;
            }
        }
        return null;
    }

    function findFieldById(formId, fieldId) {
        for (var x in forms) {
            if (forms[x]._id == formId) {
                for (var y in forms[x].fields) {
                    if (forms[x].fields[y]._id == fieldId) {
                        return forms[x].fields[y];
                    }
                }
            }
        }
        return null;
    }

    function createField(formId, field) {
        for (var x in forms) {
            if (forms[x]._id == formId) {
                field._id = (new Date()).getTime();
                field = addNewField(field);
                forms[x].fields.push(field);
                return field;
            }
        }
        return null;
    }

    function updateField(formId, fieldId, field) {
        for (var x in forms) {
            if (forms[x]._id == formId) {
                for (var y in forms[x].fields) {
                    if (forms[x].fields[y]._id == fieldId) {
                        forms[x].fields[y].label = field.label || forms[x].fields[y].label;
                        forms[x].fields[y].type = field.type || forms[x].fields[y].type;
                        if (forms[x].fields[y].type != "DATE") {
                            if (forms[x].fields[y].type == "TEXT" || forms[x].fields[y].type == "TEXTAREA") {
                                forms[x].fields[y].placeholder = field.placeholder || forms[x].fields[y].placeholder;
                            }
                            else {
                                forms[x].fields[y].options = field.options || forms[x].fields[y].options;
                            }
                        }
                        return forms[x].fields[y];
                    }
                }
            }
        }
        return null;
    }

    function deleteField(formId, fieldId) {
        for (var x in forms) {
            if (forms[x]._id == formId) {
                for (var y in forms[x].fields) {
                    if (forms[x].fields[y]._id == fieldId) {
                        forms[x].fields.splice(y, 1);
                        break;
                    }
                }
            }
        }
    }


    function moveFormField(formId, fieldId, direction){
        for(var x in forms){
            if(forms[x]._id == formId){
                for(var y in forms[x].fields){
                    if(forms[x].fields[y]._id == fieldId){
                        if (direction.direction == "UP"){
                            var newIndex = parseInt(y) - 1;
                        }
                        else {
                            var newIndex = parseInt(y) + 1;
                        }
                        if (newIndex >= forms[x].fields.length || newIndex < 0) {
                            return null;
                        }
                        forms[x].fields.splice(newIndex, 0, forms[x].fields.splice(y, 1)[0]);
                        return forms[x].fields;

                    }
                }
            }
        }
        return null;
    }

    function addNewField(field){
        console.log("Reached Here");
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
        else if (field.type == "Date Field"){
            field.type = "DATE";
            field.label = "New Date Field";
            return field;
        }
        else if (field.type == "Dropdown Field"){
            field.type = "OPTIONS";
            field.label = "New Dropdown";
            field.options = [
                {"label": "Option 1", "value": "OPTION_1"},
                {"label": "Option 2", "value": "OPTION_2"},
                {"label": "Option 3", "value": "OPTION_3"}
            ];
            return field;
        }
        else if (field.type == "Checkboxes Field"){
            field.type = "CHECKBOXES";
            field.label = "New Checkboxes";
            field.options = [
                {"label": "Option A", "value": "OPTION_A"},
                {"label": "Option B", "value": "OPTION_B"},
                {"label": "Option C", "value": "OPTION_C"}
            ];
            return field;
        }
        else if (field.type == "Radio Buttons Field"){
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
