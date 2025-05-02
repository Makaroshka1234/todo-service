import React from "react";
import AddTaskList from "../components/List/AddTaskList";
import Header from "../components/Header";

const MyLists = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <AddTaskList />
    </div>
  );
};

export default MyLists;
