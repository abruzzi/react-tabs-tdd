import React from 'react';
import './App.css';
import {Tabs} from "./Tabs";

const items = [
  {
    label: "Tab 1",
    content: {
      heading: "This is a heading for tab 1",
    },
  },{
    label: "Tab 2",
    content: {
      heading: "This is a heading for tab 2",
    },
  },{
    label: "Tab 3",
    content: {
      heading: "This is a heading for tab 3",
    },
  },
];

function App() {
  return (
    <div className="App">
      <h1>React Tabs</h1>
      <Tabs items={items} />
    </div>
  );
}

export default App;
