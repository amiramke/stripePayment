class PaymentsController < ApplicationController

  def index
    @payments = Payment.all
  end

  def show
  end

  def create
    # set your secret key: remember to change this to your live secret key in production
    # see your keys here https://manage.stripe.com/account
    Stripe.api_key = "sk_test_PCIdeoqevlIdaN8hvBwJP6uH"

    # get the credit card details submitted by the form
    logger.info(" create!!!!!!!!!!!!!!!!!!! ")
    logger.info(params)
    token = params[:stripeToken]

    # create the charge on Stripe's servers - this will charge the user's card
    charge = Stripe::Charge.create(
      :amount => 1200000, # amount in cents, again
      :currency => "usd",
      :card => token,
      :description => "payinguser@example.com"
    )
    logger.info charge
    @charge = charge
    @email  = params[:email]
    flash[:notice] = "You've sent money!"
    redirect_to payment_path(1)
  end
end
