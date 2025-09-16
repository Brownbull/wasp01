import type { Task } from "wasp/entities";
import type { CreateTask, UpdateTask } from "wasp/server/operations"

/**
 * Represents the payload required to create a new task.
 * Contains only the 'description' property from the Task type.
 */
type CreateTaskPayload = Pick<Task, "description">;

/**
 * Creates a new task with the given description.
 * 
 * @param args The create task payload with the description of the task.
 * @param context The context object containing the entities.
 * @returns The created task.
 */
export const createTask: CreateTask<CreateTaskPayload, Task> = async(
    args: any, 
    context: any
) => {
    return context.entities.Task.create({
        data: { description: args.description },
    });
};

type UpdateTaskPayload = Pick<Task, "id" | "isDone">;
export const updateTask: UpdateTask<UpdateTaskPayload, Task> = async(
    { id, isDone },
    context,
) => {
    return context.entities.Task.update({
        where: { id },
        data: { isDone: isDone },
    });
}