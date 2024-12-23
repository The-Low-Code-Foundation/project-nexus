# Architectural Design Document: Visual Low-Code App Builder

## Overview

This document outlines the high-level architecture for the **Visual Low-Code App Builder**. It covers the core modules, their interactions, and the overall flow of data through the application. The architecture ensures scalability, maintainability, and ease of integration with future features.

---

## Core Architecture

### Frameworks and Libraries
- **Next.js**: Provides the base framework for the application, including routing and server-side rendering.
- **React Flow**: Powers the drag-and-drop canvas and manages nodes and edges.
- **MUI (Material-UI)**: Handles the UI design, including the sidebar, buttons, and overall layout.
- **JSZip**: Used for exporting the generated app as a `.zip` file.
- **React**: Core library for building components and managing state.

---

## High-Level Architecture

### 1. Application Modules
The project is divided into the following key modules:

#### a. **Sidebar**
- **Purpose**: Displays available components (`Div`, `Text`, `Button`) and allows users to drag them onto the canvas.
- **Key Functions**:
  - List available components.
  - Trigger `onAddComponent` to add a new node to the canvas.

#### b. **Canvas**
- **Purpose**: The main design area where users arrange components and define the app's structure.
- **Key Features**:
  - Render components (`Page`, `Div`, `Text`, `Button`) as nodes.
  - Use React Flow to manage:
    - Node positioning.
    - Vertical stacking.
    - Drag-and-drop functionality.

#### c. **Live Preview**
- **Purpose**: Displays a real-time preview of the app generated from the canvas.
- **Key Features**:
  - Dynamically parse JSON state and render it as a Next.js app.
  - Use an iframe to isolate the preview from the main builder interface.

#### d. **Export Functionality**
- **Purpose**: Converts the canvas state into a Next.js project.
- **Key Features**:
  - Serialize the canvas state into a JSON configuration.
  - Generate the necessary Next.js files (`index.js`, `package.json`).
  - Package the project as a `.zip` file for download.

---

### 2. Data Flow
#### a. **Canvas State Management**
- **Input**: Users interact with the sidebar and canvas to add and arrange nodes.
- **Processing**: The state of nodes and edges is managed by React Flow.
- **Output**: The state is serialized into a JSON configuration.

#### b. **Preview Integration**
- The JSON configuration is parsed into JSX components for rendering in the iframe.

#### c. **Export Process**
1. Serialize the JSON configuration.
2. Generate `index.js` based on the JSON structure.
3. Package the app files into a `.zip` file.

---

## Component Interactions

### 1. Sidebar → Canvas
- **Interaction**: Dragging components from the sidebar adds them to the canvas.
- **Implementation**:
  - Trigger `onAddComponent` with the component type.
  - React Flow adds a new node to the canvas state.

### 2. Canvas → JSON
- **Interaction**: The canvas state is continuously synced with a JSON representation.
- **Implementation**:
  - Use React Flow's `onNodesChange` and `onEdgesChange` to update the state.

### 3. JSON → Preview
- **Interaction**: The JSON state is parsed into JSX and rendered in the preview iframe.
- **Implementation**:
  - Dynamically map JSON components to React components.

### 4. Export Process
- **Interaction**: The JSON state is converted into Next.js files.
- **Implementation**:
  - Generate JSX for `index.js`.
  - Bundle files using JSZip.

---

## Detailed Module Design

### Sidebar
#### Purpose
- Allow users to drag components (`Div`, `Text`, `Button`) onto the canvas.

#### Key Components
- **`Sidebar.js`**:
  - Renders a list of available components.
  - Calls `onAddComponent` when a component is selected.

---

### Canvas
#### Purpose
- Display the visual arrangement of components.
- Manage node positions and connections using React Flow.

#### Key Components
- **`Canvas.js`**:
  - Renders the drag-and-drop canvas using React Flow.
  - Manages node and edge states.
- **State Management**:
  - Nodes and edges are stored in React Flow’s state object.
  - Example Node:
    ```json
    {
      "id": "1",
      "type": "div",
      "position": { "x": 100, "y": 100 },
      "data": { "content": "Sample Div" }
    }
    ```

---

### Preview
#### Purpose
- Provide a live rendering of the app.

#### Key Components
- **`Preview.js`**:
  - Converts JSON to JSX dynamically.
  - Uses an iframe to display the JSX output.

#### Example Integration
```javascript
function Preview({ json }) {
  const renderComponent = (node) => {
    if (node.type === "text") return `<p>${node.data.content}</p>`;
    if (node.type === "button") return `<button>${node.data.label}</button>`;
    return "";
  };

  const html = `
    <!DOCTYPE html>
    <html>
      <body>
        ${json.nodes.map(renderComponent).join("")}
      </body>
    </html>
  `;

  return <iframe srcDoc={html} />;
}
```

### Export Functionality

#### Purpose

-   Allow users to download their app as a fully functional Next.js project.

#### Key Components

-   **`exportHelper.js`**:
    -   Converts JSON into Next.js files (`index.js`, `package.json`).
    -   Uses JSZip to package files.

#### Export Example

```Javascript
export function exportNextJs(json) {
  const zip = new JSZip();

  zip.file("pages/index.js", generateIndexFile(json));
  zip.file("package.json", JSON.stringify({
    name: "generated-app",
    version: "1.0.0",
    dependencies: {
      react: "^17.0.2",
      "react-dom": "^17.0.2",
      next: "^12.0.7"
    }
  }));

  return zip.generateAsync({ type: "blob" });
}
```

Future Considerations
---------------------

### Scalability

-   Support more complex logic nodes (e.g., If/Else, API calls).
-   Add persistent project saving using a database.

### Performance

-   Optimize canvas rendering for large node sets.
-   Minimize iframe overhead in the live preview.

### Collaboration

-   Implement user accounts for sharing and editing projects.

* * * * *

Diagrams
--------

### High-Level Architecture

```lua
+-----------+         +-------------+         +-------------+
|  Sidebar  | ----->  |   Canvas    | ----->  | Export Logic|
+-----------+         +-------------+         +-------------+
       |                     |                       |
       v                     v                       v
Available Components   Visual Layout           Next.js Project
```

