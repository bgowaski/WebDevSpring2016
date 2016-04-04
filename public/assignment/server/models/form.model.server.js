/**
 * Created by bgowaski on 3/17/16.
 */
module.exports = function(db,mongoose) {
    var formSchema = require('./form.schema.server.js')(mongoose);
    var q = require('q');

    var FormModel = mongoose.model('Form', formSchema);

    var api = {
        findAllForms: findAllForms,
        findFormById: findFormById,
        createForm: createForm,
        updateForm: updateForm,
        deleteForm: deleteForm
    };
    return api;

    function findAllForms(userId) {
        var deferred = q.defer();

        FormModel.find({userId: {$eq: userId}}, function (error, result) {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve(result);
            }
        });
        return deferred.promise;
    }


    function findFormById(formId) {
        var deferred = q.defer();

        FormModel.findById(formId, function (error, result) {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve(result);
            }
        });
        return deferred.promise;
    }

    function createForm(form) {
        var deferred = q.defer();

        FormModel.create(form, function (error, result) {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve(result);
            }

        });

        return deferred.promise;
    }

    function updateForm(formId, form) {
        var deferred = q.defer();

        FormModel.update(formId, form, function (error, result) {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve(result);
            }
        });

        return deferred.promise;

    }

    function deleteForm(formId) {
        var deferred = q.defer();

        FormModel.findByIdAndRemove(formId, function (error, result) {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve(result);
            }
        });

        return deferred.promise;
    }

};
