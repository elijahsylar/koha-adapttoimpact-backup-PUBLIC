/**
 * Koha Library UI Enhancement Script - FIXED VERSION
 * Loads actual cover images while maintaining all UI functionality
 * Now includes staff login customization
 * ENHANCED WITH ACCESSIBILITY FEATURES
 */
$(document).ready(function() {
  'use strict';

  /**
   * Staff Login Customization
   * Adds Demo Institution logo and styling to login page
   */
// sourcery skip: avoid-function-declarations-in-blocks
  function customizeStaffLogin() {
    // Check if we're on the staff login page
    const $loginForm = $('#login, #loginform, .login-form, form[action*="auth.pl"]');
    const $authLogin = $('#auth, .authlogin, #login_error').closest('form').parent();
    
    if ($loginForm.length || $authLogin.length) {
      console.log("Customizing staff login page");
      
      // Create the logo and header HTML
      const headerHTML = `
        <div class="demo-login-header" style="
          background: #fff;
          padding: 20px;
          border-radius: 8px 8px 0 0;
          text-align: center;
          margin-bottom: 0;
        ">
          <img src="https://via.placeholder.com/200x100/d4bc7d/ffffff?text=Demo+Library" alt="Demo Institution Logo" style="
            max-width: 300px;
            height: auto;
            margin-bottom: 10px;
          ">
          <h2 style="
            color: #333;
            font-size: 1.5em;
            margin: 10px 0;
            font-weight: 600;
          ">Demo Technology Center</h2>
          <h3 style="
            color: #555;
            font-size: 1.2em;
            margin: 5px 0;
            font-weight: 500;
          ">Demo Program</h3>
          <p style="
            color: #666;
            font-size: 0.9em;
            margin: 5px 0;
          ">Professional Development and Equipment Lending Program</p>
          <p style="
            color: #777;
            font-size: 0.85em;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-top: 10px;
          ">Example University | Main Campus</p>
        </div>
        
        <div class="demo-separator" style="
          background: linear-gradient(90deg, #000 0%, #cfb87c 50%, #000 100%);
          height: 4px;
          position: relative;
          overflow: visible;
        ">
          <div style="
            position: absolute;
            top: -2px;
            left: 0;
            right: 0;
            height: 8px;
            background: linear-gradient(90deg, 
              transparent 0%, 
              rgba(207, 184, 124, 0.3) 25%, 
              rgba(207, 184, 124, 0.6) 50%, 
              rgba(207, 184, 124, 0.3) 75%, 
              transparent 100%);
            filter: blur(2px);
          "></div>
        </div>
      `;
      
      // Find the best container for the login form
      let $targetContainer = null;
      
      // Try different selectors for the login container
      if ($('#login').length) {
        $targetContainer = $('#login');
      } else if ($('.login-form').length) {
        $targetContainer = $('.login-form');
      } else if ($('#loginform').length) {
        $targetContainer = $('#loginform').closest('div');
      } else if ($authLogin.length) {
        $targetContainer = $authLogin;
      } else if ($('form[action*="auth.pl"]').length) {
        $targetContainer = $('form[action*="auth.pl"]').parent();
      }
      
      if ($targetContainer && !$('.demo-login-wrapper').length) {
        // Wrap the login form in a container
        $targetContainer.wrap('<div class="demo-login-wrapper"></div>');
        
        // Add our header before the form
        $('.demo-login-wrapper').prepend(headerHTML);
        
        // Style the wrapper
        $('.demo-login-wrapper').css({
          'max-width': '450px',
          'margin': '50px auto',
          'box-shadow': '0 4px 20px rgba(0,0,0,0.1)',
          'border-radius': '8px',
          'background': '#fff',
          'overflow': 'hidden'
        });
        
        // Style the login form area
        $targetContainer.css({
          'padding': '30px',
          'background': '#f8f9fa',
          'border-radius': '0 0 8px 8px'
        });
        
        // Enhance form inputs
        $targetContainer.find('input[type="text"], input[type="password"]').css({
          'width': '100%',
          'padding': '10px',
          'border': '1px solid #ddd',
          'border-radius': '4px',
          'font-size': '14px',
          'transition': 'border-color 0.3s ease',
          'box-sizing': 'border-box'
        });
        
        // ACCESSIBILITY: Ensure all form inputs have associated labels
        $targetContainer.find('input[type="text"], input[type="password"]').each(function() {
          const $input = $(this);
          const inputId = $input.attr('id');
          if (inputId && !$input.attr('aria-label') && !$input.attr('aria-labelledby')) {
            const $label = $('label[for="' + inputId + '"]');
            if (!$label.length) {
              // ACCESSIBILITY: Add aria-label if no label exists
              const placeholder = $input.attr('placeholder');
              if (placeholder) {
                $input.attr('aria-label', placeholder);
              }
            }
          }
        });
        
        // Add focus effects to inputs
        $targetContainer.find('input[type="text"], input[type="password"]').on('focus', function() {
          $(this).css('border-color', '#cfb87c');
        }).on('blur', function() {
          $(this).css('border-color', '#ddd');
        });
        
        // Style the submit button with institutional colors
        $targetContainer.find('input[type="submit"], button[type="submit"], .btn-primary').css({
          'background-color': '#cfb87c',
          'border': '2px solid #000',
          'color': '#000',
          'padding': '10px 20px',
          'font-weight': 'bold',
          'border-radius': '4px',
          'cursor': 'pointer',
          'transition': 'all 0.3s ease',
          'text-transform': 'uppercase',
          'letter-spacing': '0.5px',
          'width': '100%',
          'margin-top': '10px'
        });
        
        // Add hover effect to submit button
        $targetContainer.find('input[type="submit"], button[type="submit"], .btn-primary').hover(
          function() {
            $(this).css({
              'background-color': '#b5a373',
              'transform': 'translateY(-1px)',
              'box-shadow': '0 2px 8px rgba(0,0,0,0.15)'
            });
          },
          function() {
            $(this).css({
              'background-color': '#cfb87c',
              'transform': 'translateY(0)',
              'box-shadow': 'none'
            });
          }
        );
        
        // Style form labels
        $targetContainer.find('label').css({
          'font-weight': '600',
          'color': '#333',
          'margin-bottom': '5px',
          'display': 'block'
        });
        
        // Add some spacing between form groups
        $targetContainer.find('.form-group, p, div').each(function() {
          if ($(this).find('input, label').length) {
            $(this).css('margin-bottom', '15px');
          }
        });
        
        // If there's an error message, style it
        $targetContainer.find('.alert, .error, #login_error').css({
          'background-color': '#f8d7da',
          'border': '1px solid #f5c6cb',
          'color': '#721c24',
          'padding': '10px',
          'border-radius': '4px',
          'margin-bottom': '15px'
        }).attr('role', 'alert'); // ACCESSIBILITY: Add alert role for screen readers
        
        console.log("Staff login customization completed");
      }
    }
  }
  
  /**
   * FIXED Cover Display - Simplified image loading with better error handling
   */
  /**
   * Displays cover images for library items, providing enhanced loading and error handling.
   * Attempts to load cover images from multiple sources and falls back to a styled placeholder if all fail.
   *
   * This function finds all relevant cover image containers, tries to load images from prioritized sources,
   * and applies visual enhancements and accessibility improvements to both loaded images and placeholders.
   */
  function displayCoverImages() {
    console.log("Starting enhanced cover image display");
    
    // Find cover containers efficiently
    const containers = document.querySelectorAll('.cover-slider, [data-biblionumber], .local-coverimg, .cover-image, .item-thumbnail');
    
    if (!containers.length) {
      console.log("No cover containers found");
      return;
    }
    
    console.log(`Processing ${containers.length} cover containers`);
    
    containers.forEach((container, index) => {
      const biblionumber = container.dataset.biblionumber || 
                          container.getAttribute('data-biblionumber') ||
                          container.closest('[data-biblionumber]')?.dataset.biblionumber;
      
      if (biblionumber && container.innerHTML.trim() === '') {
        const title = container.dataset.title || 
                     container.getAttribute('data-title') ||
                     document.querySelector('h1.title')?.textContent?.trim() ||
                     document.querySelector('.title')?.textContent?.trim() ||
                     'Library Item';
        
        console.log(`Loading cover image ${index + 1} for biblionumber: ${biblionumber}, title: ${title}`);
        
        // Create container for cover image
        const coverContainer = document.createElement('div');
        coverContainer.className = 'item-thumbnail enhanced-cover';
        
        // Simplified cover sources - focusing on internal sources first
        const coverSources = [
          `/cgi-bin/koha/opac-image.pl?biblionumber=${biblionumber}`,
          `/cgi-bin/koha/opac-image.pl?thumbnail=1&biblionumber=${biblionumber}`
        ];
        
        let currentSourceIndex = 0;
        let imageLoaded = false;
        let timeoutId = null;
        
        function tryNextCoverSource() {
          if (imageLoaded) {
            return;
          } // Prevent multiple loads
          
          if (currentSourceIndex >= coverSources.length) {
            // All sources failed, create attractive placeholder
            createStyledPlaceholder(coverContainer, title);
            return;
          }
          
          const img = new Image();
          const currentSource = coverSources[currentSourceIndex];
          
          // Clear any existing timeout
          if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
          }
          
          // Set timeout for slow loading images
          timeoutId = setTimeout(() => {
            if (!imageLoaded && !img.complete) {
              console.log(`Timeout loading image from: ${currentSource}`);
              img.onload = null;
              img.onerror = null;
              currentSourceIndex++;
              tryNextCoverSource();
            }
          }, 1500);
          
          // Set up load handler
          img.onload = function() {
            if (imageLoaded) {
              return;
            } // Prevent race conditions
            
            clearTimeout(timeoutId);
            timeoutId = null;
            
            // Check if image is valid (not a 1x1 pixel error image)
            if (this.naturalWidth > 10 && this.naturalHeight > 10) {
              imageLoaded = true;
              // Valid image loaded
              coverContainer.innerHTML = `
                <div class="cover-image-wrapper" style="
                  position: relative;
                  border-radius: 8px;
                  overflow: hidden;
                  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                  transition: all 0.3s ease;
                  max-width: 150px;
                  margin: 0 auto;
                ">
                  <img src="${currentSource}" 
                       alt="${title}" 
                       title="${title}"
                       style="
                         width: 100%;
                         height: auto;
                         display: block;
                         max-height: 200px;
                         min-height: 150px;
                         object-fit: cover;
                       ">
                </div>
              `;
              
              // Add hover effect to image
              const wrapper = coverContainer.querySelector('.cover-image-wrapper');
              if (wrapper) {
                wrapper.addEventListener('mouseenter', function() {
                  this.style.transform = 'translateY(-2px) scale(1.02)';
                  this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
                });
                
                wrapper.addEventListener('mouseleave', function() {
                  this.style.transform = 'translateY(0) scale(1)';
                  this.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                });
              }
              
              console.log(`Successfully loaded cover image from: ${currentSource}`);
            } else {
              // Invalid image dimensions, try next source
              currentSourceIndex++;
              setTimeout(tryNextCoverSource, 100);
            }
          };
          
          // Set up error handler
          img.onerror = function() {
            if (imageLoaded) {
              return;
            }
            
            clearTimeout(timeoutId);
            timeoutId = null;
            
            console.log(`Failed to load image from: ${currentSource}`);
            // Failed to load, try next source
            currentSourceIndex++;
            setTimeout(tryNextCoverSource, 100);
          };
          
          // Start loading
          img.src = currentSource;
        }
        
        function createStyledPlaceholder(container, title) {
          if (imageLoaded) {
            return;
          }
          imageLoaded = true;
          
          container.innerHTML = `
            <div class="custom-cover" style="
              border: 2px solid #e0e0e0;
              padding: 15px;
              text-align: center;
              min-height: 150px;
              display: flex;
              align-items: center;
              justify-content: center;
              background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
              transition: all 0.3s ease;
              max-width: 150px;
              margin: 0 auto;
            ">
              <div style="
                font-size: 0.9em;
                color: #6c757d;
                font-weight: 500;
                line-height: 1.4;
                max-width: 120px;
                word-wrap: break-word;
              ">
                <span aria-hidden="true">📚</span><br>${title.length > 50 ? title.substring(0, 47) + '...' : title}
              </div>
            </div>
          `;
          
          // ACCESSIBILITY: Add screen reader text for placeholder
          const srText = document.createElement('span');
          srText.className = 'sr-only';
          srText.textContent = `Book cover placeholder for ${title}`;
          container.appendChild(srText);
          
          // Add hover effect to placeholder
          const placeholder = container.querySelector('.custom-cover');
          if (placeholder) {
            placeholder.addEventListener('mouseenter', function() {
              this.style.transform = 'translateY(-2px)';
              this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
            });
            
            placeholder.addEventListener('mouseleave', function() {
              this.style.transform = 'translateY(0)';
              this.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
            });
          }
          
          console.log(`Created placeholder for: ${title}`);
        }
        
        // Replace container content and start loading
        container.innerHTML = '';
        container.appendChild(coverContainer);
        
        // Start trying to load cover images with a small delay
        setTimeout(tryNextCoverSource, 50);
      }
    });
    
    // Also enhance existing cover images
    const existingImages = document.querySelectorAll('.local-coverimg img, .cover-image img, img[src*="opac-image.pl"]');
    existingImages.forEach(img => {
      if (!img.closest('.enhanced-cover')) {
        const wrapper = document.createElement('div');
        wrapper.className = 'cover-image-wrapper enhanced-existing';
        wrapper.style.cssText = `
          position: relative;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
          display: inline-block;
        `;
        
        img.style.cssText = `
          width: 100%;
          height: auto;
          display: block;
          border-radius: 8px;
        `;
        
        if (img.parentNode) {
          img.parentNode.insertBefore(wrapper, img);
          wrapper.appendChild(img);
        }
        
        // Add hover effect
        wrapper.addEventListener('mouseenter', function() {
          this.style.transform = 'translateY(-2px) scale(1.02)';
          this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
        });
        
        wrapper.addEventListener('mouseleave', function() {
          this.style.transform = 'translateY(0) scale(1)';
          this.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        });
      }
    });
    
    console.log("All cover images processed successfully");
  }
  
  /**
   * Hide RSS links and improve accessibility
   */
  /**
   * Improves accessibility and usability of interactive elements on the page.
   * Hides RSS links, manages keyboard focus styles, and ensures accessible names for interactive elements.
   *
   * This function also adds an aria-live region for dynamic updates to assist screen readers.
   */
  function improveAccessibility() {
    // Hide RSS links
    $('a.rss-list-link').hide();
    
    // ACCESSIBILITY: Enhanced keyboard focus management
    $('button, a, input[type="button"], input[type="submit"], .btn').each(function() {
      const $element = $(this);
      
      // ACCESSIBILITY: Add focus-visible class for keyboard navigation only
      $element.on('mousedown', function() {
        $(this).data('mouse-clicked', true);
      });
      
      $element.on('focus', function() {
        if (!$(this).data('mouse-clicked')) {
          $(this).addClass('keyboard-focused');
        }
      });
      
      $element.on('blur', function() {
        $(this).removeClass('keyboard-focused').removeData('mouse-clicked');
      });
      
      // ACCESSIBILITY: Ensure all interactive elements have accessible names
      if (!$element.attr('aria-label') && !$element.text().trim() && $element.find('i.fa').length) {
        // Icon-only buttons need aria-labels
        const iconClass = $element.find('i.fa').attr('class');
        if (iconClass) {
          if (iconClass.includes('fa-list')) {
            $element.attr('aria-label', 'Lists');
          }
          if (iconClass.includes('fa-bookmark')) {
            $element.attr('aria-label', 'Place hold');
          }
          if (iconClass.includes('fa-file')) {
            $element.attr('aria-label', 'Pages');
          }
          // Add more icon mappings as needed
        }
      }
    });
    
    // ACCESSIBILITY: Add aria-live region for dynamic updates
    if (!$('#aria-live-region').length) {
      $('body').append('<div id="aria-live-region" class="sr-only" aria-live="polite" aria-atomic="true"></div>');
    }
  }
  
  /**
   * Fix cover image alt text and titles
   */
  /**
   * Fixes and enhances alt text and title attributes for cover images.
   * Ensures all images have appropriate alt text for accessibility and updates titles for clarity.
   *
   * This function targets local cover images and other images lacking alt attributes, setting descriptive text as needed.
   */
  function fixImageAttributes() {
    const itemTitle = $('h1.title').text().trim() || $('.title').first().text().trim();
    
    if (itemTitle) {
      $('.local-coverimg img[alt="Local cover image"]').attr('alt', itemTitle);
      $('a[title="Local cover image"]').attr('title', itemTitle);
      $('a[href*="opac-imageviewer.pl"][title="Local cover image"]').attr('title', itemTitle);
    }
    
    // ACCESSIBILITY: Ensure all images have alt text
    $('img:not([alt])').each(function() {
      const $img = $(this);
      const src = $img.attr('src');
      if (src && src.includes('opac-image.pl')) {
        $img.attr('alt', 'Book cover');
      } else {
        $img.attr('alt', '');
      }
    });
  }
  
  /**
   * Registration form enhancements
   */
  /**
   * Enhances the user registration form with additional instructions, section headers, and validation.
   * Improves form organization, accessibility, and provides helpful guidance for users completing registration.
   *
   * This function also reorganizes address fields, adds validation for license numbers, and updates form styling.
   */
  function enhanceRegistrationForm() {
    // Add registration info alert
    const $registrationForm = $('#userregistration_form, .opac-user-registration, form[action*="opac-memberentry.pl"]');
    
    if ($registrationForm.length) {
      $registrationForm.prepend(`
        <div class="alert alert-info" role="alert">
          <h4>Loan Library Registration</h4>
          <p>Please complete this form to register your childcare program with our library. 
          All fields marked with an asterisk (*) are required. Your account will be reviewed by library staff before activation.</p>
        </div>
      `);
    }
    
    // Add section headers
    const sections = [
      { selector: '[id^="borrower_attribute_CHILDCARE_PROGRAM_NAME"]', title: 'Childcare Program Information' },
      { selector: '[id^="borrower_attribute_ROLE_POSITION"]', title: 'Your Role Information' },
      { selector: '[id^="borrower_attribute_LICENSE_NUMBER"]', title: 'Licensing Information' },
      { selector: '[id^="borrower_attribute_PROGRAM_ADDRESS"]', title: 'Program Address' },
      { selector: '[id^="borrower_attribute_PROGRAM_COUNTY"]', title: 'Program Affiliations' },
      { selector: '[id^="borrower_attribute_PROGRAM_DIRECTOR"]', title: 'Program Director Information' }
    ];
    
    sections.forEach(section => {
      const $element = $(section.selector).closest('.form-group');
      if ($element.length) {
        $element.before(`
          <div class="row">
            <div class="col-md-12">
              <h3 style="margin-top: 30px; padding-bottom: 10px; border-bottom: 1px solid #eee;">
                ${section.title}
              </h3>
            </div>
          </div>
        `);
      }
    });
    
    // Reorganize address fields
    const $cityField = $('[id^="borrower_attribute_PROGRAM_CITY"]').closest('.form-group');
    const $stateField = $('[id^="borrower_attribute_PROGRAM_STATE"]').closest('.form-group');
    const $zipField = $('[id^="borrower_attribute_PROGRAM_ZIP"]').closest('.form-group');
    
    if ($cityField.length && $stateField.length && $zipField.length) {
      $cityField.detach();
      $stateField.detach();
      $zipField.detach();
      
      $('[id^="borrower_attribute_PROGRAM_ADDRESS2"]').closest('.form-group').after(`
        <div class="row city-state-zip-row">
          <div class="col-md-4 city-col"></div>
          <div class="col-md-4 state-col"></div>
          <div class="col-md-4 zip-col"></div>
        </div>
      `);
      
      $('.city-col').append($cityField);
      $('.state-col').append($stateField);
      $('.zip-col').append($zipField);
    }
    
    // Add helpful instructions
    $('[id^="borrower_attribute_LICENSE_NUMBER"]').closest('.form-group')
      .append('<p class="help-block">Enter your program license number. Format: XXXXXXXXXX</p>');
    
    $('[id^="borrower_attribute_EARLY_CHILDHOOD_COUNCIL"]').closest('.form-group')
      .append('<p class="help-block">Enter the name of your affiliated Early Childhood Council.</p>');
    
    // Add form validation
    $(document).on('blur', '[id^="borrower_attribute_LICENSE_NUMBER"]', function() {
      const license = $(this).val();
      const licenseRegex = /^[A-Z0-9]{6,10}$/i;
      
      $(this).next('.field-error').remove();
      
      if (license && !licenseRegex.test(license)) {
        $(this).after('<span class="field-error text-danger" role="alert">Please enter a valid program license number</span>');
        // ACCESSIBILITY: Announce error to screen readers
        $('#aria-live-region').text('License number format is invalid');
      }
    });
    
    // Add submission notice
    $('.opac-user-registration').append(`
      <div class="alert alert-warning" role="alert" style="margin-top: 20px;">
        <strong>Please Note:</strong> After submission, your registration will be reviewed by library staff. 
        You will receive an email confirmation once your account has been approved.
      </div>
    `);
    
    // Improve form styling
    $('.opac-user-registration .form-group label').css('font-weight', 'bold');
    $('.opac-user-registration .form-group label:contains("*")').css('color', '#c00')
      .each(function() {
        // ACCESSIBILITY: Add required attribute and aria-required
        const forId = $(this).attr('for');
        if (forId) {
          $('#' + forId).attr('required', 'required').attr('aria-required', 'true');
        }
      });
  }
  
  /**
   * Update all UI text and labels
   */
  /**
   * Updates various UI text and labels throughout the interface for clarity and consistency.
   * Modifies search labels, headings, button text, and other interface elements to improve user experience.
   *
   * This function also updates placeholder text, navigation, and accessibility attributes where appropriate.
   */
  function updateUIText() {
    // Search interface updates
    $('label[for="translControl1"]').text('Search the entire library...');
    $('a[href="/cgi-bin/koha/opac-search.pl"]').text('Search by Training Topics');
    $('a[href="/cgi-bin/koha/opac-tags.pl"]').text('Search by Tags');
    
    // Headings updates
    $('h1:contains("Advanced search")').text('Browse any topic! To borrow items with full access, complete Universal Design and one other course of your choice.');
    $('span:contains("Advanced search")').text('Training Topics');
    $('legend:contains("Limit to any of the following:")').text('Select training topic:');
    
    // Hold/Request related updates
    $('span.actions a:contains("Place hold")').html('<i class="fa fa-fw fa-bookmark" aria-hidden="true"></i> Request this Item');
    $('.reserve.btn').html('<i class="fa fa-fw fa-bookmark" aria-hidden="true"></i> Request item');
    $('input[type="submit"].btn-primary.placehold').val('Confirm Request');
    $('span:contains("Placing a hold")').text('Item requested to borrow:');
    $('#holds h1').text('Item Requested for Borrow');
    $('#opac-user-holds-tab').text('Requests');
    
    // Update logo
    $('#logo a').replaceWith('<img src="https://via.placeholder.com/200x100/d4bc7d/ffffff?text=Demo+Library" alt="Demo Institution Library Home" style="height: 100px;">'); // ACCESSIBILITY: Better alt text
    
    // Update search results message
    $('#numresults').html('Not finding what you\'re looking for? Try searching by <a href="https://demo-library.org/cgi-bin/koha/opac-tags.pl" class="btn btn-link" id="specific-tags-link">Tags!</a>');
    
    // Placeholder text
    $('#translControl1').attr('placeholder', 'Enter search terms').attr('aria-label', 'Search the library catalog'); // ACCESSIBILITY: Better placeholder and aria-label
    
    // Navigation updates
    $('nav').find('a:contains("Advanced search")').text('Training Topics');
    
    // Holdings caption update
    $('#holdst > caption').contents().filter(function() {
      return this.nodeType === Node.TEXT_NODE;
    }).remove();
    $('#holdst > caption').append('Requests');
    
    // Login instructions
    const $noLoginInstructions = $('#nologininstructions');
    if ($noLoginInstructions.length > 0) {
      $noLoginInstructions.find('h2:first').text("Don't have a username or password?");
      $noLoginInstructions.find('p:first').html("Reach out to us at our email address, <a href='mailto:admin@example.org'>admin@example.org</a>.");
      $noLoginInstructions.find('h2:nth-of-type(2)').remove();
      $noLoginInstructions.find('p:nth-of-type(2)').remove();
    }
  }
  
  /**
   * Apply styling to various elements
   */
  /**
   * Applies custom styling to various elements on the page for a cohesive visual appearance.
   * Styles item types, buttons, containers, and navigation elements to match institutional branding.
   *
   * This function also adjusts layout and visual cues for interactive elements and groups.
   */
  function applyStyling() {
    // Item type styling
    $('.col-sm-6.col-lg-3').css({
      border: '1px solid rgba(0, 0, 0, 0.5)',
      padding: '10px',
      margin: '.5px'
    });
    
    $('.itypetext, .itemtype-image').css({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center'
    });
    
    // Holds container styling
    $('#holds').css({
      border: '3px solid black',
      padding: '20px',
      borderRadius: '5px',
      margin: '20px'
    });
    
    $('#holds form ul').css({
      listStyleType: 'disc',
      marginLeft: '20px'
    });
    
    $('#bigloop > div > fieldset > ul > li').css({
      listStyleType: 'circle',
      color: 'black'
    });
    
    // Button styling
    const buttonStyles = {
      backgroundColor: '#cfb87c',
      borderColor: '#000000',
      color: '#000'
    };
    
    $(document).on('mousedown focus mouseup mouseleave active', '.btn-primary', function() {
      $(this).css(buttonStyles);
    });
    
    // Button group styling
    $('.button-group').css({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '10px'
    });
    
    $('.button-group .btn').css({
      backgroundColor: 'rgb(207, 184, 124)',
      borderColor: 'rgb(0, 0, 0)',
      color: 'rgb(0, 0, 0)',
      boxShadow: 'rgb(207, 184, 124) 0px 0px 0px 2px'
    });
    
    // More searches styling
    $('#moresearches').css({
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      listStyleType: 'none',
      padding: '0'
    });
    
    $('#moresearches li.nav-item').css({
      margin: '0 1px'
    });
    
    // Tags link styling
    $('#specific-tags-link').css({
      fontSize: '1.1em',
      fontWeight: 'bold',
      color: '#0077bc',
      fontFamily: 'inherit',
      textDecoration: 'underline',
      cursor: 'pointer'
    });
  }
  
  /**
   * Hide/remove unwanted elements
   */
  /**
   * Hides or removes unwanted elements from the page to declutter the user interface.
   * Targets specific selectors for hiding or removal and marks hidden content for accessibility.
   *
   * This function also applies CSS-based hiding for certain elements and removes others from the DOM.
   */
  function hideUnwantedElements() {
    // Elements to hide
    const hideSelectors = [
      '#MARCview',
      '#ISBDview',
      'a[href="/cgi-bin/koha/opac-authorities-home.pl"]',
      'legend:contains("Search for:")',
      '#advsearch_form > div > div > div:nth-child(2) > fieldset',
      '#library_page',
      'span:contains("Item type")',
      '#advsearch-tab-itemtypes-tab',
      'td.numcol',
      'a[href="/cgi-bin/koha/opac-messaging.pl"]',
      '#format',
      '#cite'
    ];
    
    hideSelectors.forEach(selector => {
      try {
        $(selector).hide().attr('aria-hidden', 'true'); // ACCESSIBILITY: Mark hidden content
      } catch (e) {
        console.log('Error hiding selector:', selector, e);
      }
    });
    
    // Hide parent elements
    $('#MARCview, #ISBDview').parent().hide().attr('aria-hidden', 'true');
    $('#library_page').parent().hide().attr('aria-hidden', 'true');
    $('.nav-item').find('a[href="/cgi-bin/koha/opac-authorities-home.pl"]').parent().hide().attr('aria-hidden', 'true');
    $('#furthersearches').closest('li').hide().attr('aria-hidden', 'true');
    
    // Elements to remove
    const removeSelectors = [
      'a.toggle-hold-options',
      '#toggle-hold-options-2',
      '.hint',
      '#Normalview',
      '.search-term-row',
      '.col-12.col-lg-3.order-md-2',
      '#bibliodescriptions > ul > li:nth-child(3) > a',
      '.col-sm-auto.order-2.order-sm-2'
    ];
    
    removeSelectors.forEach(selector => {
      try {
        $(selector).remove();
      } catch (e) {
        console.log('Error removing selector:', selector, e);
      }
    });
    
    // Hide with CSS properties
    $('a#opac-user-article-requests-tab').closest('li.nav-item').css('display', 'none').attr('aria-hidden', 'true');
    $('.selections-toolbar').css('display', 'none').attr('aria-hidden', 'true');
    $('#sort_by').css('display', 'none').attr('aria-hidden', 'true');
  }
  
  /**
   * Enhance borrower request form
   */
  /**
   * Enhances the borrower request form with additional instructions and acknowledgements.
   * Adds new titles, subtitles, and agreement statements to clarify borrower responsibilities.
   *
   * This function also hides redundant headings and updates confirmation text for clarity.
   */
  function enhanceBorrowerRequest() {
    const $holdsContainer = $('#holds');
    if (!$holdsContainer.length) {
      return;
    }
    
    $holdsContainer.prepend(`
      <div class="new-title" style="font-size: 1.5em; font-weight: bold; text-align: center; margin-bottom: 5px;">
        Borrowers Acknowledgement
      </div>
      <div class="new-subtitle" style="font-size: 1.2em; text-align: center; margin-bottom: 15px; color: #555;">
        By confirming this request, you are acknowledging and agreeing to the following...
      </div>
    `);
    
    const $holdsForm = $('#holds form ul');
    if ($holdsForm.length) {
      $holdsForm.append(`
        <li>I understand and agree that I am responsible for borrowed equipment and I will return it to the Loan Library in the condition that I received it.</li>
        <li>I understand and agree that if Loan Library equipment is lost, or damaged beyond normal wear and tear, I may be held financially responsible.</li>
        <li>I understand and agree that if I fail to return items, or return items damaged beyond normal wear and tear, I may lose borrowing privileges.</li>
      `);
    }
    
    $holdsContainer.find('h1, h2').hide();
    
    // Handle confirmation text
    $('label input.confirmjs').parent().contents().filter(function() {
      return this.nodeType === 3;
    }).replaceWith(' Confirm request for item: ');
  }
  
  /**
   * Enhance suggestion form
   */
  /**
   * Enhances the suggestion form for users to recommend new items.
   * Replaces default fields with a custom set of fields and improves accessibility with proper labels and legends.
   *
   * This function also restructures the form layout for clarity and usability.
   */
  function enhanceSuggestionForm() {
    const form = document.getElementById('add_suggestion_form');
    if (!form) {
      return;
    }
    
    $(form).find('li').remove();
    
    const newFields = [
      { label: 'Item name :', type: 'text', name: 'item_name', id: 'item_name' },
      { label: 'Item cost :', type: 'text', name: 'item_cost', id: 'item_cost' },
      { label: 'Link to information about item :', type: 'text', name: 'item_link', id: 'item_link' },
      { label: 'Additional notes :', type: 'textarea', name: 'additional_notes', id: 'additional_notes' }
    ];
    
    const fieldset = $('<fieldset class="form-fieldset">');
    fieldset.append('<legend class="sr-only">Suggestion Form Fields</legend>'); // ACCESSIBILITY: Add legend for fieldset
    const ol = $('<ol class="form-list">');
    
    newFields.forEach(field => {
      const li = $('<li class="form-item">');
      const label = $(`<label for="${field.id}">${field.label}</label>`);
      
      let input;
      if (field.type === 'textarea') {
        input = $(`<textarea name="${field.name}" id="${field.id}" rows="5" cols="40" aria-label="${field.label.replace(' :', '')}"></textarea>`);
      } else {
        input = $(`<input type="${field.type}" name="${field.name}" id="${field.id}" class="span6" maxlength="255" aria-label="${field.label.replace(' :', '')}">`);
      }
      
      li.append(label, input);
      ol.append(li);
    });
    
    fieldset.append(ol);
    
    const $actionElement = $(form).find('.action');
    if ($actionElement.length) {
      $actionElement.before(fieldset);
    } else {
      $(form).append(fieldset);
    }
  }
  
  /**
   * Enhance user suggestions display
   */
  /**
   * Enhances the display of user suggestions for improved readability.
   * Removes unnecessary paragraphs and centers headings for a cleaner presentation.
   */
  function enhanceUserSuggestions() {
    const $userSuggestions = $('#usersuggestions');
    if (!$userSuggestions.length) {
      return;
    }
    
    $userSuggestions.find('p').remove();
    $userSuggestions.find('h1, h2').css('text-align', 'center');
  }
  
  /**
   * Add navigation enhancements
   */
  /**
   * Adds enhancements to the main navigation menu.
   * Appends a Home link to the navigation bar for easier access to the main page.
   */
  function enhanceNavigation() {
    const $nav = $('.nav');
    if ($nav.length) {
      $nav.append(`
        <li class="nav-item" style="box-shadow: none;">
          <a href="https://demo-library.org/cgi-bin/koha/opac-main.pl">Home</a>
        </li>
      `);
    }
  }
  
  /**
   * Responsive table handling (throttled for performance)
   */
  let tableHandlerActive = false;
  /**
   * Makes tables responsive for better usability on mobile devices.
   * Adjusts table rows and cells for small screens and enables row-based navigation.
   *
   * This function also restores the original table layout on larger screens.
   */
  function makeTableResponsive() {
    if ($(window).width() < 768) {
      $('.covercol').hide();
      
      $('.table.table-striped tr').not(':has(th)').each(function() {
        const $row = $(this);
        
        if (!$row.hasClass('mobile-card')) {
          $row.addClass('mobile-card').css({
            'display': 'block',
            'margin-bottom': '20px',
            'border': '1px solid #ddd',
            'border-radius': '8px',
            'padding': '10px',
            'box-shadow': '0 2px 5px rgba(0,0,0,0.1)',
            'background-color': '#fff'
          });
          
          $row.find('td').css({
            'display': 'block',
            'border': 'none',
            'padding': '5px'
          });
          
          $row.find('.title').css({
            'font-size': '1.1rem',
            'font-weight': 'bold',
            'display': 'block',
            'margin': '8px 0'
          });
          
          $row.css('cursor', 'pointer');
        }
      });
      
      if (!tableHandlerActive) {
        $(document).on('click', '.mobile-card', function(e) {
          if (!$(e.target).is('input, a, .btn')) {
            const detailLink = $(this).find('.title').attr('href');
            if (detailLink) {
              window.location.href = detailLink;
            }
          }
        });
        tableHandlerActive = true;
      }
    } else {
      $('.covercol').show();
      $('.mobile-card').removeClass('mobile-card').removeAttr('style');
      if (tableHandlerActive) {
        $(document).off('click', '.mobile-card');
        tableHandlerActive = false;
      }
    }
  }
  
  /**
   * Responsive button sizing
   */
  /**
   * Adjusts the size and position of the search button based on screen width.
   * Scales and repositions the button for optimal appearance on desktop and mobile devices.
   */
  function setButtonSize() {
    const $searchBtn = $('#searchsubmit');
    if (!$searchBtn.length) {
      return;
    }
    
    if (window.innerWidth >= 768) {
      $searchBtn.css('transform', 'translateY(22px) scale(1.2)');
    } else {
      $searchBtn.css('transform', 'translateY(10px) scale(1)');
    }
  }
  
  /**
   * Add back to top button for mobile
   */
  /**
   * Adds a "Back to Top" button for mobile users to quickly return to the top of the page.
   * Displays the button on scroll and provides smooth scrolling and focus management for accessibility.
   */
  function addBackToTopButton() {
    if ($('#backToTop').length) {
      return;
    }
    
    const $backToTopBtn = $(`
      <button id="backToTop" style="display:none; position:fixed; bottom:20px; right:20px; z-index:1000; 
              background-color:#007bff; color:white; border:none; border-radius:50%; 
              width:40px; height:40px; font-size:20px; cursor:pointer;" aria-label="Back to top">↑</button>
    `);
    
    $('body').append($backToTopBtn);
    
    $(window).on('scroll.backToTop', function() {
      const shouldShow = $(window).scrollTop() > 300 && $(window).width() < 768;
      $backToTopBtn.toggle(shouldShow);
    });
    
    $backToTopBtn.on('click', function() {
      $('html, body').animate({ scrollTop: 0 }, 500);
      // ACCESSIBILITY: Move focus to top of page
      $('#main').focus();
    });
  }
  
  /**
   * Reorganize elements layout
   */
  /**
   * Reorganizes layout elements for improved structure and readability.
   * Groups columns into rows and updates the container with the new layout.
   */
  function rearrangeElements() {
    const columns = document.querySelectorAll('.col-sm-6.col-lg-3');
    const container = document.querySelector('#advsearch-tab-itemtypes_panel fieldset');
    
    if (!columns.length || !container) {
      return;
    }
    
    const fragment = document.createDocumentFragment();
    
    for (let i = 0; i < columns.length; i += 3) {
      const row = document.createElement('div');
      row.className = 'row';
      
      for (let j = i; j < i + 3 && j < columns.length; j++) {
        row.appendChild(columns[j].cloneNode(true));
      }
      
      fragment.appendChild(row);
    }
    
    const existingRows = container.querySelectorAll('.row');
    existingRows.forEach(row => row.remove());
    container.appendChild(fragment);
  }
  
  /**
   * Debounce function for performance (fixed implementation)
   */
  /**
   * Returns a debounced version of the provided function to limit execution frequency.
   * Ensures the function is called only after a specified wait time has elapsed since the last invocation.
   *
   * Args:
   *   func: The function to debounce.
   *   wait: The number of milliseconds to wait before invoking the function.
   * Returns:
   *   A debounced function.
   */
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func.apply(this, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  /**
   * Modern DOM observer to replace deprecated DOMNodeInserted
   */
  let observer = null;
  /**
   * Sets up a MutationObserver to monitor DOM changes and trigger updates as needed.
   * Observes for added nodes and efficiently handles dynamic content updates.
   */
  function setupDOMObserver() {
    // Only observe if MutationObserver is available
    if (typeof MutationObserver !== 'undefined') {
      // Disconnect existing observer if any
      if (observer) {
        observer.disconnect();
      }
      
      observer = new MutationObserver(debounce(function(mutations) {
        let needsCoverUpdate = false;
        
        mutations.forEach(function(mutation) {
          if (mutation.type === 'childList') {
            mutation.addedNodes.forEach(function(node) {
              if (node.nodeType === Node.ELEMENT_NODE) {
                // Check if the added node or its children contain cover containers
                if (node.matches && (
                    node.matches('.cover-slider, [data-biblionumber], .local-coverimg, .cover-image, .item-thumbnail') ||
                    node.querySelector('.cover-slider, [data-biblionumber], .local-coverimg, .cover-image, .item-thumbnail')
                  )) {
                  needsCoverUpdate = true;
                }
              }
            });
          }
        });
        
        if (needsCoverUpdate) {
          console.log("DOM changes detected, updating cover images");
          setTimeout(displayCoverImages, 200);
        }
      }, 500));
      
      // Start observing
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
      
      console.log("DOM observer set up successfully");
    }
  }
  
  /**
   * MAIN INITIALIZATION - ENHANCED EXECUTION ORDER
   */
  function initializeEnhancements() {
    console.log("Starting enhanced UI with cover images and login customization");
    
    // Safe operations first
    improveAccessibility();
    fixImageAttributes();
    
    // Staff login customization - run early
    customizeStaffLogin();
    
    // Enhanced cover display WITH images - with a slight delay to ensure DOM is ready
    setTimeout(displayCoverImages, 100);
    
    // Form and UI enhancements
    enhanceRegistrationForm();
    updateUIText();
    applyStyling();
    hideUnwantedElements();
    enhanceBorrowerRequest();
    enhanceSuggestionForm();
    enhanceUserSuggestions();
    enhanceNavigation();
    rearrangeElements();
    
    // Responsive features
    makeTableResponsive();
    setButtonSize();
    addBackToTopButton();
    
    // Set up modern DOM observer
    setupDOMObserver();
    
    // Final button styling
    $('#searchsubmit').css('transform', 'translateY(-2.5px) scale(1.2)');
    
    console.log("All enhanced UI features completed with cover images and login customization");
  }
  
  // Initialize everything
  initializeEnhancements();
  
  // Debounced resize handler for performance
  const debouncedResize = debounce(function() {
    setButtonSize();
    makeTableResponsive();
  }, 100);
  
  $(window).on('resize', debouncedResize);
  
  // Debug: Find all instances of "Lists"
  console.log("=== Looking for Lists ===");
  
  // Check common locations
  $('a:contains("Lists")').each(function(){
    console.log("Found Lists in:", $(this).parent().html());
    console.log("Parent ID:", $(this).parent().parent().attr('id'));
    console.log("Parent Class:", $(this).parent().parent().attr('class'));
  });
  
  // Check specific common areas
  console.log("Nav bar:", $('#ulnav').html());
  console.log("Top menu:", $('.navbar-nav').html());
  console.log("More searches:", $('#moresearches').html());
  
  // Cleanup function to prevent memory leaks
  $(window).on('beforeunload', function() {
    if (observer) {
      observer.disconnect();
    }
    $(window).off('resize', debouncedResize);
    $(window).off('scroll.backToTop');
  });
  
  // ACCESSIBILITY: Add CSS for screen reader only content
  const style = document.createElement('style');
  style.textContent = `
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0,0,0,0);
      white-space: nowrap;
      border-width: 0;
    }
    
    .skip-link {
      position: absolute;
      top: -40px;
      left: 0;
      background: #000;
      color: #fff;
      padding: 8px;
      text-decoration: none;
      z-index: 100;
    }
    
    .skip-link:focus {
      top: 0;
    }
    
    .keyboard-focused {
      outline: 2px solid #0077cc !important;
      outline-offset: 2px !important;
    }
  `;
  document.head.appendChild(style);
}); 
