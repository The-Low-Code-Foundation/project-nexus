# Project Specification: Visual Low-Code App Builder

## Overview

The **Visual Low-Code App Builder** is a browser-based application designed to allow users to visually create web applications by dragging and connecting components and logic nodes. The builder will output a JSON configuration representing the structure and logic of the app. This JSON configuration will then be dynamically compiled into a Next.js application for previewing and deployment.

### Key Features
- **Visual Canvas**: A drag-and-drop interface to create components and connect them with wires to represent data and signal flow.
- **Logic and UI Nodes**: Support for both visual components (e.g., buttons, headers) and logic components (e.g., conditional checks, loops).
- **JSON Output**: The canvas will output a JSON configuration detailing nodes, connections, and properties.
- **Live Preview**: A live preview area dynamically compiles the JSON into a Next.js app rendered in the browser.
- **Final Export**: Users can export the generated application as a standalone Next.js project.

---

## Technical Stack

### Frameworks and Libraries
- **Next.js**: For rendering the final compiled applications and leveraging hybrid static/dynamic rendering for performance and SEO.
- **MUI (Material-UI)**: For building a consistent and professional user interface, including sidebars, modals, and controls.
- **React Flow**: For implementing the drag-and-drop canvas with node and connection management.
- **React & JavaScript**: Core technologies for app logic and interactivity.
- **JSON**: The intermediary format used for app definition and data transfer.

---

## Functional Requirements

### 1. **Canvas**
- A visual, drag-and-drop editor.
- Supports placement of both UI and logic nodes.
- Connections between nodes represented with wires.
- Zoom and pan functionality for the canvas.

### 2. **Node Types**
- **UI Nodes**:
  - Buttons
  - Text fields
  - Headers
  - Images
- **Logic Nodes**:
  - Conditionals (if/else)
  - Loops (for, while)
  - API Calls
- **Event Nodes**:
  - OnClick
  - OnSubmit

### 3. **JSON Serialization**
- Serialize the state of the canvas (nodes, edges, properties) into a JSON format.
- JSON Schema Example:
  ```json
  {
    "nodes": [
      { "id": "1", "type": "header", "props": { "text": "Hello World" } },
      { "id": "2", "type": "button", "props": { "text": "Click Me" } }
    ],
    "edges": [
      { "source": "2", "target": "1" }
    ]
  }
### 4\. **Live Preview**

-   Parse JSON into a Next.js React application.
-   Dynamically render components based on the parsed JSON.
-   Use an iframe to display the preview alongside the editor.

### 5\. **Export Functionality**

-   Generate a complete Next.js project based on the JSON.
-   Allow users to download the project as a `.zip` file.

* * * * *

UI/UX Design
------------

### Layout

-   **Sidebar**: Contains the library of available components and logic nodes.
-   **Canvas Area**: The main drag-and-drop area for designing applications.
-   **Preview Pane**: Shows a live rendering of the application.
-   **Top Navigation**:
    -   Save/Load project buttons.
    -   Export button.

### Component Styling

-   **MUI Theme**: Define a custom theme for consistent colors and typography.
-   **Responsive Design**: Ensure the editor works on different screen sizes.

* * * * *

Technical Architecture
----------------------

### 1\. **Frontend**

-   **React Flow**: For drag-and-drop canvas functionality.
-   **MUI**: For UI components like sidebars, drawers, modals, and buttons.

### 2\. **Backend (Optional)**

-   A lightweight backend may be added later for:
    -   Storing projects in a database.
    -   Managing user accounts.

### 3\. **Build and Deployment**

-   Use Next.js's static and dynamic rendering capabilities.
-   Output static files for the final app using `next export`.

* * * * *

Development Plan
----------------

### Phase 1: Initial Setup

-   Initialize a Next.js project.
-   Configure MUI for theming and layout.
-   Install React Flow and set up the basic canvas.

### Phase 2: Canvas and Nodes

-   Implement the drag-and-drop functionality with React Flow.
-   Create a library of basic nodes (UI and logic nodes).

### Phase 3: JSON Handling

-   Serialize the canvas state into JSON.
-   Create a parser to convert JSON into a Next.js app structure.

### Phase 4: Live Preview

-   Add an iframe for live preview.
-   Update the iframe on canvas changes.

### Phase 5: Export Functionality

-   Create a function to generate a standalone Next.js project.
-   Package the project into a `.zip` file for download.

* * * * *

Future Enhancements
-------------------

-   **Authentication**: Add user accounts for saving projects.
-   **Custom Nodes**: Allow users to define their own custom nodes.
-   **Version Control**: Implement project versioning.
-   **Deployment Options**: Integrate with hosting providers like Vercel.

* * * * *

Project Folder Structure
------------------------
```
/project-root
|-- /components
|   |-- Canvas.js
|   |-- NodeLibrary.js
|-- /pages
|   |-- index.js
|-- /utils
|   |-- jsonParser.js
|   |-- exportHelper.js
|-- /public
|-- package.json
```


## JSON Schema Specification

### Overview
The app builder will represent the canvas state using a JSON configuration. This configuration serves as the source of truth for:
1. Rendering the live preview.
2. Exporting the app as a Next.js project.

### JSON Schema Structure
```json
{
  "metadata": {
    "title": "My App",
    "description": "A sample app created with the Visual Low-Code Builder",
    "version": "1.0.0"
  },
  "nodes": [
    {
      "id": "1",
      "type": "header",
      "props": {
        "text": "Welcome to My App",
        "fontSize": "24px",
        "align": "center"
      },
      "position": { "x": 100, "y": 50 }
    },
    {
      "id": "2",
      "type": "button",
      "props": {
        "text": "Click Me",
        "color": "primary",
        "onClick": "handleClick"
      },
      "position": { "x": 150, "y": 150 }
    }
  ],
  "edges": [
    {
      "source": "2",
      "target": "1"
    }
  ],
  "events": {
    "handleClick": "alert('Button clicked!')"
  }
}
```

### Key Sections

1.  **Metadata**
    -   Provides information about the app, including title, description, and version.
2.  **Nodes**
    -   Defines the UI and logic elements on the canvas.
    -   Each node has an `id`, `type`, `props`, and `position`.
3.  **Edges**
    -   Represents connections between nodes using `source` and `target` references.
4.  **Events**
    -   Contains global event handlers and reusable logic referenced by nodes.

* * * * *

Component Library Specification
-------------------------------

### Basic Components

These will be the first set of supported components in the builder:

#### 1\. Header

-   **Type**: `header`
-   **Props**:
    -   `text` (string): The text content of the header.
    -   `fontSize` (string): Font size (e.g., "24px").
    -   `align` (string): Alignment ("left", "center", "right").

#### 2\. Button

-   **Type**: `button`
-   **Props**:
    -   `text` (string): The text displayed on the button.
    -   `color` (string): Button color ("primary", "secondary").
    -   `onClick` (function reference): A function name defined in the `events` section.

#### 3\. Image

-   **Type**: `image`
-   **Props**:
    -   `src` (string): The image source URL.
    -   `alt` (string): Alternative text for accessibility.
    -   `width` (string): Image width (e.g., "200px").
    -   `height` (string): Image height (e.g., "100px").

#### 4\. Text Field

-   **Type**: `textField`
-   **Props**:
    -   `placeholder` (string): Placeholder text.
    -   `value` (string): Default value.
    -   `onChange` (function reference): A function name defined in the `events` section.

#### 5\. Logic Components

-   **If Condition**
    -   **Type**: `ifCondition`
    -   **Props**:
        -   `condition` (string): A JavaScript expression to evaluate.
    -   **Outputs**:
        -   True path (connect to a node).
        -   False path (connect to a node).

## Example JSON and Output
-----------------------

### Example JSON

```JSON
{
  "metadata": {
    "title": "Simple App",
    "description": "A test app with header and button",
    "version": "1.0.0"
  },
  "nodes": [
    {
      "id": "1",
      "type": "header",
      "props": { "text": "Welcome to the App!", "fontSize": "32px", "align": "center" },
      "position": { "x": 100, "y": 50 }
    },
    {
      "id": "2",
      "type": "button",
      "props": { "text": "Click Me!", "color": "primary", "onClick": "showAlert" },
      "position": { "x": 150, "y": 150 }
    }
  ],
  "edges": [
    { "source": "2", "target": "1" }
  ],
  "events": {
    "showAlert": "alert('You clicked the button!')"
  }
}
```

### Resulting Output

The compiled app in Next.js will render as:

```jsx
export default function App() {
  const showAlert = () => {
    alert('You clicked the button!');
  };

  return (
    <div>
      <h1 style={{ fontSize: "32px", textAlign: "center" }}>
        Welcome to the App!
      </h1>
      <button
        style={{ color: "primary" }}
        onClick={showAlert}
      >
        Click Me!
      </button>
    </div>
  );
}
```

Next Steps
----------

1.  Develop the React Flow-based canvas for visual editing.
2.  Implement the JSON schema generator and ensure two-way binding between the canvas and JSON.
3.  Build the Next.js app compiler to render the JSON into React components dynamically.
4.  Test live preview and export functionality.
5.  Iterate with additional features and optimizations.

