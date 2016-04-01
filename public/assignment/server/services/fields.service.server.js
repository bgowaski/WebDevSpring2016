/**
 * Created by bgowaski on 3/17/16.
 */
module.exports = function(app, formModel) {
    app.get("/api/assignment/form/:formId/field", getFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldById);
    app.post("/api/assignment/form/:formId/field", createField);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateField);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteField);
    app.post("/api/assignment/form/:formId/field/:fieldId/move", moveField);

    function getFieldsForForm(req, res) {
        var formId = req.params.formId;
        var fields = formModel.findFormFields(formId);
        res.json(fields);
    }

    function getFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = formModel.findFieldById(formId, fieldId);
        res.json(field);
    }

    function createField(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        field = formModel.createField(formId, field);
        res.json(field);
    }

    function updateField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;
        field = formModel.updateField(formId, fieldId, field);
        res.send(field);
    }

    function moveField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var direction = req.body;
        var fields = formModel.moveField(formId, fieldId, direction);
        res.send(fields);
    }

    function deleteField(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        formModel.deleteField(formId, fieldId);
        res.json(400);
    }


};