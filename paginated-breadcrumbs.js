var bcTotalItems        =       0,
    bcParentId          =       'progress_bar';


(function start() {
    var bcParent       = $( '#' + bcParentId ),
        totalItems     = findNoOfChildren(bcParent),
        parentWidth    = findWidthOfParent(bcParent),
        pages          = classifyPages(bcParent, totalItems);

        setupBreadCrumb(bcParent, pages, 1);

        bcParent.addClass('pb-flexbox');

        $('.pg-go-left').click(function(){
          prevPage(bcParent, pages);

        });

        $('.pg-go-right').click(function(){
          nextPage(bcParent, pages);

        });

/*            window.onresize = function() {
//              console.log()
          
          parentWidth    = findWidthOfParent(bcParent);
          pages          = classifyPages(bcParent, totalItems);
          console.log(parentWidth);
          console.log(pages);
          setupBreadCrumb(bcParent, pages, 0);                            
        }*/

})();

function activateNavs(bcParent, pages) {
  classNames = bcParent.find('li:visible:first').attr('class').split(/\b/);
  visiblePage = extractPageNumber(classNames);

  if( visiblePage == 1) {
    $('.pg-go-left').addClass('hide');
  } else if(visiblePage == pages) {
    $('.pg-go-right').addClass('hide');
  }

  if( visiblePage != 1 && visiblePage <= pages) {
    $('.pg-go-left').removeClass('hide');
  }

  if( visiblePage < pages ) {
    $('.pg-go-right').removeClass('hide');
  }

}

function activatePage(bcParent, pageNo) {
  hideAll(bcParent);
  bcParent.find('.bcPage' + pageNo).removeClass('hide');

}
function prevPage(bcParent, pages) {
  activatePage(bcParent, (getPageOfVisibleCrumb(bcParent) -1));
  activateNavs(bcParent, pages);
}

function nextPage(bcParent, pages) {
  activatePage(bcParent, (getPageOfVisibleCrumb(bcParent) +1));
  activateNavs(bcParent, pages);
}

function hideAll(bcParent) {
  bcParent.find('li').addClass('hide');
}

function initializeBreadCrumb(bcParent) {
  hideAll(bcParent);
}

function extractPageNumber(classNames) {
  var page = 0;
  $.each(classNames, function(index) {
    
    className = classNames[index].trim();
    if(className.indexOf('bcPage') > -1) {
      page = className.charAt(className.length -1);
      return false;
    }
  });

  return parseInt(page);

}
function getPageOfVisibleCrumb(bcParent) {
  var page = 0;
  classNames = bcParent.find('li:visible:first').attr('class').split(/\b/);
  
  return extractPageNumber(classNames);
  
}

function getPageOfSelectedCrumb(bcParent) {
  var page = 0;
  classNames = bcParent.find('.selected').attr('class').split(/\b/);
  
  return extractPageNumber(classNames);
  
}

function setupBreadCrumb(bcParent, pages, firstTime) {

  

  if (firstTime == 1) {
      initializeBreadCrumb(bcParent);
      selected = getPageOfSelectedCrumb(bcParent);

      bcParent.find('.bcPage' + selected).removeClass('hide');

      if ( selected == 1 ) {
        $('.pg-go-left').addClass('hide');
      } else if ( selected == pages) {
        $('.pg-go-right').addClass('hide');
      } else {
        $('.pg-go-left').removeClass('hide');
        $('.pg-go-right').removeClass('hide');
      }

      if( selected < pages ) {
        $('.pg-go-right').removeClass('hide');
      }

      if( pages > 1 && selected <= pages && selected != 1) {
        $('.pg-go-left').removeClass('hide'); 
      }    

  } else {
    // 
/*        visible = getPageOfVisibleCrumb(bcParent);
    initializeBreadCrumb(bcParent);
    console.log(visible);
    bcParent.find('.bcPage' + visible).removeClass('hide');*/
  }

}

function findNoOfChildren(bcParent) {
    return bcParent.find('li').length;
}

function findWidthOfParent(bcParent) {
    return bcParent.outerWidth();
}

function resetClasses(bcParent, totalItems) {
    crumbs = bcParent.find('li');
    for (i = 0; i< totalItems; i++) {
        if(crumbs.eq(i).attr('class').indexOf('bcPage') > -1) {
            crumbs.eq(i).removeClass('bcPage' + extractPageNumber(crumbs.eq(i).attr('class').split(/\b/)));
        }
    }
}

function classifyPages(bcParent, totalItems) {
    var pages       = 1,
        wd          = 0,
        parentWd    = findWidthOfParent(bcParent),
        crumbs      = bcParent.find('li'),
        i           = 0;

    for (var i = 0; i < totalItems; i++) {
        var crumb = crumbs.eq(i);
        wd += crumb.outerWidth() + 40;  //hack
        if( wd >= parentWd) {
            pages += 1;
            wd = 0; // reset
        }
        crumb.addClass( 'bcPage' + pages);
    }

    for ( i= 1; i <= pages ; i++) {
        if ( i != 1) {
            bcParent.find('.bcPage' + i + ':first').addClass('first-item-in-page');    
        }

        if (i != pages) {
            bcParent.find('.bcPage' + i + ':last').addClass('last-item-in-page');    
        }
        
    }

    return pages;
}