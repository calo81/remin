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
        this.addForm();


    },
    events :
    {
        "documentAdded" : "qx.event.type.Event"
    },
    members:{
        addForm:function() {
            var form = new qx.ui.form.Form();
            var text = new qx.ui.form.TextField();
            text.setRequired(true);
            form.add(text, "Category", null, "category");
            var password = new qx.ui.form.PasswordField();
            password.setRequired(true);
            form.add(password, "Name", null, "name");
            var description = new qx.ui.form.TextArea();
            form.add(description, "Description", null, "description");
            var loginbutton = new qx.ui.form.Button("Save");
            form.addButton(loginbutton);
            var formRender = new qx.ui.form.renderer.Single(form);
            this.add(formRender, {row:0,column:0});

            var controller = new qx.data.controller.Form(null, form);
            var model = controller.createModel();

            var errorLabel = new qx.ui.basic.Label("");
            this.add(errorLabel, {row:1,column:0});
            var theWindow = this;

            loginbutton.addListener("execute", function() {
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