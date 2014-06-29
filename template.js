'use strict';

exports.description = 'Create the Metropoly default project.';

exports.notes = 'This is the basic Metropoly project setup with compass, jquery and bootstrap. Go!';

exports.after = "You're almost done here. Now you only need to run the following \n\n" +
	"npm install \n\n" +
	"Now you're done! Time to kick ass! Good luck!\n" +
	'Take care. \nThe Metropoly Team';

exports.warnOn = '*';

exports.template = function(grunt, init, done) {

	init.process({
			licenses: []
		}, [
			init.prompt('name'),
			init.prompt('description', 'The next big thing'),
		],
		function(err, props) {
			props.keywords = [];
			props.devDependencies = {
				'grunt': '~0.4.1',
				'grunt-contrib-compass': '~0.7.2',
				'grunt-contrib-concat': '~0.4.0',
				'grunt-contrib-watch': '~0.6.1',
				'grunt-connect': '~0.2.0',
				'grunt-concurrent': '~0.5.0',
				'grunt-contrib-clean': '~0.5.0',
				'grunt-contrib-copy': '~0.5.0',
				"grunt-contrib-uglify": "~0.4.0",
				"grunt-file-creator": "~0.1.1",
				"grunt-ftp-push": "~0.1.3",
				"grunt-prompt": "~1.1.0"
			};

			var noProcess = {
				noProcess: 'support/**'
			};

			var files = init.filesToCopy(props);
			init.addLicenseFiles(files, props.licenses);
			init.copyAndProcess(files, props, noProcess);
			init.writePackageJSON('package.json', props);

			done();
		});
};