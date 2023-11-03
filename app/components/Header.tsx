'use client'
import React from 'react';

interface Props {
    incompleteTasks: number;
}

const TodoHeader: React.FC<Props> = ({ incompleteTasks }) => {
    return (
        <div>
            <h1>Todo List</h1>
            {incompleteTasks ? (<p>{incompleteTasks} tasks remaining</p>) : (<p>Nothing to do!</p>)}
        </div>
    );
};

export default TodoHeader;
