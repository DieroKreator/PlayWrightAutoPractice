Feature: Error validations
  
  Scenario: Placing an Order
    Given a login to Ecommerce2 application with "tmoura@gmail.com" and "Iamking@000"
    Then Verify Error message is displayed
