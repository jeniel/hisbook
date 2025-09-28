import { useState, useEffect } from 'react'
import { Mutation } from '@/graphql/codegen/graphql'
import {
  CREATE_TICKET,
  DELETE_TICKET,
} from '@/graphql/operation/mutation/ticket'
import { FIND_TICKETS_BY_DEPARTMENT } from '@/graphql/operation/query/ticket'
import { useQuery, useMutation } from '@apollo/client'
import {
  Ticket,
  PaginationMeta,
  CreateTicketPayload,
} from '@/features/tickets/types/ticket'

interface UseTicketParams {
  page?: number
  perPage?: number
  search?: string
}

export const useTicket = ({
  page = 1,
  perPage = 10,
  search = '',
}: UseTicketParams) => {
  // ---------------- Tickets ----------------
  const { data, loading, error, refetch } = useQuery(
    FIND_TICKETS_BY_DEPARTMENT,
    {
      variables: { page, perPage, search },
      fetchPolicy: 'network-only',
    }
  )

  const [tickets, setTickets] = useState<Ticket[]>([])
  const [meta, setMeta] = useState<PaginationMeta | null>(null)

  useEffect(() => {
    if (data?.findTicketsByDepartment) {
      setTickets(data.findTicketsByDepartment.data)
      setMeta(data.findTicketsByDepartment.meta)
    }
  }, [data])

  // ---------------- Create Ticket ----------------
  const [createTicketMutation] = useMutation(CREATE_TICKET)

  const createTicket = async (payload: CreateTicketPayload) => {
    return await createTicketMutation({
      variables: { payload },
    })
  }

  // ---------------- Delete Ticket ----------------
  const [deleteTicketMutation] = useMutation<Mutation>(DELETE_TICKET)

  const deleteTicket = async (ticketId: string) => {
    return await deleteTicketMutation({
      variables: { deleteTicketId: ticketId },
    })
  }

  return {
    // tickets
    tickets,
    meta,
    loading,
    error,
    refetch,

    // creation
    createTicket,

    // deletion
    deleteTicket,
  }
}
