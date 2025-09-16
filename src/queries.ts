import type { Task } from "wasp/entities";
import type { GetTasks } from "wasp/server/operations";

/**
 * Retrieves all tasks in the database, ordered by their ID in ascending order.
 *
 * @returns An array of tasks.
 */
export const getTasks: GetTasks<void, Task[]> = async (args, context) => {
    return context.entities.Task.findMany({
        orderBy: { id: "asc" },
    });
};