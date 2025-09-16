import type { ChangeEvent, FormEvent } from "react";
import type { Task } from "wasp/entities";
import { 
  createTask, 
  updateTask,
  getTasks, 
  useQuery } from "wasp/client/operations";

export const MainPage = () => {
  const { data: tasks, isLoading, error } = useQuery(getTasks, {});

  return (
    <div>
      <NewTaskForm />
      {tasks && <TasksList tasks={tasks} />}
      
      {isLoading && "Loading..."}
      {error && "Error: " + error}
    </div>
  )
};

const TaskView = ({ task }: { task: Task }) => {
  const handleDoneChange = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      const id = task.id;
      const isDone = event.target.checked;
      await updateTask({ id, isDone });
    } catch (err: any) {
      window.alert("Error @TaskView : " + err.message);
    }
  };

  return (
    <div>
      <input
        type="checkbox"
        id={String(task.id)}
        checked={task.isDone}
        onChange={handleDoneChange}
      />
      {task.description}
    </div>
  );
} 

const TasksList = ({ tasks }: { tasks: Task[] }) => {
  if (!tasks?.length) return <div>No tasks</div>;

  return (
    <div>
      {tasks.map((task, idx) => (
        <TaskView task={task} key={idx} />
      ))}
    </div>
  );
};

const NewTaskForm = () => {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const target = event.target as HTMLFormElement;
      const description = target.description.value;
      target.reset();
      await createTask({ description });
    } catch (err: any) {
      window.alert("Error @NewTaskForm : " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="description" type="text" defaultValue="" />
      <input type="submit" value=" Create task" />
    </form>
  );
};