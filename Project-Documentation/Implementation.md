# Project Implementation Document: Phase 1 Prototype

## Objective

Develop a prototype of the Visual Low-Code App Builder with the following capabilities:

1. **Drag-and-Drop Functionality**:
   - Elements available: `Page` (default on every canvas), `Div`, `Text`, and `Button`.
   - Elements can be dragged from a **Sidebar** to the **Canvas**.
   - Elements stack vertically and adhere together in a DOM-like arrangement when placed.

2. **Canvas Export**:
   - Serialize the arrangement of nodes into a Next.js application structure.

3. **Live Preview**:
   - Display a live preview of the canvas-generated app running on a local server, accessible via a designated port.

---

## Scope

### Features to Implement
1. **Basic Components**:
   - **Page**: A default parent container for all other elements.
   - **Div**: A container that can hold child components.
   - **Text**: A simple text display element.
   - **Button**: A clickable button with placeholder functionality.

2. **Sidebar**:
   - Lists available components (`Div`, `Text`, `Button`) for dragging onto the canvas.
   - Displays component options in an organized vertical layout.

3. **Canvas**:
   - The main working area where users can arrange and structure components.
   - Supports:
     - Dragging components onto the canvas.
     - Automatically aligning and stacking components vertically.
     - Displaying a DOM-like hierarchy of the arrangement.

4. **Export to Next.js**:
   - Serialize the canvas state into a Next.js-compatible structure.
   - Generate:
     - An `index.js` file representing the arrangement.
     - A `package.json` file for a basic Next.js app.

5. **Live Preview**:
   - Render the exported Next.js app on a live server.
   - Dynamically update the preview when the canvas changes.

---

## Technical Plan

### Frameworks and Libraries
- **React Flow**: For drag-and-drop and node arrangement on the canvas.
- **MUI (Material-UI)**: For the UI/UX of the sidebar and general layout.
- **Next.js**: For rendering and exporting the application.
- **JSZip**: For generating downloadable zip files of the Next.js project.

---

## Component Details

### 1. Basic Components
#### Page
- **Type**: `page`
- **Default**: Always present as the root of the canvas.
- **Properties**:
  - Acts as the parent container for all other components.

#### Div
- **Type**: `div`
- **Properties**:
  - `style`: Defines dimensions, padding, and background color (default to empty).

#### Text
- **Type**: `text`
- **Properties**:
  - `content`: The text displayed (default: "Sample Text").
  - `style`: Defines font size, color, and alignment (default to empty).

#### Button
- **Type**: `button`
- **Properties**:
  - `label`: The text displayed on the button (default: "Click Me").
  - `style`: Defines padding, background color, and text color (default to empty).

---

### 2. Sidebar
- Lists the following components:
  - `Div`
  - `Text`
  - `Button`
- Components are represented as draggable items.
- Clicking or dragging adds the component to the canvas.

---

### 3. Canvas
- React Flow-based implementation.
- Allows:
  - Dragging components from the sidebar.
  - Stacking components vertically.
  - Removing components by dragging them out of the canvas area.
- **Styling**:
  - Use flexbox or grid to simulate a DOM-like vertical structure.

---

### 4. Export Functionality
- **JSON Serialization**:
  - Convert the canvas arrangement into a JSON structure.
  - Example:
    ```json
    {
      "type": "page",
      "children": [
        {
          "type": "div",
          "children": [
            { "type": "text", "props": { "content": "Hello World" } },
            { "type": "button", "props": { "label": "Click Me" } }
          ]
        }
      ]
    }
    ```
- **Next.js Compilation**:
  - Generate a `pages/index.js` file based on the JSON structure:
    ```javascript
    export default function App() {
      return (
        <div>
          <div>
            <p>Hello World</p>
            <button>Click Me</button>
          </div>
        </div>
      );
    }
    ```

---

### 5. Live Preview
- Serve the generated Next.js app using the `next start` command.
- Automatically update the preview upon changes to the canvas.
- Use an iframe in the builder to display the preview.

---

## Implementation Steps

### Step 1: Project Initialization
1. Set up the Next.js project:
   ```bash
   npx create-next-app@latest low-code-builder --typescript
   cd low-code-builder
   npm install reactflow @mui/material @emotion/react @emotion/styled jszip
### Step 2: Build the Sidebar

-   Create a `Sidebar` component:
```Javascript
import { Box, Button } from "@mui/material";

export default function Sidebar({ onAddComponent }) {
  const components = ["Div", "Text", "Button"];

  return (
    <Box sx={{ width: 240, borderRight: "1px solid #ddd", padding: 2 }}>
      {components.map((component) => (
        <Button
          key={component}
          fullWidth
          variant="outlined"
          sx={{ marginTop: 2 }}
          onClick={() => onAddComponent(component.toLowerCase())}
        >
          {component}
        </Button>
      ))}
    </Box>
  );
}
```

### Step 3: Build the Canvas

-   Create a `Canvas` component using React Flow:
```Javascript
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";

export default function Canvas({ nodes, edges, onNodesChange }) {
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      fitView
      style={{ width: "100%", height: "100%" }}
    >
      <Background />
      <Controls />
    </ReactFlow>
  );
}
```

### Step 4: Add Export Logic

-   Create a utility function to export the canvas state as a Next.js project:
```Javascript
import JSZip from "jszip";

export function exportNextJsProject(json) {
  const zip = new JSZip();

  zip.file("pages/index.js", generateIndexFile(json));
  zip.file("package.json", generatePackageFile());
  return zip.generateAsync({ type: "blob" });
}

function generateIndexFile(json) {
  // Convert JSON to Next.js JSX
}

function generatePackageFile() {
  return JSON.stringify({
    name: "exported-app",
    version: "1.0.0",
    dependencies: {
      react: "latest",
      "react-dom": "latest",
      next: "latest",
    },
  });
}
```

# Project Implementation Document: Phase 1 Prototype

## Objective

Develop a prototype of the Visual Low-Code App Builder with the following capabilities:

1. **Drag-and-Drop Functionality**:
 - Elements available: `Page` (default on every canvas), `Div`, `Text`, and `Button`.
 - Elements can be dragged from a **Sidebar** to the **Canvas**.
 - Elements stack vertically and adhere together in a DOM-like arrangement when placed.

2. **Canvas Export**:
 - Serialize the arrangement of nodes into a Next.js application structure.

3. **Live Preview**:
 - Display a live preview of the canvas-generated app running on a local server, accessible via a designated port.

---

## Scope

### Features to Implement
1. **Basic Components**:
 - **Page**: A default parent container for all other elements.
 - **Div**: A container that can hold child components.
 - **Text**: A simple text display element.
 - **Button**: A clickable button with placeholder functionality.

2. **Sidebar**:
 - Lists available components (`Div`, `Text`, `Button`) for dragging onto the canvas.
 - Displays component options in an organized vertical layout.

3. **Canvas**:
 - The main working area where users can arrange and structure components.
 - Supports:
 - Dragging components onto the canvas.
 - Automatically aligning and stacking components vertically.
 - Displaying a DOM-like hierarchy of the arrangement.

4. **Export to Next.js**:
 - Serialize the canvas state into a Next.js-compatible structure.
 - Generate:
 - An `index.js` file representing the arrangement.
 - A `package.json` file for a basic Next.js app.

5. **Live Preview**:
 - Render the exported Next.js app on a live server.
 - Dynamically update the preview when the canvas changes.

---

## Technical Plan

### Frameworks and Libraries
- **React Flow**: For drag-and-drop and node arrangement on the canvas.
- **MUI (Material-UI)**: For the UI/UX of the sidebar and general layout.
- **Next.js**: For rendering and exporting the application.
- **JSZip**: For generating downloadable zip files of the Next.js project.

---

## Component Details

### 1. Basic Components
#### Page
- **Type**: `page`
- **Default**: Always present as the root of the canvas.
- **Properties**:
 - Acts as the parent container for all other components.

#### Div
- **Type**: `div`
- **Properties**:
 - `style`: Defines dimensions, padding, and background color (default to empty).

#### Text
- **Type**: `text`
- **Properties**:
 - `content`: The text displayed (default: "Sample Text").
 - `style`: Defines font size, color, and alignment (default to empty).

#### Button
- **Type**: `button`
- **Properties**:
 - `label`: The text displayed on the button (default: "Click Me").
 - `style`: Defines padding, background color, and text color (default to empty).

---

### 2. Sidebar
- Lists the following components:
 - `Div`
 - `Text`
 - `Button`
- Components are represented as draggable items.
- Clicking or dragging adds the component to the canvas.

---

### 3. Canvas
- React Flow-based implementation.
- Allows:
 - Dragging components from the sidebar.
 - Stacking components vertically.
 - Removing components by dragging them out of the canvas area.
- **Styling**:
 - Use flexbox or grid to simulate a DOM-like vertical structure.

---

### 4. Export Functionality
- **JSON Serialization**:
 - Convert the canvas arrangement into a JSON structure.
 - Example:
 ```json
    {
      "type": "page",
      "children": [
        {
          "type": "div",
          "children": [
            { "type": "text", "props": { "content": "Hello World" } },
            { "type": "button", "props": { "label": "Click Me" } }
          ]
        }
      ]
    }
```
- **Next.js Compilation**:
  - Generate a `pages/index.js` file based on the JSON structure:
    ```javascript
    export default function App() {
      return (
        <div>
          <div>
            <p>Hello World</p>
            <button>Click Me</button>
          </div>
        </div>
      );
    }
    ```
---

### 5. Live Preview
- Serve the generated Next.js app using the `next start` command.
- Automatically update the preview upon changes to the canvas.
- Use an iframe in the builder to display the preview.

---

## Implementation Steps

### Step 1: Project Initialization
1. Set up the Next.js project:
   ```bash
   npx create-next-app@latest low-code-builder --typescript
   cd low-code-builder
   npm install reactflow @mui/material @emotion/react @emotion/styled jszip `

### Step 2: Build the Sidebar

-   Create a `Sidebar` component:

    tsx

    Copy code

    `import { Box, Button } from "@mui/material";

    export default function Sidebar({ onAddComponent }) {
      const components = ["Div", "Text", "Button"];

      return (
        <Box sx={{ width: 240, borderRight: "1px solid #ddd", padding: 2 }}>
          {components.map((component) => (
            <Button
              key={component}
              fullWidth
              variant="outlined"
              sx={{ marginTop: 2 }}
              onClick={() => onAddComponent(component.toLowerCase())}
            >
              {component}
            </Button>
          ))}
        </Box>
      );
    }`

### Step 3: Build the Canvas

-   Create a `Canvas` component using React Flow:

    tsx

    Copy code

    `import ReactFlow, { Background, Controls } from "reactflow";
    import "reactflow/dist/style.css";

    export default function Canvas({ nodes, edges, onNodesChange }) {
      return (
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          fitView
          style={{ width: "100%", height: "100%" }}
        >
          <Background />
          <Controls />
        </ReactFlow>
      );
    }`

### Step 4: Add Export Logic

-   Create a utility function to export the canvas state as a Next.js project:

    javascript

    Copy code

    `import JSZip from "jszip";

    export function exportNextJsProject(json) {
      const zip = new JSZip();

      zip.file("pages/index.js", generateIndexFile(json));
      zip.file("package.json", generatePackageFile());
      return zip.generateAsync({ type: "blob" });
    }

    function generateIndexFile(json) {
      // Convert JSON to Next.js JSX
    }

    function generatePackageFile() {
      return JSON.stringify({
        name: "exported-app",
        version: "1.0.0",
        dependencies: {
          react: "latest",
          "react-dom": "latest",
          next: "latest",
        },
      });
    }`

* * * * *

Deliverables for Phase 1
------------------------

1.  Functional drag-and-drop interface with `Page`, `Div`, `Text`, and `Button` components.
2.  Sidebar to select and add new components.
3.  Canvas supporting vertical stacking and DOM-like arrangement.
4.  Export functionality to generate a Next.js app.
5.  Live preview of the canvas-generated app.

* * * * *

Testing and Validation
----------------------

1.  Add components from the sidebar and verify their arrangement on the canvas.
2.  Export the canvas to Next.js and validate the generated `index.js` file.
3.  Run the live preview server and confirm the app reflects the canvas state.