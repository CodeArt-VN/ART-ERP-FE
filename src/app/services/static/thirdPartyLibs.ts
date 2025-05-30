export var thirdPartyLibs = {
	aceEditor: {
		source: [{ url: 'https://cdn.appcenter.vn/libs/ace/1.35.1/ace.js', type: 'js' }],
		ext: {
			beautify: {
				source: [{ url: 'https://cdn.appcenter.vn/libs/ace/1.35.1/ext-beautify.js', type: 'js' }],
			},
		},
	},
	gantt: {
		source: [
			{ url: 'https://cdn.appcenter.vn/libs/gantt/v8.0.9p.css', type: 'css' },
			{ url: 'https://cdn.appcenter.vn/libs/gantt/v8.0.9p.js', type: 'js' },
		],
	},
	echart: {
		source: [{ url: 'https://cdn.jsdelivr.net/npm/echarts@5/dist/echarts.min.js', type: 'js' }],
	},
	quill: {
		source: [
			{ url: 'https://cdn.appcenter.vn/libs/quill/2.0.2/quill.snow.css', type: 'css' },
			{ url: 'https://cdn.appcenter.vn/libs/quill/2.0.2/quill.js', type: 'js' },
		],
	},
	ggMap: {
		source: [{ url: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAtyM-Th784YwQUTquYa0WlFIj8C6RB2uM', type: 'js' }],
	},
	monacoCdnResources : {
		source:[{
			type: 'js',
			url: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs/loader.min.js',
		  }
		]
	}
		
};
