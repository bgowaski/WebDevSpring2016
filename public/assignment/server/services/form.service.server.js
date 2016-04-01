/**
 * Created by bgowaski on 3/17/16.
 */
module.exports = function(app, formModel) {
    app.get("/api/assignment/form/:id", findFormById);
    app.post("/api/assignment/title", findFormByTitle);
    app.get("/api/assignment/forms/:userId", findAllForms);
    app.post("/api/assignment/user/:userId/form", createForm);
    app.put("/api/assignment/form/:id", updateForm);
    app.delete("/api/assignment/form/:id", deleteForm);

    function findFormById(req, res) {
        var formId = req.params.id;
        var form = formModel.findFormById(formId);
        res.json(form);
    }

    function findFormByTitle(req, res){
        var data = req.body;
        var form = formModel.findFormByTitle(data.title);
        res.json(form);
    }

    function findAllForms(req, res) {
        var userId = req.params.userId;
        var forms = formModel.findAllForms(userId);
        res.json(forms);
    }

    function createForm(req, res) {
        var form = req.body;
        form = formModel.createForm(form);
        res.json(form);
    }

    function updateForm(req, res) {
        var form = req.body;
        var formId = req.params.id;
        form = formModel.updateForm(formId, form);
        res.send(form);
    }

    function deleteForm(req, res) {
        var formId = req.params.id;
        formModel.deleteForm(formId);
        res.send(400);
    }
};