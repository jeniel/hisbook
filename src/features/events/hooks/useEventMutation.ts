import { Mutation } from '@/graphql/codegen/graphql'
import {
  CREATE_EVENT,
  DELETE_EVENT,
  UPDATE_EVENT,
} from '@/graphql/operation/mutation/event'
import { useMutation } from '@apollo/client'
import { toast } from 'sonner'

interface EventPayload {
  title: string
  location: string
  startDate: string
  endDate?: string
  detailsUrl?: string
}

export default function useEventsMutation(refetch?: () => void) {
  // --- Create ---
  const [createEventMutation, { loading: creating }] =
    useMutation<Mutation>(CREATE_EVENT)

  const createEvent = async (payload: EventPayload) => {
    try {
      const res = await createEventMutation({ variables: { payload } })
      toast.success(res.data?.createEvent?.message ?? 'Event created')
      refetch?.()
      return res.data?.createEvent
    } catch {
      toast.error('Failed to create event')
    }
  }

  // --- Update ---
  const [updateEventMutation, { loading: updating }] =
    useMutation<Mutation>(UPDATE_EVENT)

  const updateEvent = async (id: string, payload: EventPayload) => {
    try {
      await updateEventMutation({
        variables: { updateEventId: id, payload },
      })
      toast.success('Event updated')
      refetch?.()
    } catch {
      toast.error('Failed to update event')
    }
  }

  // --- Delete ---
  const [deleteEventMutation, { loading: deleting }] =
    useMutation<Mutation>(DELETE_EVENT)

  const deleteEvent = async (id: string) => {
    try {
      await deleteEventMutation({ variables: { deleteEventId: id } })
      toast.error('Event deleted')
      refetch?.()
    } catch {
      toast.error('Failed to delete event')
    }
  }

  return {
    // Create
    createEvent,
    creating,
    // Update
    updateEvent,
    updating,
    // Delete
    deleteEvent,
    deleting,
  }
}
