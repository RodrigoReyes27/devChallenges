import React, {useState, useEffect}from "react";
import Tabs from "./components/Tabs";
import Add from "./components/Add";
import Delete from "./components/Delete";
import Task from "./components/Task";


function App() {
    const [currentTab, setCurrentTab] = useState("all");
    const [tasks, setTasks] = useState([]);
    
    const getTasks = () => {
        fetch('http://localhost:8080/activities')
            .then(res => res.json())
            .then(data => setTasks(data.map(item => {
                return {
                    id: item.id,
                    activity: item.activity,
                    completed: item.completed === '0' ? false : true
                }
            })))
            .catch(error => console.log(error));
    }

    const tasksElements = tasks.filter(task => 
        currentTab === "all" || 
        (currentTab === "active" && currentTab !== "completed" && !task.completed) || 
        (currentTab === "completed" && currentTab !== "active" && task.completed))
        .map(task => (
            <Task
                key={task.id}
                id={task.id}
                details={task.activity}
                completed={task.completed}
                handleChange={handleTaskCompletedChange}
                handleDelete={handleTaskDelete}
                currentTab={currentTab}
            />
        ));
    

    function handleTabChange(newTab) {
        setCurrentTab(newTab);
    }

    function handleTaskCompletedChange(taskId, completedStatus) {
        fetch('http://localhost:8080/activities', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: taskId,
                completed: completedStatus
            })
        })
            .then(() => getTasks())
    }

    function handleTaskDelete(taskId) {
        fetch('http://localhost:8080/activities', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: taskId
            })
        })
            .then(() => getTasks())
    }

    function handleDeleteAll(event) {
        event.preventDefault();

        fetch('http://localhost:8080/all', {
            method: 'DELETE',
        })
            .then(() => getTasks())
    }

    // Fetch tasks from DB
    useEffect(() => {
        getTasks();
    }, [])

    return (
        <main>
            <div className="content-container">
                <h1 className="title">#todo</h1>
                <Tabs
                    currentTab={currentTab}
                    handleTabChange={handleTabChange}
                />
                <Add getTasks={getTasks} />
                <div className="tasks-container">
                    {tasksElements}
                </div>
                {currentTab === "completed" &&
                    <Delete handleDelete={handleDeleteAll} />
                }
            </div>
        </main>
    );
}

export default App;