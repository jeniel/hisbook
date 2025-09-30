import { Mutation } from '@/graphql/codegen/graphql'
import {
  CREATE_TICKET,
  DELETE_TICKET,
} from '@/graphql/operation/mutation/ticket'
import { useMutation } from '@apollo/client'
import { toast } from 'sonner'

type CreateTicketPayload = {
  subject: string
  floor: string
  screenshot?: string | null
  status: string | null
  message?: string | null
  departmentId: string
  createdById: string
}

export default function useTicketMutation(refetch?: () => void) {
  // Create Ticket
  const [createTicketMutation, { loading: creating }] =
    useMutation<Mutation>(CREATE_TICKET)

  const createTicket = async (payload: CreateTicketPayload) => {
    try {
      await createTicketMutation({ variables: { payload } })
      toast.success('Ticket created successfully!')
      refetch?.()
    } catch {
      toast.error('Failed to create ticket')
    }
  }

  // Delete Ticket
  const [deleteTicketMutation, { loading: deleting }] =
    useMutation<Mutation>(DELETE_TICKET)

  const deleteTicket = async (ticketId: string) => {
    try {
      await deleteTicketMutation({ variables: { deleteTicketId: ticketId } })
      toast.success('Ticket deleted successfully!')
      refetch?.()
    } catch {
      toast.error('Failed to delete ticket')
    }
  }

  return { createTicket, creating, deleteTicket, deleting }
}
