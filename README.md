# To-Do List Web App

**Video Demo:** [Watch Demo Video Here](link_to_video)

## Description

The To-Do List Web App is a versatile task management application built using Flask, JavaScript, HTML, CSS, and SQLite. It offers an efficient and intuitive interface for organizing tasks, enhancing productivity, and enabling effective task tracking and management.

## Files and Functionality

### app.py

This file serves as the backbone of the application, leveraging Flask to handle server-side operations, define routing for different endpoints, and manage the SQLite database using SQLAlchemy.

#### Endpoints:

- `/`: Renders the main HTML page for the task management interface.
- `/tasks`:
  - `GET`: Retrieves tasks from the database based on sorting criteria and search keywords.
  - `POST`: Adds a new task to the database.
- `/tasks/<int:id>`:
  - `DELETE`: Deletes a specific task by its ID.
  - `PUT`: Updates task content or completion status.

### index.html

The HTML file structures the layout of the web interface, providing input fields for adding tasks, dropdowns for sorting, and a task list display area.

#### Elements:

- Task input field for adding new tasks.
- Dropdowns for sorting tasks by name or creation time.
- Search bar for keyword-based task search.
- Task list display area.

### styles.css

This file manages the visual presentation and styling of HTML elements, ensuring a clean and user-friendly interface across devices.

#### Styling:

- Defines the layout, padding, and margins for various HTML elements.
- Ensures responsiveness and compatibility across different screen sizes.

### scripts.js

The JavaScript file handles client-side interactions, AJAX requests, and dynamic rendering of tasks without needing to refresh the entire page.

#### Functions:

- Fetches tasks from the backend and renders them dynamically.
- Manages adding, updating, marking as done/undone, and deleting tasks asynchronously.
- Implements sorting, searching, and updating task content functionalities.

## Design Choices

- **Flask and SQLite:** Chosen for their simplicity and ease of integration, allowing for rapid development of the backend and database management.
- **AJAX for Dynamic Updates:** Utilized to create a seamless user experience by enabling real-time updates without page reloads.
- **Responsive Design:** Ensured the interface is adaptable to different devices for a consistent user experience.

## Future Improvements

- Implement user authentication for personalized task management.
- Enhance task categorization for better organization.
- Improve UI/UX by adding animations and additional functionalities.

## Contributors

- [Saba Farahnak] (@saba-farahnak)

Feel free to contribute, fork the repository, or raise issues to suggest improvements or report encountered issues. Your feedback and contributions are highly appreciated!
