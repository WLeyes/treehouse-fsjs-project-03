////////////////////////////////////
// Declare and assign variables

const $variables = () => {
  $container = $('.container');

  $basicInfo = {
    name: $('#name'),
    email: $('#mail'),
    title: $('#title'),
    titleOther: $('#other-title')
  };

  $shirt = {
    size: $('#size'),
    design: $('#design'),
    color: $('#color')
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
  $('fieldset').next().hide();
  // $('fieldset').next().next().hide();
  // Start with submit button disabled and greyed out
  // $submit.attr('disabled', true)
  //   .css({backgroundColor: 'lightgrey', color: 'darkgrey'});
});

const Validate = (element) => {
  switch(element.attr('id')){
    case 'name':
      if(element.val().length > 0) {
        element.css({border: '3px solid green', backgroundColor: 'lightgreen'});
      } else {
        element.css({border: '3px solid red', backgroundColor: 'pink'}).attr({placeholder: 'Required'});
      }
     break;
    case 'mail':
      // https://stackoverflow.com/questions/2507030/email-validation-using-jquery
      const regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      console.log(regex.test(element.val()));
      if(regex.test(element.val()) === true) {
        element.css({border: '3px solid green', backgroundColor: 'lightgreen'});
      } else {
        element.css({border: '3px solid red', backgroundColor: 'pink'}).attr({placeholder: 'Required'})
      }
  }
}

const Info = () => {
  $('input[type="text"]').on('focusout input', event => {
    event.preventDefault();
    let name = $(event.target);
    Validate(name);
  });
  $('input[type="email"]').on('focusout input', event => {
    event.preventDefault();
    let email = $(event.target);
    Validate(email);
  });
}

const Shirt = () => {
 
}

const Activities = () => {
 
}

const Payment = () => {
 
}

Info();
// todo: remove, test that my variables are correct
$submit.on('click', event => {
  event.preventDefault();
  // Info();
  Shirt();
  Activities();
  Payment();
});