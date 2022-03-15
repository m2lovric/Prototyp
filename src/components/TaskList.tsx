import React from 'react';
import { localTask } from '../interfaces/interfaces';

const TaskList = ({ data, removeTask }) => {
  return (
    <section className='app__list'>
      {data.length > 0 &&
        data.map((el: localTask) => {
          return (
            <article key={el.taskId} className='app__list__task'>
              <p>{el.content}</p>
              <button
                className='app__list__remove'
                onClick={() => removeTask(el.taskId)}
              >
                X
              </button>
            </article>
          );
        })}
    </section>
  );
};

export default TaskList;
