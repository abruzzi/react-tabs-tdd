import React from 'react';
import './App.css';
import {Tabs} from "./Tabs";

const Image = () => {
  return <div className="image-container">
    <img src="https://images.unsplash.com/photo-1691158429157-452d88254002?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3870&q=80" alt=""/>
  </div>
}

const items = [
  {
    label: "Tab 1",
    content: <div>
      <h1>This is a <i>fancy</i> panel</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit, molestiae!</p>
    </div>,
  },{
    label: "Tab 2",
    content: <Image />,
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
