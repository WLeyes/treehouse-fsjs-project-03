////////////////////////////////////
// Declare and assign variables

const $variables = () => {
  $container = $('.container');
  $fieldset = {
    shirt: $('fieldset:nth-of-type(2)'),
    activities: $('fieldset:nth-of-type(3)'),
    payment: $('fieldset:nth-of-type(4)')
  }

  $basicInfo = {
    name: $('#name'),
    email: $('#mail'),
    title: $('#title'),
    titleOther: $('#other-title')
  };

  $shirt = {
    size: $('#size'),
    design: $('#design'),
    color: $('#color'),
    colorOption: $('#color option')
  };

  $activities = {
    checked: $(':checked')
  };

  $payment = {
    creditCard: $('#cc-num'),
    zipCode: $('#zip'),
    cvv: $('#cvv'),
    month: $('#exp-month'),
    year: $('#year')
  };

  $submit = $('button[type="submit"]');
  $error = '.error';
}
// call variables
$variables();

// Document Ready
$(document).ready(function () {
  console.log('Connected to script.js');

  // set focus to first input
  $('form input:text').first().focus();

  // hide all elements that need to be hidden
  $basicInfo.titleOther.hide();
  $($fieldset.shirt).hide();
  $($fieldset.activities).hide();
  $($fieldset.payment).hide();
  $($submit).hide();
});


const Info = () => {
  // Set my validation tracker to false
  $('input').attr({'data-valid': 'false'})

  // check that name input is not empty
  $('input[type="text"]').on('focusout input' , function(event) {
    event.preventDefault();
    if($(this).val().length > 0) {
      $(this).css({border: '3px solid green', backgroundColor: 'lightgreen'}).attr({'data-valid': 'true'});
    } else {
      $(this).css({border: '3px solid red', backgroundColor: 'pink'}).attr({placeholder: 'Required'}).attr({'data-valid': 'false'});
    }
  });
  
  // check and validate email
  $('input[type="email"]').on('focusout input' , function(event) {
  event.preventDefault();
  // check if email is valid
  if($('input[type="email"]').val() !== '') {
    const regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;// https://stackoverflow.com/questions/2507030/email-validation-using-jquery
      if(regex.test($(this).val()) === true) {
        if($('.error')){
          $('.error').remove();
        }
        $(this).css({border: '3px solid green', backgroundColor: 'lightgreen'}).attr({'data-valid': 'true'});
      } else {
        $(this).css({border: '3px solid red', backgroundColor: 'pink'}).attr({placeholder: 'Required'}).attr({'data-valid': 'false'});
        if($($error)){
          $($error).remove();
        }
        $($fieldset.shirt).append('<div class="error">Please add valid email</div>');
      }
    }
  });

  // Listen for both valid name and email before displaying next section (TShirt selection)
  $('input').on('input' , function(event) {
    if( $('input[type="text"]').attr('data-valid') === 'true' && $('input[type="email"]').attr('data-valid') === 'true'){
      $fieldset.shirt.fadeIn(2000);
    }
  });

  //  if job role other is selected 
  $($basicInfo.title).on('change', function() {
    if($(':selected').val() === 'other'){
      $basicInfo.titleOther.fadeIn(1000);  
    } else {
      $basicInfo.titleOther.hide(); 
    }
  });

}

const Shirt = () => {
  // Hide color label
  $($shirt.color).prev().hide();
  // Hide color
  $($shirt.color).hide();

  $('#color option').hide();
  // Listen for design change
  $($shirt.design).on('change', function() {
    // Display color if design is selected
    if($($shirt.design).val() === 'js puns'){
      if($($error)){
        $($error).remove();
      }
      $($shirt.color).prev().fadeIn(1000);
      $($shirt.color).fadeIn(1000);
      // If puns is selected
      $('#color option').attr("selected", false).hide();
      $('#color option:contains("Puns")').attr("selected", true).show();

      $fieldset.activities.fadeIn(2000);
      
      // If heart is selected
    } else if($($shirt.design).val() === 'heart js'){
      if($($error)){
        $($error).remove();
      }
      $($shirt.color).prev().fadeIn(1000);
      $($shirt.color).fadeIn(1000);
      $('#color option').attr("selected", false).hide();
      $('#color option:contains("♥")').attr("selected", true).show();

      $fieldset.activities.fadeIn(2000);

    } else {
      if($($error)){
        $($error).remove();
      }
      // Hide color label
      $($shirt.color).prev().hide();
      // Hide color
      $($shirt.color).hide();
  
      $fieldset.activities.hide();
      // error
      if( $($shirt.design).val() === 'Select Theme'){
        $($fieldset.shirt).append('<div class="error">Please select a shirt design</div>');
      }
    }
  });
}

const Activities = () => {
 
}

const Payment = () => {
 
}

Info();
Shirt();
// todo: remove, test that my variables are correct
$submit.on('click', event => {
  event.preventDefault();
  // Info();
  Shirt();
  Activities();
  Payment();
});