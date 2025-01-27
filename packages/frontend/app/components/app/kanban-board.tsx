import { useState } from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Route } from '../../../app/routes/_authed/dashboard'

interface Task {
  id: string
  content: string
}

interface Column {
  id: string
  title: string
  tasks: Task[]
}

function transformTasksToColumns(tasks: any[]) {
  // Define the mapping for status to column IDs and titles
  const statusMapping = {
    todo: { id: 'todo', title: 'To Do' },
    'in-progress': { id: 'in_progress', title: 'In Progress' },
    done: { id: 'done', title: 'Done' },
  };

  // Initialize columns based on the mapping
  const columns = Object.values(statusMapping).map(({ id, title }) => ({
    id,
    title,
    tasks: [],
  }));

  // Populate tasks into the appropriate columns based on status
  tasks?.forEach((task: any) => {
    const { id, title, status } = task;
    const column: any = columns.find((col) => col.id === status);
    if (column) {
      column.tasks.push({ id, content: title });
    }
  });

  return columns;
}

export function KanbanBoard() {
  const { tasks } = Route.useLoaderData()

  const initialColumns = transformTasksToColumns(tasks)

  const [columns, setColumns] = useState(initialColumns)

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result

    // Dropped outside the list
    if (!destination) return

    // Moving within the same column
    if (source.droppableId === destination.droppableId) {
      const column = columns.find(col => col.id === source.droppableId)
      if (!column) return

      const newTasks = Array.from(column.tasks)
      const [reorderedItem] = newTasks.splice(source.index, 1)
      newTasks.splice(destination.index, 0, reorderedItem)

      const newColumns = columns.map(col =>
        col.id === source.droppableId ? { ...col, tasks: newTasks } : col
      )

      setColumns(newColumns)
    } else {
      // Moving from one column to another
      console.log({ source, destination });
      
      const sourceColumn = columns.find(col => col.id === source.droppableId)
      const destColumn = columns.find(col => col.id === destination.droppableId)
      if (!sourceColumn || !destColumn) return

      const sourceTasks = Array.from(sourceColumn.tasks)
      const destTasks = Array.from(destColumn.tasks)
      const [movedItem] = sourceTasks.splice(source.index, 1)
      destTasks.splice(destination.index, 0, movedItem)

      const newColumns = columns.map(col => {
        if (col.id === source.droppableId) {
          return { ...col, tasks: sourceTasks }
        }
        if (col.id === destination.droppableId) {
          return { ...col, tasks: destTasks }
        }
        return col
      })

      setColumns(newColumns)
    }
  }

  
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {columns.map(column => (
          <div key={column.id} className="w-72 flex-shrink-0">
            <Card>
              <CardHeader>
                <CardTitle>{column.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <Droppable droppableId={column.id}>
                  {(provided: any) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="min-h-[200px]"
                    >
                      {column.tasks.map((task: any, index: any) => (
                        <Draggable key={task.id.toString()} draggableId={task.id.toString()} index={index}>
                          {(provided: any) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="mb-2 rounded-md border bg-card p-2 shadow-sm"
                            >
                              {task.content}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </DragDropContext>
  )
}

