var breadcrumbs = {
	
	'config' : {	
		'container' 		: $('#wrapper'),

		'parentElement' 	: $('#progress_bar'),

		'crumbElement'		: 'li',

		'pageClassName'		: 'bcPage',

		'selectedClassName'	: 'selected',

		'navClassName' 		: 'pg-go'

	},	

	'init' : function(config) {

		if(config && typeof(config) == 'object' ) {
			$.extend(breadcrumbs.config, config);
		}
		
		//Cache or Attach variables this point onwards
		breadcrumbs.$totalPages 		= -1;
		breadcrumbs.$container 			= this.config.container;
		breadcrumbs.$crumbEl 			= this.config.crumbElement;
		breadcrumbs.$parentEl 			= this.config.parentElement;
		breadcrumbs.$pageClass 			= this.config.pageClassName;
		breadcrumbs.$navClassName		= this.config.navClassName;
		breadcrumbs.$crumbsCollection 	= $(breadcrumbs.$parentEl.find( ' > ' + breadcrumbs.$crumbEl));
		breadcrumbs.$selectedEl 		= $(breadcrumbs.$parentEl.find( ' > .' + this.config.selectedClassName));
		breadcrumbs.$navLeftClass 		= breadcrumbs.$navClassName + '-left';
		breadcrumbs.$navRightClass 		= breadcrumbs.$navClassName + '-right';

		//Call methods this point onwards
		breadcrumbs.$crumbLength 		= breadcrumbs.countCrumbs();

		//Initialize the nav classes
		breadcrumbs.assignNavClasses();

		//Bind the Click Handlers
		breadcrumbs.$navLeftEl 	= $('.' + breadcrumbs.$navLeftClass)
									.on('click', breadcrumbs.prevPage);
									
		breadcrumbs.$navRightEl = $('.' + breadcrumbs.$navRightClass)
									.on('click', breadcrumbs.nextPage);

		//Initialize page numbers for crumbs
		breadcrumbs.assignPages();

		//Show all the items on the page of selected tab
		//breadcrumbs.showPage(breadcrumbs.getPageOf(breadcrumbs.$selectedEl));

		breadcrumbs.controlNav();		

	},

	'crumbsOnPage' : function($page) {
		return breadcrumbs.$parentEl.find('.' + breadcrumbs.$pageClass + $page).length;
	},

	'crumbWidths' : function() {
		widths = new Array();
		breadcrumbs.$crumbsCollection.each(function(index) {
			widths.push(parseInt(breadcrumbs.getWidthOf($(this), false)));
		});

/*		widths.sort(function(a, b){
			return b-a;	//desc order
		});*/

		return widths;
	},

	'getWidthOf' : function($el, type) {
		if (type && type == true) {
			return $el.width();	
		} else {
			return $el.outerWidth();
		}

	},

	'countCrumbs' : function() {
		//creating a single level breadcrumb nav
		return breadcrumbs.$crumbsCollection.length;
	},

	'getPageOf' : function($crumb) {
		classNames = breadcrumbs.getClassesOf($crumb);
		page = -1;
		$.each(classNames, function(index) {
			className = classNames[index].trim();
		    if(className.indexOf(breadcrumbs.$pageClass) > -1) {
		      page = className.charAt(className.length -1);
		      return false;
		    }			

		});

		return parseInt(page);
	},

	'getClassesOf' : function($crumb) {
		//returns an Array
		return $crumb.attr('class').split(/\b/);
	},

	'assignNavClasses' : function() {
		breadcrumbs.$container.find('.' + breadcrumbs.$navClassName).eq(0).addClass(breadcrumbs.$navLeftClass);
		breadcrumbs.$container.find('.' + breadcrumbs.$navClassName).eq(1).addClass(breadcrumbs.$navRightClass);
	},

	'assignPages': function() {
		bcParent = breadcrumbs.$parentEl;
		pageClassName = breadcrumbs.$pageClass;
		
		parentWd = breadcrumbs.getWidthOf(bcParent, true);	//calling .width()
		
		crumbs = breadcrumbs.$crumbsCollection;
		totalItems = breadcrumbs.countCrumbs();

	    i= 0; pages = 1; wd = 0;

	    crumbWidths = breadcrumbs.crumbWidths();
	    console.log(crumbWidths);

	    for (i = 0; i < crumbWidths.length; i++) {
	    	crumb = crumbs.eq(i);
	    	wd += parseInt(crumbWidths[i]) + 31;
	    	if (wd >= parentWd) {
	    		wd = 0;
	    		pages += 1;
	    	}

	    	crumb.addClass( pageClassName + pages);

	    }

	    for ( i= 1; i <= pages ; i++) {
	        if ( i != 1) {
	            bcParent.find( '.' + pageClassName + i + ':first').addClass('first-item-in-page');    
	        }

	        if (i != pages) {
	            bcParent.find( '.' + pageClassName + i + ':last').prev().addClass('last-item-in-page');
	        }
	        
	    }

	    breadcrumbs.$totalPages = parseInt(pages);

	},


	'controlNav': function() {
	}


};

$(document).ready(breadcrumbs.init.apply(breadcrumbs));