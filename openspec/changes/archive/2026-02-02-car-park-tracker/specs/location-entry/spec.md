## ADDED Requirements

### Requirement: User can enter building name
The system SHALL provide an input field for users to enter the car park building name.

#### Scenario: Valid building name entry
- **WHEN** user enters a building name with 1-100 characters
- **THEN** system accepts the input and enables the save button

#### Scenario: Empty building name
- **WHEN** user attempts to save without entering a building name
- **THEN** system prevents submission and displays a validation message

### Requirement: User can enter parking level
The system SHALL provide an input field for users to enter the parking level.

#### Scenario: Valid level entry
- **WHEN** user enters a level (text or number)
- **THEN** system accepts the input and enables the save button

#### Scenario: Empty level
- **WHEN** user attempts to save without entering a level
- **THEN** system prevents submission and displays a validation message

### Requirement: User can save parking location
The system SHALL provide a button to save the entered parking location.

#### Scenario: Successful save
- **WHEN** user enters valid building and level and clicks save
- **THEN** system saves the record with current timestamp and clears the form

#### Scenario: Save with timestamp
- **WHEN** user saves a parking location
- **THEN** system automatically records the current date and time with the entry

### Requirement: Form is mobile-optimized
The system SHALL display input fields and buttons optimized for mobile touch interfaces.

#### Scenario: Touch-friendly inputs
- **WHEN** user views the form on a mobile device
- **THEN** input fields are large enough for easy touch interaction (minimum 44px tap target)

#### Scenario: Mobile keyboard
- **WHEN** user taps on an input field
- **THEN** system displays the appropriate mobile keyboard
