import type { Task } from "wasp/entities";
import { HttpError } from "wasp/server";
import type { GetTasks } from "wasp/server/operations";

/**
 * Retrieves all tasks in the database, ordered by their ID in ascending order.
 *
 * @returns An array of tasks.
 */
export const getTasks: GetTasks<void, Task[]> = async (args, context) => {
    if (!context.user) {
        throw new HttpError(401, "You must be logged in to get tasks.");
    }

    return context.entities.Task.findMany({
        where: { userId: context.user.id },
        orderBy: { id: "asc" },
    });
};