# User Stories for Phase 1 Prototype

## Overview

This document outlines the user stories for the Phase 1 Prototype of the Visual Low-Code App Builder. The primary focus is on the core functionality of dragging and dropping `Page`, `Div`, `Text`, and `Button` components onto a canvas, organizing them hierarchically, exporting the canvas as a Next.js app, and displaying a live preview.

---

## User Stories

### **1. Add Components to the Canvas**
- **As a** user,  
  **I want** to drag and drop components (`Div`, `Text`, `Button`) from the sidebar onto the canvas,  
  **so that** I can create the structure of my application.

#### Acceptance Criteria:
- A **Sidebar** lists all available components.
- Clicking or dragging a component from the Sidebar adds it to the **Canvas**.
- Components appear in a DOM-like vertical stacking order when dropped on the canvas.

#### Example:
1. User selects `Div` from the Sidebar.
2. The `Div` appears on the canvas.
3. User drags `Text` into the `Div`, and it nests hierarchically below it.

---

### **2. Stack Components in a DOM-Like Structure**
- **As a** user,  
  **I want** components on the canvas to automatically stack vertically and snap together,  
  **so that** the layout resembles a web page structure.

#### Acceptance Criteria:
- Components snap into a vertical layout (like a DOM hierarchy).
- When a component is dragged and dropped on top of another, it nests within the target component.
- Parent-child relationships are reflected in the canvas layout.

#### Example:
1. User drags a `Button` onto a `Div` on the canvas.
2. The `Button` appears visually nested inside the `Div`.

---

### **3. Modify the Canvas Hierarchy**
- **As a** user,  
  **I want** to move components around on the canvas,  
  **so that** I can reorganize my application's layout.

#### Acceptance Criteria:
- Components can be dragged to new positions within the canvas.
- Dropping a component onto another nests it hierarchically.
- Removing a component from the canvas updates the layout dynamically.

---

### **4. Preview the Canvas Layout**
- **As a** user,  
  **I want** to see a live preview of the canvas layout,  
  **so that** I can understand how the final application will look.

#### Acceptance Criteria:
- A **Preview Pane** dynamically updates to reflect changes made on the canvas.
- The layout in the preview matches the vertical stacking of components on the canvas.
- The Preview renders:
  - `Div` as a container.
  - `Text` as paragraphs.
  - `Button` as clickable buttons.

#### Example:
1. User adds a `Div`, `Text`, and `Button` to the canvas.
2. The Preview Pane shows the corresponding layout in real-time:

```HTML
<div> <p>Sample Text</p> <button>Click Me</button> </div> 
```

### **5\. Export the Canvas as a Next.js App**

-   **As a** user,\
    **I want** to export my canvas as a Next.js application,\
    **so that** I can deploy it as a standalone web app.

#### Acceptance Criteria:

-   A button labeled **Export** generates a `.zip` file containing:
    -   `pages/index.js` (representing the canvas structure).
    -   `package.json` (basic Next.js project configuration).
-   Exported code matches the hierarchy on the canvas.

#### Example:

1.  User creates a canvas with the following structure:

```HTML
<div>
  <p>Sample Text</p>
  <button>Click Me</button>
</div>
```

2. The exported index.js file:

```Javascript
export default function App() {
  return (
    <div>
      <p>Sample Text</p>
      <button>Click Me</button>
    </div>
  );
}
```

### **6\. Default Page Component**

-   **As a** user,\
    **I want** the canvas to include a default `Page` component,\
    **so that** I always have a root container for other components.

#### Acceptance Criteria:

-   The `Page` component is automatically present on every new canvas.
-   All other components must nest inside the `Page`.

#### Example:

1.  User opens the app and sees a `Page` component on the canvas by default.
2.  All added components (`Div`, `Text`, `Button`) are automatically nested within the `Page`.

* * * * *

### **7\. Remove Components from the Canvas**

-   **As a** user,\
    **I want** to remove components from the canvas,\
    **so that** I can simplify my layout or fix mistakes.

#### Acceptance Criteria:

-   Dragging a component outside the canvas area removes it.
-   The canvas layout dynamically updates after removal.
-   Removed components are no longer reflected in the live preview or export.

* * * * *

Summary of User Stories and Acceptance Criteria
-----------------------------------------------

| **User Story** | **Priority** | **Core Feature** |
| --- | --- | --- |
| Add Components to the Canvas | High | Drag-and-drop functionality |
| Stack Components Vertically | High | DOM-like layout |
| Modify the Canvas Hierarchy | Medium | Reorganize components |
| Preview the Canvas Layout | High | Live preview of the canvas |
| Export as a Next.js App | High | Generate Next.js project from canvas |
| Default Page Component | High | Root container for all components |
| Remove Components from Canvas | Medium | Simplify and adjust the layout |

* * * * *

Phase 1 Prototype Goal
----------------------

Deliver a functional prototype of the Visual Low-Code App Builder with:

1.  Drag-and-drop functionality for `Page`, `Div`, `Text`, and `Button`.
2.  Real-time preview of the canvas layout.
3.  Export feature generating a valid Next.js app.

This initial feature set will establish the foundation for future enhancements and additional components.