'use strict';

module.exports = function(grunt) {

	var FTP_CONFIG_FILE = "ftp_config.json";
	var DEFAULTS_CONFIG_FILE = "defaults.json";


	/*
	load defaults and other settings...
	I know this could be done based on the task request
	but I don't like the way that makes the rest of the file look...
	*/


	loadDefaults();
	loadFtpConfigFile();

	grunt.initConfig({
		ftp_push: getFTPConfigObject(),
		"file-creator": {
			options: {
				openFlags: "w"
			},
			sftp: {
				"ftp_config.json": saveFTPFile
			}
		},
		prompt: {
			ftpcreds: {
				options: {
					questions: [{
						config: 'sftp.host',
						type: 'input',
						message: "What is the server's host (ip or domain)?",
						default: grunt.config('defaults.sftp.host')
					}, {
						config: 'sftp.port',
						type: 'input',
						message: "What's the port number?",
						default: grunt.config('defaults.sftp.port')
					}, {
						config: 'sftp.username',
						type: 'input',
						message: "What is the the requested username?",
						default: grunt.config('defaults.sftp.username')
					}, {
						config: 'sftp.password',
						type: 'password',
						message: "What is the the requested password?",
						default: grunt.config('defaults.sftp.password')
					}, {
						config: 'sftp.remotepath',
						type: 'input',
						message: "What's the remote path on the server where the files need to go?",
						default: grunt.config('defaults.sftp.remotepath')
					}]
				}
			},
			updateftpcreds: {
				options: {
					questions: [{
						config: 'sftp.host',
						type: 'input',
						message: "What is the server's host (ip or domain)?",
						default: grunt.config('sftp.host')
					}, {
						config: 'sftp.port',
						type: 'input',
						message: "What's the port number?",
						default: grunt.config('sftp.port')
					}, {
						config: 'sftp.username',
						type: 'input',
						message: "What is the the requested username?",
						default: grunt.config('sftp.username')
					}, {
						config: 'sftp.password',
						type: 'password',
						message: "What is the the requested password?",
						default: grunt.config('sftp.password')
					}, {
						config: 'sftp.remotepath',
						type: 'input',
						message: "What's the remote path on the server where the files need to go?",
						default: grunt.config('sftp.remotepath')
					}]
				}
			}
		},
		clean: ['build/*'],
		uglify: {
			options: {
				mangle: false,
				compress: true,
				preserveComments: 'all',
			},
			release: {
				files: {
					'build/js/app.js': ['src/js/app.js'],
				}
			}
		},
		copy: {
			main: {
				files: [{
					expand: true,
					cwd: 'src/',
					src: ['**/*', '!.sass-cache/*', '!sass', '!sass/**', '!js/**', '!js_src/**'],
					dest: 'build/',
					nonull: true
				}, {
					expand: true,
					cwd: 'src/js/',
					src: ['*.js'],
					dest: 'build/js/',
					filter: 'isFile',
					nonull: true
				}]
			},

		},
		concurrent: {
			watch_server: {
				tasks: ['watch', 'connect:dev:keepalive'],
				options: {
					logConcurrentOutput: true
				}
			}
		},
		connect: {
			dev: {
				port: 13337,
				base: "src/"
			},
			release: {
				port: 13337,
				base: "build/"
			}
		},
		compass: {
			dev: {
				options: {
					sassDir: 'src/sass/',
					javascriptsDir: 'src/js/',
					outputStyle: 'expanded',
					cssPath: 'src/css/',
					force: true,
					watch: false
				}
			},
			release: {
				options: {
					sassDir: 'src/sass/',
					javascriptsDir: 'build/js/',
					outputStyle: 'compressed',
					cssPath: 'build/css/',
					force: true,
					watch: false
				}
			}
		},
		concat: {
			options: {
				seperator: ";"
			},
			dev: {
				src: ['src/js_src/_*.js', 'src/js_src/app.js'],
				dest: 'src/js/app.js',
				nonull: true,
			},
			release: {
				src: ['src/js_src/_*.js', 'src/js_src/app.js'],
				dest: 'build/js/app.js',
				nonull: true,
			},
		},
		watch: {
			options: {
				cwd: 'src/'
			},
			js: {
				files: ['js_src/*.js'],
				tasks: ['concat:dev'],
				options: {
					spawn: true,
					interrupt: true
				}
			},
			sass: {
				files: ['sass/**.scss', 'sass/**/*.scss'],
				tasks: ['compass:dev'],
				options: {
					spawn: true,
					interrupt: true
				}
			}
		}

	});


	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-connect');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-prompt');
	grunt.loadNpmTasks('grunt-file-creator');
	grunt.loadNpmTasks('grunt-ftp-push');



	function loadDefaults() {
		var result = false;
		if (grunt.file.exists(DEFAULTS_CONFIG_FILE)) {
			var configdata = grunt.file.readJSON(DEFAULTS_CONFIG_FILE);
			grunt.config('defaults.sftp.host', configdata.host);
			grunt.config('defaults.sftp.username', configdata.user);
			grunt.config('defaults.sftp.password', configdata.password);
			grunt.config('defaults.sftp.port', configdata.port);

			var remote_path = configdata.remote_path;
			if (remote_path.slice(-1) != "/") {
				remote_path += "/";
			}
			grunt.config('defaults.sftp.remotepath', remote_path);
			result = true;
		}
		return result;
	};

	function loadFtpConfigFile() {
		var result = false;
		if (grunt.file.exists(FTP_CONFIG_FILE)) {
			var configdata = grunt.file.readJSON(FTP_CONFIG_FILE);
			grunt.config('sftp.host', configdata.host);
			grunt.config('sftp.username', configdata.user);
			grunt.config('sftp.password', configdata.password);
			grunt.config('sftp.port', configdata.port);

			var remote_path = configdata.remote_path;
			if (remote_path.slice(-1) != "/") {
				remote_path += "/";
			}
			grunt.config('sftp.remotepath', remote_path);
			result = true;
		}
		return result;
	};

	function getTemplate() {
		var template = '{' + "\n";
		template += '"host": "%HOST%",' + "\n";
		template += '"user": "%USERNAME%",' + "\n";
		template += '"password": "%PASSWORD%",' + "\n";
		template += '"port": "%PORT%",' + "\n";
		template += '"remote_path": "%REMOTE_PATH%"' + "\n";
		template += '}';

		return template;
	}

	function saveFTPFile(fs, fd, done) {
		var template = getTemplate();
		template = template.replace('%HOST%', grunt.config('sftp.host'));
		template = template.replace('%PORT%', grunt.config('sftp.port'));
		template = template.replace('%USERNAME%', grunt.config('sftp.username'));
		template = template.replace('%PASSWORD%', grunt.config('sftp.password'));
		template = template.replace('%REMOTE_PATH%', grunt.config('sftp.remotepath'));
		fs.writeSync(fd, template);
		done();
	}

	function getFTPConfigObject() {
		//FTP SETTINGS
		var ftp_options = {};
		ftp_options.host = grunt.config('sftp.host');
		ftp_options.username = grunt.config('sftp.username');
		ftp_options.password = grunt.config('sftp.password');
		ftp_options.port = grunt.config('sftp.port');
		ftp_options.dest = grunt.config('sftp.remotepath');

		//UPLOAD SETTINGS FOR THE BUILD FOLDER
		var task_settings = {};
		task_settings.expand = true;
		task_settings.cwd = 'build/';
		task_settings.src = ['**/*'];

		//WRAP THE BUILD FOLDER SETTINGS IN AN ARRAY
		var file_list = [];
		file_list.push(task_settings);

		var config = {};
		config.options = ftp_options,
		config.dev = {
			files: file_list
		};

		return config;
	}

	grunt.registerTask('get_ftp_config', 'Prepares the FTP config variables', function() {
		var ftpFileIsOk = loadFtpConfigFile();
		if (ftpFileIsOk) {
			grunt.config.set('ftp_push', getFTPConfigObject())
			grunt.task.clearQueue();
			grunt.task.run('ftp_push:dev');
		} else {
			grunt.task.run(['prompt:ftpcreds', "file-creator:sftp", "get_ftp_config"]);
		}
	});

	grunt.registerTask('check_for_ftp_config', "Checks if the FTP config exists before opening the update prompt", function() {
		if (grunt.file.exists(FTP_CONFIG_FILE)) {
			console.log("FTP file exists, so those are probably loaded and should show up fine in the update UI");
		} else {
			console.log("No FTP config found. Let's re-route");
			grunt.task.clearQueue();
			grunt.task.run(['prompt:ftpcreds', "file-creator:sftp"]);
		}
	});



	//tasks
	grunt.registerTask('build:dev', ['clean', 'copy', 'compass:dev', 'concat:dev']);
	grunt.registerTask('build:release', ['clean', 'copy', 'compass:release', 'concat:dev', 'uglify:release']);
	grunt.registerTask('build', ['build:dev']);

	grunt.registerTask('server', ['compass:dev', 'concat:dev', 'concurrent:watch_server']);

	grunt.registerTask('host:dev', ['build:dev', 'connect:release']);
	grunt.registerTask('host:release', ['build:release', 'connect:release']);

	grunt.registerTask('setupftp:dev', ['prompt:ftpcreds', "file-creator:sftp"]);
	grunt.registerTask("set:ftp", ['check_for_ftp_config', 'prompt:updateftpcreds', "file-creator:sftp"]);

	grunt.registerTask('deploy:dev', ['build:dev', 'get_ftp_config']);
	grunt.registerTask('deploy:release', ['build:release', 'get_ftp_config']);
	grunt.registerTask('deploy', ['deploy:dev']);

	grunt.registerTask('default', ['build:dev', 'watch']);


};