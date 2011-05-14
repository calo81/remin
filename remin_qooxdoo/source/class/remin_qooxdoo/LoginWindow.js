qx.Class.define("remin_qooxdoo.LoginWindow",
{
    extend : qx.ui.window.Window,
    construct : function() {
        this.base(arguments, "Login")
        this.setShowMaximize(false);
        this.setShowMinimize(false);
        this.setResizable(false);
        this.setWidth(200);
        this.setHeight(135);
        var layout = new qx.ui.layout.Grid(0, 0);
        this.setLayout(layout);
        this.moveTo(250, 130);
        this.addForm();
        this.DEBUG = true;
    },

    events :
    {
        "userLogged" : "qx.event.type.Event"
    },

    members:{
        addForm:function() {
            var form = new qx.ui.form.Form();
            var text = new qx.ui.form.TextField();
            text.setRequired(true);
            form.add(text, "Username", null, "username");
            var password = new qx.ui.form.PasswordField();
            password.setRequired(true);
            form.add(password, "Password", null, "password");
            var loginbutton = new qx.ui.form.Button("Login");
            form.addButton(loginbutton);
            var registerbutton = new qx.ui.form.Button("Register");
            form.addButton(registerbutton);
            var formRender = new qx.ui.form.renderer.Single(form);
            this.add(formRender, {row:0,column:0});

            var controller = new qx.data.controller.Form(null, form);
            var model = controller.createModel();

            var errorLabel = new qx.ui.basic.Label("");
            this.add(errorLabel, {row:1,column:0});
            var theWindow = this;

            loginbutton.addListener("execute", function() {
                if (form.validate()) {
                    var req = new qx.io.remote.Request("login", "POST", "application/json");
                    req.setData(qx.util.Serializer.toJson(controller.getModel()));
                    req.setAsynchronous(false);
                    req.setCrossDomain(false);
                    req.setProhibitCaching("no-url-params-on-post");
                    req.setRequestHeader("Content-Type", "application/json");
                    req.addListener("completed", function(response) {
                        if (response.getContent().error !== undefined) {
                            errorLabel.setValue(response.getContent().error);
                        } else {
                            theWindow.fireEvent("userLogged");
                        }
                    });
                    req.send();
                }
            }, this);

            registerbutton.addListener("execute", function() {
                if (form.validate()) {
                    var req = new qx.io.remote.Request("registration", "POST", "application/json");
                    req.setData(qx.util.Serializer.toJson(controller.getModel()));
                    req.setAsynchronous(false);
                    req.setCrossDomain(false);
                    req.setProhibitCaching("no-url-params-on-post");
                    req.setRequestHeader("Content-Type", "application/json");
                    req.addListener("completed", function(response) {
                        if (response.getContent().error !== undefined) {
                            errorLabel.setValue(response.getContent().error);
                        } else {
                            theWindow.fireEvent("userLogged");
                        }
                    });
                    req.send();
                }
            }, this);
        }
    }
});