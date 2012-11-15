// this identifies your website in the createToken call below
Stripe.setPublishableKey('pk_test_AoO5Q0rmkHq6iU8uoTJXlc1z');

function stripeResponseHandler(status, response) {
  console.log("status: " + status);
  console.log("response paid: " + response.paid);
  if (response.error) {
    alert("errors!");
    // re-enable the submit button
    $('.submit-button').removeAttr("disabled");
    // show the errors on the form
    $(".payment-errors").html(response.error.message);
  } else {
    alert("success!");
    var form$ = $("#payment-form");
    // token contains id, last4, and card type
    var token = response['id'];
    // insert the token into the form so it gets submitted to the server
    form$.append("<input type='hidden' name='stripeToken' value='" + token + "' />");
    // and submit
    form$.get(0).submit();
  }
}

$(document).ready(function() {
  var validator = $("#payment-form").validate({
    rules: {
      firstname: {
        required: true,
        minlength: 5,
        maxlength: 25
      },
      lastname: {
        required: true,
        minlength: 5,
        maxlength: 25
      },
      city: {
        minlength: 5,
        maxlength: 25
      },
      state: {
        minlength: 5,
        maxlength: 25
      },
      zip: {
        digits: true,
        minlength: 5,
        maxlength: 5,
      },
      phone: {
        phoneUS: true
      },
      email: {
        required: true,
        email: true
      }
    },
    messages: {
      firstname: {
        required: "Enter your first name",
        minlength: jQuery.format("Enter at least {0} characters"),
        maxlength: jQuery.format("Enter at most {0} characters")
      },
      lastname: {
        required: "Enter your last name",
        minlength: jQuery.format("Enter at least {0} characters"),
        maxlength: jQuery.format("Enter at most {0} characters")
      },
      city: {
        minlength: jQuery.format("Enter at least {0} characters"),
        maxlength: jQuery.format("Enter at most {0} characters")
      },
      state: {
        minlength: jQuery.format("Enter at least {0} characters"),
        maxlength: jQuery.format("Enter at most {0} characters")
      },
      zip: {
        digits: "Enter only digits",
        minlength: jQuery.format("Enter exactly {0} characters"),
        maxlength: jQuery.format("Enter exactly {0} characters")
      },
      phone: {
        phoneUS: "Enter a valid phone number"
      },
      email: {
        required: "Enter your email",
        email: "Enter a valid email"
      }
    }
  });

  $("#payment-form").submit(function(event) {
    // disable the submit button to prevent repeated clicks
    $('.submit-button').attr("disabled", "disabled");

    Stripe.createToken({
        number: $('.cc_number').val(),
        cvc: $('.cc_cvc').val(),
        exp_month: $('.cc_exp_month').val(),
        exp_year: $('.cc_exp_year').val()
    }, stripeResponseHandler);

    // prevent the form from submitting with the default action
    return false;
  });
});