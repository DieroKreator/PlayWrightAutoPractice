Feature: Ecommerce validations

  @Regression
  @foo
  Scenario: Placing an Order
    Given a login to Ecommerce application with "tmoura@gmail.com" and "Iamking@000"
    When Add "ZARA COAT 3" to Cart
    Then Verify "ZARA COAT 3" is displayed in Cart
    When Enter valid details and place the order
    Then Verify order is present in Order history

  @Validation
  @foo
  Scenario Outline: Placing an Order
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify Error message is displayed

    Examples:
      | username          | password     |
      | anshika@gmail.com | Iamking@000  |
      | tmoura@gmail.com  | Iamking@000  |