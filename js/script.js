////////////////////////////////////
// Declare and assign variables

const $variables = () => {
  $container = $('.container')

  $basicInfo = {
    name: $('#name'),
    email: $('#mail'),
    title: $('#title'),
    titleOther: $('#other-title')
  }

  $shirtInfo = {
    size: $('#size'),
    design: $('#design'),
    color: $('#color')
  }

  $activities = {
    checked: $(':checked')
  }

  $payment = {
    creditCard: $('#cc-num'),
    zipCode: $('#zip'),
    cvv: $('#cvv'),
    month: $('#exp-month'),
    year: $('#year')
  }

  $submit = $('button[type="submit"]')

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
});

// todo: remove, test that my variables are correct
$submit.on('click', event =>{
  event.preventDefault();
  console.log(
    $basicInfo.name.val(),
    $basicInfo.email.val(),
    $basicInfo.title.val(),
    $basicInfo.titleOther.val(),
  );
});