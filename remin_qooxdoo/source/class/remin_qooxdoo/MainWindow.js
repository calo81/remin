qx.Class.define("remin_qooxdoo.MainWindow",
{
    extend : qx.ui.window.Window,
    construct : function() {
        this.base(arguments, "remin")
        this.setShowClose(false);
        this.setShowMaximize(false);
        this.setShowMinimize(false);
        this.setMovable(false);
        this.setResizable(false);
        this.setWidth(1300);
        this.setHeight(600);
        this.add(this.getMenuButton(), {row:0,column:0});
        var layout = new qx.ui.layout.Grid(0, 0);
        this.setLayout(layout);
        layout.setColumnWidth(1, 600);
        var collectionTree = new qx.ui.tree.Tree();
        collectionTree.setWidth(500);
        collectionTree.setHeight(400);
        this.add(collectionTree, {row:1,column:0,colSpan: 2,rowSpan:2});
        var treeRoot = new qx.ui.tree.TreeFolder("Collections");
        collectionTree.setRoot(treeRoot);
        treeRoot.setOpen(true);
        this.tree = collectionTree;

    },

    events :
    {
        "addNewDocument" : "qx.event.type.Event",
        "editDocument" : "qx.event.type.Data",
        "requestLogout" : "qx.event.type.Event"
    },
    

    members:{
        tree:{},
        addNewDocument:function(){
          this.fireEvent("addNewDocument");
        },

         requestLogout:function(){
          this.fireEvent("requestLogout");
        },

        getMenuButton : function() {
            var toolbar = new qx.ui.toolbar.ToolBar;
            toolbar.setWidth(600);
            var basicPart = new qx.ui.toolbar.Part;
            toolbar.add(basicPart);
            var newButton = new qx.ui.toolbar.Button("New", "icon/16/actions/document-new.png", this.__newCommand);
            basicPart.add(newButton);
            var logoutButton = new qx.ui.toolbar.Button("Logout", "icon/16/actions/document-new.png", this.__newCommand);
            basicPart.add(logoutButton);
            newButton.addListener("execute",this.addNewDocument,this);
            logoutButton.addListener("execute",this.requestLogout,this);
            return toolbar;
        },
        populateTree:function(event) {
            theWindow = this;
            var folderHash = new Array();
            event.getContent().forEach(function(document) {
                       
                if(folderHash[document.category]==null){
                  folderHash[document.category] = new qx.ui.tree.TreeFolder(document.category);
                }
                 var treeFolder =  folderHash[document.category];

                var treeFile = new qx.ui.tree.TreeFile(document.name);
                theWindow.tree.getRoot().add(treeFolder);
                var docu = document;
                treeFolder.setOpen(true);
                treeFolder.add(treeFile);
                treeFile.addListener("dblclick",function(){
                    this.fireDataEvent("editDocument",docu);
                },theWindow);
            });
        },

        openAndFetchDocuments: function() {
            var req = new qx.io.remote.Request("document", "GET", "application/json");
            req.addListener("completed", this.populateTree, this);
            this.tree.getRoot().removeAll();
            req.send();
            this.open();
        }
    }
});