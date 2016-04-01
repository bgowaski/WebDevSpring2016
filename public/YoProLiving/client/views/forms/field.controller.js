/**
 * Created by bgowaski on 3/17/16.
 */
(function(){
    "use strict";
    angular
        .module("YoProLivingApp")
        .controller("FieldController", FieldController);
FieldController.$inject=["$routeParams","FieldService","FormsService"];
    function FieldController($routeParams,
                             fieldService,
                             formService) {
        var vm = this;
        vm.form = {};
        vm.formId = $routeParams.formId;
        vm.fieldType = "Single Line Text Field";
        vm.fieldEditor = false;
        vm.popupTitle = null;
        vm.typeArray = [
            "All",
            "Single Line Text",
            "Multi Line Text",
            "Date",
            "Dropdown",
            "Checkboxes",
            "Radio Buttons"];
        vm.selection = vm.typeArray[0];
        vm.addField = addField;
        vm.editField = editField;
        vm.moveFieldUp = moveFieldUp;
        vm.moveFieldDown = moveFieldDown;
        vm.updateField = updateFieldType;
        vm.removeField = removeField;
        vm.closePopup = closePopup;
        vm.applyChanges = applyChanges;

        function init(){
            formService
                .findFormById(vm.formId)
                .then(function(response){
                    vm.form = response.data;
                });
        }
        init();

        function addField(fieldType){
            fieldService
                .createFieldForForm(vm.formId, {type: fieldType})
                .then(function(response){
                    if (response.data){
                        vm.form.fields.push(response.data);
                    }
                    else {
                        console.log("INCORRECT RESPONSE!");
                    }
                });
        }

        function editField(fieldId){
            fieldService
                .getFieldForForm(vm.formId, fieldId)
                .then(function(response){
                    if(response.data){
                        vm.selectedField = response.data;
                        vm.fieldEditor = true;
                        switch(vm.selectedField.type){
                            case "TEXT": vm.popupTitle = "Single Line Field"; break;
                            case "TEXTAREA": vm.popupTitle = "Multi Line Field"; break;
                            case "DATE":  vm.popupTitle = "Date Field"; break;
                            case "OPTIONS":  vm.popupTitle = "Dropdown Field"; break;
                            case "CHECKBOXES":  vm.popupTitle = "Checkbox Field"; break;
                            case "RADIOS":  vm.popupTitle = "Radio Button Field"; break;
                        }
                        if (vm.selectedField.options) {
                            vm.selectedField.optionsPretty = "";
                            for (var x in vm.selectedField.options) {
                                vm.selectedField.optionsPretty +=
                                    vm.selectedField.options[x].label + ":" +
                                    vm.selectedField.options[x].value + "\n";
                            }
                        }
                    }
                    else {
                        console.log("INCORRECT RESPONSE!");
                    }
                });
        }

        function moveFieldUp(fieldId){
            fieldService
                .moveField(vm.formId, fieldId, {direction: "UP"})
                .then(function(response){
                    if (response.data){
                        vm.form.fields = response.data;
                    }
                    else {
                        console.log("INCORRECT RESPONSE!");
                    }
                });
        }

        function moveFieldDown(fieldId){
            fieldService
                .moveField(vm.formId, fieldId, {direction: "DOWN"})
                .then(function(response){
                    if (response.data){
                        vm.form.fields = response.data;
                    }
                    else {
                        console.log("INCORRECT RESPONSE!");
                    }
                });
        }

        function updateFieldType(fieldType){
            vm.fieldType = fieldType;
        }



        function closePopup(){
            vm.fieldEditor = false;
            vm.selectedField = null;
            vm.popupTitle = null;
        }

        function removeField(fieldId){
            fieldService
                .deleteFieldFromForm(vm.formId, fieldId)
                .then(function(response){
                    if (response.data){
                        for (var x in vm.form.fields) {
                            if (vm.form.fields[x]._id == fieldId){
                                vm.form.fields.splice(x,1);
                                break;
                            }
                        }
                    }
                    else {
                        console.log("INCORRECT RESPONSE!");
                    }
                });
        }
        function applyChanges(field){
            if (field.optionsPretty){
                var newOptions = [];
                var optionsLines = field.optionsPretty.split("\n");
                for (var x in optionsLines){
                    if (optionsLines[x].length > 0) {
                        var newOption = {
                            label: optionsLines[x].split(":")[0],
                            value: optionsLines[x].split(":")[1]
                        };
                        newOptions.push(newOption);
                    }
                }
                field.options = newOptions;
            }
            fieldService
                .updateField(vm.formId, field._id, field)
                .then(function(response){
                    if(response.data){
                        for (var x in vm.form.fields) {
                            if (vm.form.fields[x]._id == response.data._id){
                                vm.form.fields[x] = response.data;
                                break;
                            }
                        }
                        vm.fieldEditor = false;
                        vm.selectedField = null;
                        vm.popupTitle = null;
                    }
                    else {
                        console.log("INCORRECT RESPONSE!");
                    }
                });
        }
    }
})();