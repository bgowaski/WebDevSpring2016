

module.exports = function(app, formModel) {
    app.post("/api/assignments/form", createForm);
    app.get("/api/assignments/forms/:userId", findAllForms);
    app.get("/api/assignments/form/:id", findFormById);
    app.post("/api/assignments/title", findFormByTitle);
    app.put("/api/assignments/form/:id", updateForm);
    app.delete("/api/assignments/form/:id", deleteForm);

    function createForm(req, res) {
        var form = req.body;
        form = formModel.createForm(form);
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

    function findFormById(req, res) {
        var formId = req.params.id;
        var form = formModel.findFormById(formId);
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
        res.send(200);
    }
};