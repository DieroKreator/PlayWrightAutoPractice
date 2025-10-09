Feature: Error validations
  
  @Validation
  @foo
  Scenario Outline: Placing an Order
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify Error message is displayed

    Examples:
      | username          | password     |
      | anshika@gmail.com | Iamking@000  |
      | tmoura@gmail.com  | Iamking@000  |