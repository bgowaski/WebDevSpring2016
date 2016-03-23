/**
 * Created by bgowaski on 3/17/16.
 */
module.exports = function(app, formModel) {
    app.get("/api/assignments/form/:formId/field", findFields);
    app.get("/api/assignments/form/:formId/field/:fieldId", findFieldById);
    app.post("/api/assignments/form/:formId/field", createField);
    app.put("/api/assignments/form/:formId/field/:fieldId", updateField);
    app.delete("/api/assignments/form/:formId/field/:fieldId", deleteField);

    function findFields(req, res) {
        var formId = req.params.formId;
        var fields = formModel.findFormFields(formId);
        res.json(fields);
    }

    function findFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = formModel.findFormFieldById(formId, fieldId);
        res.json(field);
    }

    function createField(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        field = formModel.createFormField(formId, field);
        res.json(field);
    }

    function updateField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;
        field = formModel.updateFormField(formId, fieldId, field);
        res.send(field);
    }

    function deleteField(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        formModel.deleteFormField(formId, fieldId);
        res.json(400);
    }


};