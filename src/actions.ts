import type { Task } from "wasp/entities";
import { HttpError } from "wasp/server";
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
    if (!context.user){
        throw new HttpError(401, "You must be logged in to create tasks.");
    }
    return context.entities.Task.create({
        data: { 
            description: args.description,
            userId: context.user.id
        },
    });
};

type UpdateTaskPayload = Pick<Task, "id" | "isDone">;

export const updateTask: UpdateTask<UpdateTaskPayload, { count: number }> = async (args, context) => {
    if (!context.user) {
        throw new HttpError(401, "You must be logged in to update tasks.");
    }
    return context.entities.Task.updateMany({
        where: { id: args.id, user: { id: context.user.id } },
        data: { isDone: args.isDone },
    });
};