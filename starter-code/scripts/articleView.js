'use strict';

var articleView = {};

articleView.populateFilters = function() {
  $('article').each(function() {
    if (!$(this).hasClass('template')) {
      var val = $(this).find('address a').text();
      var optionTag = `<option value="${val}">${val}</option>`;

      if ($(`#author-filter option[value="${val}"]`).length === 0) {
        $('#author-filter').append(optionTag);
      }

      val = $(this).attr('data-category');
      optionTag = `<option value="${val}">${val}</option>`;
      if ($(`#category-filter option[value="${val}"]`).length === 0) {
        $('#category-filter').append(optionTag);
      }
    }
  });
};

articleView.handleAuthorFilter = function() {
  $('#author-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $(`article[data-author="${$(this).val()}"]`).fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
    $('#category-filter').val('');
  });
};

articleView.handleCategoryFilter = function() {
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $(`article[data-category="${$(this).val()}"]`).fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
    $('#author-filter').val('');
  });
};

articleView.handleMainNav = function() {
  $('.main-nav').on('click', '.tab', function() {
    $('.tab-content').hide();
    $('#' + $(this).data('content')).fadeIn();
  });

  $('.main-nav .tab:first').click();
};

articleView.setTeasers = function() {
  $('.article-body *:nth-of-type(n+2)').hide();
  $('article').on('click', 'a.read-on', function(e) {
    e.preventDefault();
    if ($(this).text() === 'Read on →') {
      $(this).parent().find('*').fadeIn();
      $(this).html('Show Less &larr;');
    } else {
      $('body').animate({
        scrollTop: ($(this).parent().offset().top)
      },200);
      $(this).html('Read on &rarr;');
      $(this).parent().find('.article-body *:nth-of-type(n+2)').hide();
    }
  });
};

function Entry() {
  this.title = $('#entryTitle').val();
  this.body = $('#entryBody').val();
  this.author = $('#entryAuthor').val();
  this.authorUrl = $('#entryAuthorUrl').val();
  this.category = $('#entryCategory').val();
  this.published = $('#entryPublished').val();
}

articleView.templateAndRender = function(newEntry) {
  var handlebarsStr = $('#formTemplate').html();
  var formCompilerFunc = Handlebars.compile(handlebarsStr);
  var newHtml = formCompilerFunc(newEntry);
  $('#articles').append(newHtml);
}

articleView.initNewArticlePage = function() {
 // DONE: Make the tabs work. Right now, you're seeing all the tab content (items with a class of tab-content) on the page at once. The section with the id of "write" should show when the "write" tab is clicked; it is also the default and should be shown on page load. The section with the id of "articles" should show when the "preview" tab is clicked.
// The articleView.handleMainNav function is doing this for us already, so...
// Time spent: 20 minutes figuring out that nothing was needed...

  // DONE: Hide the article-export section on page load
  $('#article-export').hide();
  $('#article-json').on('focus', function(e){
    e.preventDefault();
    this.select();
  });

  // DONE: Add an event handler to update the preview and the article-export field if any inputs change.
  articleView.create();
}

// this is the function that generates the preview and shows the export field
articleView.create = function() {
  $('#entryForm').on('change', function(event){
    event.preventDefault();
    // Clear out the #articles element, so we can put in the updated preview
    $('#articles').empty();

    // DONE: Set up a var to hold the new article we are creating.
    var newEntry = new Entry(this);
    // DONE: Instantiate an article based on what's in the form fields:
    // DONE: Use our interface to the Handblebars template to put the article preview into the DOM:
    //we call the `Entry` constructor, then pass in `this` which is referencing the form
    //that we've placed the eventlistener on and we assign the returned obj to 'newEntry' var
    articleView.templateAndRender(newEntry);
    $('#articles').show();

    // DONE: The new articles we create will be shown as JSON in an element in our article-export section. From there, we can copy/paste the JSON into our source data file.
    // Set up this "export" functionality. When data is inputted into the form, that data should be converted to stringified JSON. Then, display that JSON in the element inside the article-export section. The article-export section was hidden on page load; make sure to show it as soon as data is entered in the form.
    var jsonStr = JSON.stringify(newEntry);
    $('#article-json').empty();
    $('#article-json').append(jsonStr);
    $('#article-export').show();

  });
};

articleView.initIndexPage = function() {
  articleView.populateFilters();
  articleView.handleCategoryFilter();
  articleView.handleAuthorFilter();
  articleView.handleMainNav();
  articleView.setTeasers();
  articleView.initNewArticlePage();
};
