markup.push({
	DropListView: {
		nsClass:  "GXSettingsView",
		gxDragController: {
			"+" : "ListDragController",
			nsClass: "SoundSource.TCDropAppDragController"
		}
	},
	ListDragController: {
		"+" : "BasicListViewDragController", 
		nsClass: "SoundSource.TCListDragController",
	},
	EffectsDragController: {
		"+" : "ListDragController",
		nsClass: "SoundSource.TCEffectsListDragController",
	},
	BasicListViewDragController: {
		nsClass: "GXListViewDragController",
		gxInsertionViewOffset: "{0,-2}",
		"gxInsertionView" : {
			nsClass: "GXDrawView",
			gxIntrinsicHeight: 4,
			"gxBackPainter" : {
				nsClass: "GXRoundRectPainter",
				gxCornerRadius: 2,
				gxFillColor: Colors.key,
				gxEdgeInsets: "5,0,5,0",
			},
		},
	}
});
