////////////////////////////////////
// Declare and assign variables

const $variables = () => {
  $container = $('.container');
  $fieldset = {
    shirt:      $('fieldset:nth-of-type(2)'),
    activities: $('fieldset:nth-of-type(3)'),
    payment:    $('fieldset:nth-of-type(4)')
  }

  $basicInfo = {
    name:       $('#name'),
    email:      $('#mail'),
    title:      $('#title'),
    titleOther: $('#other-title')
  };

  $shirt = {
    size:        $('#size'),
    design:      $('#design'),
    color:       $('#color'),
    colorOption: $('#color option')
  };

  $payment = {
    creditCardDiv: $('#credit-card'),
    paypalDiv:     $('#credit-card').next(),
    bitcoinDiv:    $('#credit-card').next().next(),
    paymentSelect: $('#payment'),
    creditCard:    $('#cc-num'),
    zipCode:       $('#zip'),
    cvv:           $('#cvv'),
    month:         $('#exp-month'),
    year:          $('#exp-year')
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

const background = () => {
  $('body').css({ width:'100%', height: '100%',
    background: `linear-gradient(to bottom right,
    rgb( ${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)} ),
    rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})
  ) no-repeat fixed center`})
}
background();
setInterval(background,5000);

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
    } else {
      if($('.error')){
        $('.error').remove();
      }
      $(this).css({border: '3px solid red', backgroundColor: 'pink'}).attr({placeholder: 'Required'}).attr({'data-valid': 'false'});
      $($fieldset.shirt).hide();
    }
  });

  // Listen for both valid name and email before displaying next section (TShirt selection)
  $('input').on('input change' , function(event) {
    if( $('input[type="text"]').attr('data-valid') === 'true' && $('input[type="email"]').attr('data-valid') === 'true'){
      $fieldset.shirt.fadeIn(1000);
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
      $fieldset.activities.fadeIn(1000);
      $($fieldset.activities).prepend('<div class="error">Please select at least 1 activity</div>');
      // If heart is selected
    } else if($($shirt.design).val() === 'heart js'){
      if($($error)){
        $($error).remove();
      }
      $($shirt.color).prev().fadeIn(1000);
      $($shirt.color).fadeIn(1000);
      $('#color option').attr("selected", false).hide();
      $('#color option:contains("♥")').attr("selected", true).show();
      $fieldset.activities.fadeIn(1000);
      $($fieldset.activities).prepend('<div class="error">Please select at least 1 activity</div>');
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
  
  // Change the form backgrounf color on change
  $('#color').on('change', function() {
    $('form').css({background: `${ $('#color option:selected').val() }`});
    console.log($('#color option:selected').val());
  });
}

// adjust form style
$('form').css({borderRadius: '20px'});

const Activities = () => {  
    let total = 0;
    $(':checkbox').on('click', function() {
      if($($error)){
        $($error).remove();
      }
      let array = parseInt($(`input[name="${$(this).attr('name')}"`).parent().text().split('$')[1]);
      let temp = $(`input[name="${$(this).attr('name')}"]`).parent().text().split('—');
      let containValue = temp[1].split(',')[0];

      // if checkbox is clicked add to total
      if($(`input[name="${$(this).attr('name')}"`).is(':checked')){
        total += array;
        
        // check each checkbox against the selected to see if it contains same date and time, if so disable
        $(`label:contains("${containValue}")`).children().attr("disabled", true);
        $(`label:contains("${containValue}")`).attr("disabled", true).css({color: 'red'});
        $(this).attr("disabled", false).parent().css({color: 'green'});
      } else {
        $(`label:contains("${containValue}")`).attr("disabled", true).css({color: '#000'});
        $(`label:contains("${containValue}")`).children().attr("disabled", false);
        total -= array;
      }
      // remove running total div
    if($('.total')){
      $('.total').remove();
    }
    if(total == 0){
      if($($error)){
        $($error).remove();
      }
      $($fieldset.activities).prepend('<div class="error">Please select at least 1 activity</div>');
      $fieldset.payment.hide();
    } else {
      $($fieldset.payment).fadeIn(1000)
    }
    // add updated total to DOM
    $fieldset.activities.append(`<div class="total">Total: $${total}.00</div>`);
  });
  // add initial total to DOM
  $fieldset.activities.append(`<div class="total">Total: $${total}.00</div>`);
}

const Payment = () => {
//  hide payment sections
 $payment.creditCardDiv.hide()
 $payment.paypalDiv.hide();
 $payment.bitcoinDiv.hide();

 $payment.zipCode.hide();
 $payment.zipCode.parent().hide();

 $payment.cvv.hide();
 $payment.cvv.parent().hide();
 
$payment.month.hide();
$payment.month.prev().hide();

$payment.year.hide();
$payment.year.prev().hide();

 $(`[value="select_method"]`).attr("disabled", true);
 $(`[value="credit card"]`).attr("selected",true);

//  toggle to show credit card input
  if($($payment.paymentSelect).val() === 'credit card'){
    if($($error)){
      $($error).remove();
    }
    $payment.creditCardDiv.show();
  }
  // Payment method select
  $($payment.paymentSelect).on('change', function() {
    if($('#payment :selected').val() === 'credit card'){
      if($($error)){
        $($error).remove();
      }
      $payment.paypalDiv.hide();
      $payment.bitcoinDiv.hide();
      $payment.creditCardDiv.fadeIn(1000);
      
    } else if($('#payment :selected').val() === 'paypal'){
      if($($error)){
        $($error).remove();
      }
      $payment.creditCardDiv.hide();
      $payment.bitcoinDiv.hide();
      $payment.paypalDiv.fadeIn(1000);
      $($submit).show();
    } else if($('#payment :selected').val() === 'bitcoin'){
      if($($error)){
        $($error).remove();
      }
      $payment.creditCardDiv.hide();
      $payment.paypalDiv.hide();
      $payment.bitcoinDiv.fadeIn(1000);
      $($submit).show().attr("disabled", true);
    } else {
      if($($error)){
        $($error).remove();
      }
      $payment.creditCardDiv.hide();
      $payment.paypalDiv.hide();
      $payment.bitcoinDiv.hide();
      $($submit).hide();
    }
  });

  $($payment.creditCard).on('focusout input', function(event) {
    event.preventDefault();
    // Check that cc # is between 13 and 16 digits long
    if($(this).val().length >= 13 && $(this).val().length <= 16 && $(this).val().match(/^\d+$/)) {
      if($($error)){
        $($error).remove();
      }
      $(this).css({border: '3px solid green', backgroundColor: 'lightgreen'}).attr({'data-valid': 'true'});
      $payment.zipCode.fadeIn(1000);
      $payment.zipCode.parent().fadeIn(1000);
      // check if only digits
    } else if(!$(this).val().match(/^\d+$/)){
      if($($error)){
        $($error).remove();
      }
      $(this).css({border: '3px solid red', backgroundColor: 'pink'}).attr({placeholder: 'Required'}).attr({'data-valid': 'false'});
      $fieldset.payment.prepend('<div class="error">Card must only contain digits</div>');
    } else {
      if($($error)){
        $($error).remove();
      }
      $payment.zipCode.hide();
      $payment.zipCode.parent().hide();
      $(this).css({border: '3px solid red', backgroundColor: 'pink'}).attr({placeholder: 'Required'}).attr({'data-valid': 'false'});
      if($(this).val().length < 13 || $(this).val().length > 16){
        $fieldset.payment.prepend('<div class="error">Card must be between 13 and 16 digits</div>');
      }
    }
    
  });

  $($payment.zipCode).on('focusout input', function(event) {
    event.preventDefault();
    // Check that zip is between 5 and 7 digits long
    if($(this).val().length >= 5 && $(this).val().length <= 7) {
      if($($error)){
        $($error).remove();
      }
      $(this).css({border: '3px solid green', backgroundColor: 'lightgreen'}).attr({'data-valid': 'true'});
      $payment.cvv.fadeIn(1000);
      $payment.cvv.parent().fadeIn(1000);
    } else {
      if($($error)){
        $($error).remove();
      }
      $payment.cvv.hide();
      $payment.cvv.parent().hide();
      $(this).css({border: '3px solid red', backgroundColor: 'pink'}).attr({placeholder: 'Required'}).attr({'data-valid': 'false'});
      if($(this).val().length < 5 || $(this).val().length > 7){
        $fieldset.payment.prepend('<div class="error">Zip/Postal code must be between 5 and 7 characters</div>');
      }
    }
    // check if only digits
    if(!$(this).val().match(/^\d+$/)){
      if($($error)){
        $($error).remove();
      }
      $(this).css({border: '3px solid red', backgroundColor: 'pink'}).attr({placeholder: 'Required'}).attr({'data-valid': 'false'});
      $fieldset.payment.prepend('<div class="error">Card must only contain digits</div>');
    }
  });

  $($payment.cvv).on('focusout input', function(event) {
    event.preventDefault();
    // Check that cvv equals 3 digits
    if($(this).val().length === 3) {
      if($($error)){
        $($error).remove();
      }
      $(this).css({border: '3px solid green', backgroundColor: 'lightgreen'}).attr({'data-valid': 'true'});
      $payment.month.fadeIn(1000);
      $payment.month.prev().fadeIn(1000);
      $payment.year.delay(1000).fadeIn(1000);
      $payment.year.prev().delay(1000).fadeIn(1000);
      
      $fieldset.payment.prepend('<div class="error">Please select expiry date</div>');
    } else {
      if($($error)){
        $($error).remove();
      }
      $payment.month.hide();
      $payment.month.prev().hide();
      $payment.year.hide();
      $payment.year.prev().hide();
      $submit.hide();
      $(this).css({border: '3px solid red', backgroundColor: 'pink'}).attr({placeholder: 'Required'}).attr({'data-valid': 'false'});
      if($(this).val().length < 5 || $(this).val().length > 7){
        $fieldset.payment.prepend('<div class="error">cvv must be 3 digits long</div>');
      }
    }
    // check if only digits
    if(!$(this).val().match(/^\d+$/)){
      if($($error)){
        $($error).remove();
      }
      $(this).css({border: '3px solid red', backgroundColor: 'pink'}).attr({placeholder: 'Required'}).attr({'data-valid': 'false'});
      $fieldset.payment.prepend('<div class="error">Card must only contain digits</div>');
    }
  });
  $($payment.creditCardDiv).on('change', function() {
    
    if($('#exp-month > option:selected') || $('#exp-year > option:selected')){
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth(); 
      if($($error)){
        $($error).remove();
      }
      if( $($payment.year).val() < currentYear){
        if($($error)){
          $($error).remove();
        }
        $fieldset.payment.prepend(`<div class="error">Your card is expired: ${ $($payment.year).val() } - ${ $('#exp-month option:selected').html() }</div>`);
      } else if( $($payment.month).val() < currentMonth && $($payment.year).val() == currentYear) {
        if($($error)){
          $($error).remove();
        }
        $fieldset.payment.prepend(`<div class="error">Your card is expired: ${ $($payment.year).val() } - ${ $('#exp-month option:selected').html() }</div>`);
      } else {
        $submit.fadeIn(1000);
      }
      console.log($payment.year.val(), $payment.month.val());
    console.log(currentYear, currentMonth)
    }
  });
}

Info();
Shirt();
Activities();
Payment();


$submit.on('click', event => {
  event.preventDefault();
  $('form').html('<div>Your personal information has been <span class="green">submitted</span> to the "Dark web" and sold to the highest bidder!!</div>')
    .attr('disabled', true)
    .css({backgroundColor: 'grey', color: '#fff', borderRadius: '10px', fontSize: '1.5em',cursor: 'default'});
    
    let seconds = 10;
    setInterval(()=>{
      if($($error)){
        $($error).remove();
      }
      seconds--
      $('form').append(`<div class="error">Self desrtucting in ${seconds} seconds!</div>`)
      if(seconds == 0){
        location.reload();
      }
    },1000);
});