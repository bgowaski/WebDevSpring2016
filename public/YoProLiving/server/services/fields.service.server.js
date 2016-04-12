/**
 * Created by bgowaski on 3/17/16.
 */
module.exports = function(app, fieldModel) {
    app.get("/api/assignment/form/:formId/field", findFields);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldById);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteField);
    app.post("/api/assignment/form/:formId/field", createField);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateField);
    app.post("/api/assignment/form/:formId/field/reorder", reorderFields);


    function findFields(req, res) {
        var formId = req.params.formId;
        fieldModel.findFields(formId)
            .then(
                function (result) {
                    res.json(result);
                },
                function (error) {
                    res.status(400).send(error);
                }
            );

    }

    function findFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        fieldModel.findFieldById(formId, fieldId)
            .then(
                function (result) {
                    res.json(result);
                },
                function (error) {
                    res.status(400).send(error);
                }
            );
    }

    function deleteField(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        fieldModel.deleteField(formId, fieldId)
            .then(
                function (result) {
                    res.json(result);
                },
                function (error) {
                    res.status(400).send(error);
                }
            );
    }


    function createField(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        fieldModel.createField(formId, field)
            .then(
                function (result) {
                    var fields = result.fields;
                    res.json(fields);
                },
                function (error) {
                    res.status(400).send(error);
                }
            );
    }

    function updateField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;
        console.log("Form ID : " + formId);
        console.log("Field ID : " + fieldId);
        console.log(field);
        fieldModel.updateField(formId, fieldId, field)
            .then(
                function (result){
                    fieldModel.findFieldById(formId, fieldId)
                        .then(
                            function (result) {
                                console.log("Result on success");
                                console.log(result);
                                res.json(result);
                            },
                            function (error) {
                                res.status(400).send(error);
                            }
                        );
                },
                function (error) {
                    res.status(400).send(error);
                }
            );
    }

    function reorderFields(req, res) {
        var formId = req.params.formId;
        var fields = req.body;
        fieldModel.reorderFields(formId, fields)
            .then(
                function (result) {
                    var fields = result.fields;
                    res.json(fields);
                },
                function (error) {
                    res.status(400).send(error);
                }
            );
    }

};