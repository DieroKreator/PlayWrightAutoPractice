Feature: Ecommerce validations

  @Regression
  Scenario: Placing an Order
    Given a login to Ecommerce application with "tmoura@gmail.com" and "Iamking@000"
    When Add "ZARA COAT 3" to Cart
    Then Verify "ZARA COAT 3" is displayed in Cart
    When Enter valid details and place the order
    Then Verify order is present in Order history
