# Metroplex

> Create a massively powerfull project skeleton in a few seconds using Grunt-init and Node. This is a particular powerful one as it comes preloaded with watchers for javascript changes and compilation, Compass watcher and compilation and a built-in webserver for quick testing. And then there's the FTP upload power. Yes it uploads files to your server too. It even has an FTP login UI. Bow for me, for I am awesome.


### Template overview:
 - styles.css (comes with Normalize.css, Bootstrap-grid and Compass-style)
 - app.js (compiled by all javascript files in `js_src`)
 - index.htm (with embedded `styles.css`, bundled `jquery.min.js` and compiled `app.js`)
 - Watch task for `*.js` and `*.scss` files and compiles them. (See below for more info)
 - Hosts a basic server to quickly run tests (perfect for tiny testing projects) and debug builds before deploying them.
 - FTP upload commands with built-in prompt to generate the FTP config file for later re-use

### What's in the box?
 - Twitter Bootstrap
 - jQuery
 - FlexSlider
 - ResMenu (adapted to be REALLY responsive)
 - Handy mixins
 - Default Wordpress classes stylesheet

## Requirements
- Node & NPM
- Compass-Style
- Grunt-init
- Grunt-cli


### Upcoming features
 - Require.JS support (maybe)
 - Live Reload (maybe)
 - Suggest your own :)


## Installation
To install the template into the grunt-init template folder, just run the following command.

```
 git clone https://{YOUR_USERNAME_HERE}@bitbucket.org/nocreativity/metroplex.git ~/.grunt-init/metroplex
```

Installation over! Time to make some magic happen!


## How do I use this??
- Deploy the template: `grunt-init metroplex`
- Install the dependencies: `npm install`
- Run the grunt tasks: `grunt`. See below for other tasks.
- Build cool shit inside the `src` folder. See below for more info about the folders.
- When you're done, build the project using `grunt build:release`
- Ship what is inside the `build` folder using `grunt deploy:release`.
- ...
- PROFIT!


## Ok, seriously: Where do I put everything?
Well, the actual development happens in the `src` folder. But since we have some watchers and compilation magic going on, we need to work with several direcotries and folders. To be crystal clear, below is the list of all major directories and why they exist.

### the `build` folder
You should never apply any changes to the contents of this folder as everything is deleted when the project is being built/deployed.

### the `src`folder
This is where you put all your files for development: Your images, your `.htm`, `.php` files and all that.

### the `src/js_src` folder
This is where you write your javascript. All `.js` files in this folder will be concatinated for deployment.
Files that should be included first should have filenames that start with and underscore (ex: `_utils.js`,`_function.js`,`_class.Product.js`).
Your main javascript file must be called `app.js` and will be concatinated as the very last. This ensures all references are in place once your code starts running.
The `app.js` file is already in place and has a little kickstart snippet. Some other files are in there as well with some tools I use on a regular basis.

### the `src/js` folder
Here you can deploy any Javascript libraries you will use like `jQuery` or `respond.js` etc.
There are already some files in place here. Again I use these on a regular basis but you can remove those if you like.

### the `src/sass` folder
Here you can deploy your `.scss` files. The `compass watch` process will pick them up and compile them into the `styles.css` file.

### the `src/css` folder
Here you can deploy other CSS dependencies like the typical `fonts` folder. The `fonts` folder is already there and comes with the FlexSlider iconfont.  While it is safe for you to embed external stylesheets (e.g.: from external libs you use), it is advised to embed those via SASS.


## What else can this thing do?

### default
Command: `grunt`

You don't actually need to call this task using `grunt default`. You can just call `grunt` and Grunt will just default to this task.
The default task runs watch tasks for `.scss` and `.js` files and compiles them.

### server
Command: `grunt server`

This runs the default task (`.js` and `.scss` watch tasks) but adds a basic local http server on port `13337` in the `src` folder.
This is a perfect little setup for developing tiny sites or experimenting since it contains everything in a single folder. It allows you to discard everything at once when you're done, it allows you to commit the entire server to GIT or to zip the entire project and send it to somebody else. How much more portable can a project be?

### build
Command: `grunt build` or  `grunt build:dev`

This command builds the entire project into the build folder without compressing the `.css` and `.js` files.
This is particularly helpful if you might need to inspect some code while running in the browser.

### build:release
Command: `grunt build:release`

This command is the same as `build:dev` but comes with compression of the `.js` and `app.js` files. This basically makes a full release which you can then ship off to clients or upload to servers for production use.

### deploy
Command: `grunt deploy` or `grunt deploy:dev`

This command makes a dev build (using `build:dev`) and then uploads it to your FTP server. It searches for FTP settings (`ftp_config.json`) in the current directory. If it doesn't find them, it prompts you for the correct credentials and remote path, saves those to disk and then performs the upload. Existing files are overwritten. No files are deleted from the FTP server.

### deploy:release
Command: `grunt deploy:release`

This does the same as `deploy:dev` but it uses the release build (`build:release`) to upload.

### set:ftp
Command: `grunt set:ftp`

This allows you to setup your FTP configuration file or update it if you already have one. Comes in handy during the course of a project.

## What about all that stuff that comes preloaded with this setup?

There's a lot of stuff that comes with this setup. Let me quickly walk you through all of it.

### Twitter Bootstrap

URL: http://getbootstrap.com/

Everybody likes Twitter Bootstrap, right? Well, this Grunt setup comes with the entire bootstrap setup included BUT only embeds the grid by default. If you like to use more of the Bootstrap framework, you can just import them into `styles.scss` and get on with it.

### jQuery

URL: http://jquery.com/

Honestly, if I need to explain what jQuery is, I don't think you belong here.
It's in the `js` folder and embedded in the `index.htm` file.

### FlexSlider

URL: http://www.woothemes.com/flexslider/

This is a brilliant little slider plugin that does quite a lot of cool stuff. It works well on desktop, touch and mobile devices. I use this on many occasions.
The CSS is embedded in the `sass/metroplex` folder. The JS is in the `js` folder and embedded in the `index.htm` file.

### ResMenu

URL: https://github.com/micc83/ReSmenu

I adapted this one to really support responsiveness. It registeres the resize event of the window. If the targeted menu doesn't fit inside its parent anymore, it triggers the script and turns it into a select-menu. Read more about the usage on the original plugin site. The external API's are roughly the same.

### Handy mixins

I added a shitload of mixins I use on a regular basis. Find a summary of them below. Their names should be self explanatory.

```
@include calculateRem(16px)
@include fontSize(16px)
@include lineHeight(28px)

@include placeholder{  /* Your CSS rules here */ }
@include chromeonly{  /* Your CSS rules here */ }
@include retina{  /* Your CSS rules here */ }

@include xs-only{  /* Your CSS rules here */ }
@include sm-only{  /* Your CSS rules here */ }
@include md-only{  /* Your CSS rules here */ }
@include lg-only{  /* Your CSS rules here */ }

@include lg-and-above{  /* Your CSS rules here */ }
@include md-and-above{  /* Your CSS rules here */ }
@include sm-and-above{  /* Your CSS rules here */ }
@include lg-and-below{  /* Your CSS rules here */ }
@include md-and-below{  /* Your CSS rules here */ }
@include sm-and-below{  /* Your CSS rules here */ }
```

### Default Wordpress classes stylesheet

This is a default layout stylesheet that accounts for all the built-in Wordpress classes that are generated using the WYSIWYG editor.


## Can I set defaults for the FTP upload that won't be synced across the network/GIT?

Yes, you can! You can just add a `defaults.json` to the `grunt-init/metroplex/` folder. Below you'll find the template for this file.

```
{
	"host": "domain_or_IP_to_your_FTP_server",
	"user": "your_FTP_username",
	"password": "your_FTP_password",
	"port": "21",
	"remote_path": "/path/to/your/upload/folder/"
}
```





