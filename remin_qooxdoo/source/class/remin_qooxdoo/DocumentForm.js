qx.Class.define("remin_qooxdoo.DocumentForm",
{
    extend : qx.ui.window.Window,
    construct : function() {
        this.base(arguments, "remin")
        this.setShowMaximize(false);
        this.setShowMinimize(false);
        this.setResizable(false);
        this.setWidth(800);
        this.setHeight(500);
        this.setModal(true);
        var layout = new qx.ui.layout.Grid(0, 0);
        this.setLayout(layout);
        this.moveTo(250, 130);
        this.setDocNameField(new qx.ui.form.TextField());
        this.setDescriptionField(new qx.ui.form.TextArea());
        this.setCategoryField(new qx.ui.form.TextField());
        this.addForm();
    },
    events :
    {
        "documentAdded" : "qx.event.type.Event"
    },

    properties : {
        docNameField : {},
        descriptionField:{},
        categoryField:{}
    },

    members:{
        openWithData:function(data) {
            this.getDocNameField().setValue(data.name);
            this.getCategoryField().setValue(data.category);
            this.getDescriptionField().setValue(data.descriptionx);
            this.open();
        },

        addForm:function() {
            var form = new qx.ui.form.Form();
            var cat = this.getCategoryField();
            cat.setRequired(true);
            form.add(cat, "Category", null, "category");
            var docName = this.getDocNameField();
            docName.setRequired(true);
            form.add(docName, "Name", null, "name");
            var description = this.getDescriptionField();
            form.add(description, "Description", null, "descriptionx");
            var saveButton = new qx.ui.form.Button("Save");
            form.addButton(saveButton);
            var formRender = new qx.ui.form.renderer.Single(form);
            this.add(formRender, {row:0,column:0});

            var controller = new qx.data.controller.Form(null, form);
            var model = controller.createModel();

            var errorLabel = new qx.ui.basic.Label("");
            this.add(errorLabel, {row:1,column:0});
            var theWindow = this;


            saveButton.addListener("execute", function() {
                if (form.validate()) {
                    var req = new qx.io.remote.Request("document", "POST", "application/json");
                    req.setData(qx.util.Serializer.toJson(controller.getModel()));
                    req.setAsynchronous(false);
                    req.setCrossDomain(false);
                    req.setProhibitCaching("no-url-params-on-post");
                    req.setRequestHeader("Content-Type", "application/json");
                    req.addListener("completed", function(response) {
                        if (response.getContent().error !== undefined) {
                            errorLabel.setValue(response.getContent().error);
                        } else {
                            theWindow.fireEvent("documentAdded");
                            theWindow.close();
                        }
                    });
                    req.send();
                }
            }, this);
        }
    }
});