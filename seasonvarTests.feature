Feature: Saesonvar testing
  I should be able to log in to Saesonvar, search by some text and be able to go to they vk page

  Scenario: Log In to Saesonvar
    When I log in using Username as "1" and Password as "1"
    Then there should appear an element containing "Меню\nНа чем остановились" text

  Scenario: Searching by some text
    When I log in using Username as "1" and Password as "1"
    And I input "some text" in searching field
    And I push search button
    Then I should be on the searching results page where should be element with text 'Найдено по запросу 'some text': number of results'

  Scenario: Going to vk page
    When I log in using Username as "1" and Password as "1"
    And I push on vk icon on site
    Then I should be on the vk site, seasonvar page
