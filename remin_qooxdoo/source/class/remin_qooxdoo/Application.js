/* ************************************************************************

 Copyright:

 License:

 Authors:

 ************************************************************************ */

/* ************************************************************************

 #asset(remin_qooxdoo/*)

 ************************************************************************ */

/**
 * This is the main application class of your custom application "remin_qooxdoo"
 */
qx.Class.define("remin_qooxdoo.Application",
{
    extend : qx.application.Standalone,



    /*
     *****************************************************************************
     MEMBERS
     *****************************************************************************
     */

    members :
    {
        /**
         * This method contains the initial application code and gets called
         * during startup of the application
         *
         * @lint ignoreDeprecated(alert)
         */
        main : function() {
            // Call super class
            this.base(arguments);

            // Enable logging in debug variant
            if (qx.core.Environment.get("qx.debug")) {
                // support native logging capabilities, e.g. Firebug for Firefox
                qx.log.appender.Native;
                // support additional cross-browser console. Press F7 to toggle visibility
                qx.log.appender.Console;
            }
            var main = new remin_qooxdoo.MainWindow();
            var login = new remin_qooxdoo.LoginWindow();

            var root = this.getRoot();

            login.addListener("userLogged", function() {
                alert("sx");
                main.openAndFetchDocuments();
                login.destroy();
            });
            root.add(login);

            login.open();

        }
    }
});
