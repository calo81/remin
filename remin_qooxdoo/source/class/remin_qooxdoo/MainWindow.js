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
        var layout = new qx.ui.layout.Grid(0, 0);
        this.setLayout(layout);
        layout.setColumnWidth(1, 600);
        var collectionTree = new qx.ui.tree.Tree();
        collectionTree.setWidth(500);
        collectionTree.setHeight(400);
        this.add(collectionTree,{row:1,column:0,colSpan: 2,rowSpan:2});
        var treeRoot = new qx.ui.tree.TreeFolder("Collections");
        collectionTree.setRoot(treeRoot);

    },
    members:{
       openAndFetchDocuments: function(){
           var req = new qx.io.remote.Request("document", "GET", "application/json");
           req.send();
           this.open();
       }
    }
});