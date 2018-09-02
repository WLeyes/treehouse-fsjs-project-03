$(document).ready(function () {
  console.log('Connected to script.js');
  // set focus to first input
  $('form input:text').first().focus();
  // hide all elements that need to be hidden
});

const formVariables = () => {

  $basic = {
    name: $('#name'),
    email: $('#email'),
    title: $('#title'),
    titleOther: $('#other-title')
  },

  $shirt = {
    size: $('#size'),
    design: $('#design'),
    color: $('#color')
  },

  $activities = {
    check: $(':checked')
  }

  $payment = {
    creditCard: $('#cc-num'),
    zip: $('#zip'),
    cvv: $('#cvv'),
    month: $('#exp-month'),
    year: $('#year')
  }

  $form = { 
    submit: $('button[type="submit"]')
  }
}