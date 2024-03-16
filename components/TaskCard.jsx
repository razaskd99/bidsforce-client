import React from 'react';

const TaskCard = ({ task }) => {
  return (
    <div className="task-card bg-white rounded-md my-4 shadow-sm">
      <h3>{task.title}</h3>
      <p>{task.company}</p>
      <p>{task.assignedTo}</p>
      <p>{task.tasksCompleted}/{task.totalTasks}</p>
      <div className="progress-bar" style={{ width: `${(task.tasksCompleted / task.totalTasks) * 100}%` }}></div>
    </div>
  );
};

export default TaskCard;
