## ADDED Requirements

### Requirement: User can view current parking location
The system SHALL display the most recent parking location prominently on the page.

#### Scenario: Display current location
- **WHEN** user has at least one saved parking record
- **THEN** system displays the building name and level from the most recent record

#### Scenario: Display timestamp
- **WHEN** system displays the current parking location
- **THEN** system shows when the location was saved in a human-readable format

#### Scenario: No parking location saved
- **WHEN** user has no saved parking records
- **THEN** system displays a message indicating no location is currently saved

### Requirement: User can view parking history
The system SHALL provide a way to view all previous parking locations.

#### Scenario: Display history list
- **WHEN** user views parking history
- **THEN** system displays all parking records ordered from most recent to oldest

#### Scenario: Each history entry shows details
- **WHEN** system displays parking history
- **THEN** each entry shows building name, level, and timestamp

#### Scenario: Empty history
- **WHEN** user has no saved parking records
- **THEN** system displays a message indicating no parking history exists

### Requirement: History is accessible on mobile
The system SHALL make parking history easily accessible on mobile devices.

#### Scenario: History section visibility
- **WHEN** user views the app on a mobile device
- **THEN** history section is accessible without excessive scrolling

#### Scenario: History entries are readable
- **WHEN** user views parking history on mobile
- **THEN** each entry is displayed with adequate spacing and font size for mobile readability

### Requirement: Current location is visually distinct
The system SHALL visually distinguish the current parking location from historical entries.

#### Scenario: Current location prominence
- **WHEN** user views the page
- **THEN** current parking location is displayed more prominently than history entries

#### Scenario: Visual hierarchy
- **WHEN** user views both current location and history
- **THEN** current location uses larger text or distinct styling to indicate it is the active parking spot
