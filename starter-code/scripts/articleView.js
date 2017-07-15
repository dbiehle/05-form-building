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

function Entry (entryObject) {
  this.title = entryObject.title;
  this.body = entryObject.body;
  this.author = entryObject.author;
  this.authorUrl = entryObject.authorUrl;
  this.category = entryObject.category;
  this.published = entryObject.published;
}

articleView.initNewArticlePage = function() {
 // DONE: Make the tabs work. Right now, you're seeing all the tab content (items with a class of tab-content) on the page at once. The section with the id of "write" should show when the "write" tab is clicked; it is also the default and should be shown on page load. The section with the id of "articles" should show when the "preview" tab is clicked.
// The articleView.handleMainNav function is doing this for us already, so...
// Time spent: 20 minutes figuring out that nothing was needed...


  // DONE: Hide the article-export section on page load
  $('#article-export').hide();
  $('#article-json').on('focus', function(){
    this.select();
  });

  // TODO: Add an event handler to update the preview and the article-export field if any inputs change.
  $('#entryForm').on('change', function(event){
    event.preventDefault();
    $('#articles').empty();
    $('#entryTitle').val();
    // need to grab the chosen values and

    // TODO: Need to use the object contructor we created up above line 76 so we have somewhere to put the below stuff from the form
    
    // view.newEntry.title = $('#entryTitle').val();
      // view.newEntry.date = (new Date()).toDateString();
      // view.newEntry.category = $('#entryCategory').val();
      // view.newEntry.mood = $('#entryMood').val();
      // view.newEntry.text = $('#entryText').val();
      // view.newEntry.author = $('#entryAuthor').val();
      // view.newEntry.templateAndDomify('#entryPreview');
  })
    // enter them into the formTemplate using Handlebars
    // var grabFormTemplate = $('#formTemplate').html();
    // var formTemplateCompiler = Handlebars.compile(grabFormTemplate);
    // Need the object to add to the compiler
    // return formTemplateCompiler();
    // append them to the #articles area
    // also render the object to the article-json area
}

// this is the function that generates the preview and shows the export field
articleView.create = function() {
  // TODO: Set up a var to hold the new article we are creating.
  // Clear out the #articles element, so we can put in the updated preview


  // TODO: Instantiate an article based on what's in the form fields:


  // TODO: Use our interface to the Handblebars template to put the article preview into the DOM:


  // TODO: The new articles we create will be shown as JSON in an element in our article-export section. From there, we can copy/paste the JSON into our source data file.
    // Set up this "export" functionality. When data is inputted into the form, that data should be converted to stringified JSON. Then, display that JSON in the element inside the article-export section. The article-export section was hidden on page load; make sure to show it as soon as data is entered in the form.

};


articleView.initIndexPage = function() {
  articleView.populateFilters();
  articleView.handleCategoryFilter();
  articleView.handleAuthorFilter();
  articleView.handleMainNav();
  articleView.setTeasers();
  articleView.initNewArticlePage();
};
