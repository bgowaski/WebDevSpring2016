/**
 * Created by bgowaski on 3/17/16.
 */
module.exports = function(app, formModel) {
    app.get("/api/YoProLiving/form/:id", findFormById);
    app.get("/api/YoProLiving/forms/:userId", findAllForms);
    app.post("/api/YoProLiving/user/:userId/form", createForm);
    app.put("/api/YoProLiving/form/:id", updateForm);
    app.delete("/api/YoProLiving/form/:id", deleteForm);

    function findFormById(req, res) {
        var formId = req.params.id;
        formModel.findFormById(formId)
            .then(
                function (result) {
                    res.json(result);
                },
                function (error) {
                    res.status(400).send(error);
                }
            );
    }

    function findAllForms(req, res) {
        var userId = req.params.userId;
        formModel.findAllForms(userId)
            .then(
                function (result) {
                    res.json(result);
                },
                function (error) {
                    res.status(400).send(error);
                }
            );
    }

    function createForm(req, res) {
        var form = req.body;
        console.log("Create New Form");
        console.log(req.body);
        formModel.createForm(form)
            .then(
                function (result) {
                    res.json(result);
                },
                function (error) {
                    res.status(400).send(error);
                }
            );
    }

    function updateForm(req, res) {
        var form = req.body;
        var formId = req.params.id;
        formModel.updateForm(formId, form)
            .then(
                function (result) {
                    formModel.findFormById(formId)
                        .then(
                            function (result) {
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

    function deleteForm(req, res) {
        var formId = req.params.id;
        formModel.deleteForm(formId)
            .then(
                function (result) {
                    res.json(result);
                },
                function (error) {
                    res.status(400).send(error);
                }
            );
    }
};