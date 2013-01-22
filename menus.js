// order starts at 10 because of the default menu. (if you have more than a few items in the default menu you are crazy.
var myPassedMenus =	[
					{
						name: "item",
						selector: "#addeditcollection .node.item",
						line: {
							text:"<hr />",
							order: 10
						},
						newSiblingNode: {
							text:"New Sibling",
							action:"aeadb.addEditNode(cm.settings.currentE, false, true);",
							order: 11
						},
						editNode: {
							text:"Edit",
							action:"aeadb.addEditNode(cm.settings.currentE, true);",
							order: 12
						},
						copyNode: {
							text: "Copy",
							action: "aeadb.addEditNode(cm.settings.currentE, false, true, true);",
							order: 13
						},
						deleteNode: {
							text: "Delete",
							action: "aeadb.deleteNode(cm.settings.currentE);",
							order: 14
						}

					},
					{
						name: "node",
						selector: "#addeditcollection .node:not(.item)",
						line: {
							text:"<hr />",
							order: 10
						},
						newChildNode: {
							text:"New Child",
							action:"aeadb.addEditNode(cm.settings.currentE, false, false);",
							order: 11
						},
						newSiblingNode: {
							text:"New Sibling",
							action:"aeadb.addEditNode(cm.settings.currentE, false, true);",
							order: 11
						},
						editNode: {
							text:"Edit",
							action:"aeadb.addEditNode(cm.settings.currentE, true);",
							order: 12
						},
						copyNode: {
							text: "Copy",
							action: "aeadb.addEditNode(cm.settings.currentE, false, true, true);",
							order: 13
						},
						deleteNode: {
							text: "Delete",
							action: "aeadb.deleteNode(cm.settings.currentE);",
							order: 14
						}

					},
					{
						name: "browser",
						selector: "#addeditcollection #eadBrowser .col",
						line: {
							text:"<hr />",
							order: 10
						},
						newNode: {
							text:"New",
							action:"aeadb.addEditNode(cm.settings.currentE, false);",
							order: 11
						}
					}];