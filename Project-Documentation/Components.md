# Component Specification Document: Visual Low-Code App Builder

## Overview

This document specifies the components used in the **Visual Low-Code App Builder**, detailing their types, props, styles, and behaviors. The components are categorized into **core functional components** (e.g., `Canvas`, `Sidebar`, `Preview`) and **UI components** (e.g., `Page`, `Div`, `Text`, `Button`).

---

## Core Functional Components

### 1. Sidebar
#### Description
The Sidebar displays a list of draggable components (`Div`, `Text`, `Button`) and acts as the entry point for adding new nodes to the canvas.

#### Props
| Prop          | Type       | Required | Description                                  |
|---------------|------------|----------|----------------------------------------------|
| `onAddNode`   | Function   | Yes      | Callback triggered when a component is added.|

#### Behavior
- Renders a list of draggable buttons for the components.
- Calls `onAddNode` with the type of component when a button is clicked.

#### Example
```tsx
<Sidebar onAddNode={(type) => addNodeToCanvas(type)} />
```

### 2\. Canvas

#### Description

The Canvas is the primary workspace for arranging components. It uses React Flow to manage the drag-and-drop layout and node interactions.

#### Props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| `nodes` | Array | Yes | Array of nodes to display on the canvas. |
| `edges` | Array | Yes | Array of edges connecting nodes. |
| `onNodesChange` | Function | Yes | Callback to handle changes in node positions. |
| `onEdgesChange` | Function | Yes | Callback to handle changes in connections. |

#### Behavior

-   Supports dragging and dropping nodes.
-   Allows nodes to snap together in a DOM-like vertical hierarchy.
-   Emits changes to node and edge states via `onNodesChange` and `onEdgesChange`.

#### Example

```tsx
<Canvas
  nodes={nodes}
  edges={edges}
  onNodesChange={(changes) => setNodes(applyNodeChanges(changes, nodes))}
  onEdgesChange={(changes) => setEdges(applyEdgeChanges(changes, edges))}
/>
```

### 3\. Preview

#### Description

The Preview component renders the live representation of the canvas state using an iframe.

#### Props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| `json` | Object | Yes | JSON configuration representing the canvas. |

#### Behavior

-   Dynamically generates HTML based on the `json` configuration.
-   Renders the HTML inside an iframe.

#### Example

```tsx
<Preview json={canvasJson} />
```

### 4\. Export Functionality

#### Description

Exports the current canvas state as a Next.js project, generating necessary files (`index.js`, `package.json`) and packaging them into a `.zip`.

#### Functions

| Function | Description |
| --- | --- |
| `exportNextJs(json)` | Converts the JSON into Next.js files and returns a `.zip`. |
| `generateIndexFile(json)` | Generates the `index.js` file based on the JSON configuration. |

#### Example

```Javascript
exportNextJs(canvasJson).then((zipFile) => {
  saveAs(zipFile, "nextjs-app.zip");
});
```

UI Components
-------------

### 1\. Page

#### Description

The `Page` component serves as the root container for all other components. It is always present in the canvas.

#### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | ReactNode | None | Nested components inside the Page. |

#### Styles

-   Full-width container.
-   Default padding of `16px`.

#### Example

```jsx
<Page>
  <Div>Sample Content</Div>
</Page>
```

### 2\. Div

#### Description

The `Div` component acts as a generic container for other components.

#### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `style` | Object | `{}` | Custom styles for the container. |
| `children` | ReactNode | None | Nested components inside the Div. |

#### Styles

-   Default `display: flex` and `flexDirection: column`.
-   Customizable dimensions via the `style` prop.

#### Example

```jsx
<Div style={{ backgroundColor: "lightgray", padding: "16px" }}>
  <Text content="Hello World" />
</Div>
```

### 3\. Text

#### Description

The `Text` component displays a string of text.

#### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `content` | String | "Sample Text" | The text to display. |
| `style` | Object | `{}` | Custom styles for the text. |

#### Styles

-   Font size: `16px` by default.
-   Text alignment: `left` by default.

#### Example

```jsx
<Text content="Welcome to the App!" style={{ fontSize: "20px", color: "blue" }} />
```

### 4\. Button

#### Description

The `Button` component represents an interactive button with an optional click event.

#### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | String | "Click Me" | The text displayed on the button. |
| `onClick` | Function | `null` | Function to execute when the button is clicked. |
| `style` | Object | `{}` | Custom styles for the button. |

#### Styles

-   Padding: `10px 20px`.
-   Background color: `primary` color from the MUI theme.

#### Example

```jsx
<Button
  label="Submit"
  onClick={() => alert("Button clicked!")}
  style={{ backgroundColor: "green", color: "white" }}
/>
```

Interactions and Hierarchies
----------------------------

### Parent-Child Relationships

-   **Page**: Can contain `Div`, `Text`, and `Button`.
-   **Div**: Can contain `Text` and `Button`.
-   **Text**: Cannot have children.
-   **Button**: Cannot have children.