import { useState } from 'react'
import { Query, Mutation } from '@/graphql/codegen/graphql'
import {
  CREATE_DEPARTMENT,
  DELETE_DEPARTMENT,
} from '@/graphql/operation/mutation/department'
import { FIND_ALL_DEPARTMENTS } from '@/graphql/operation/query/department'
import { useQuery, useMutation, ApolloError } from '@apollo/client'
import { toast } from 'sonner'

export interface Department {
  id: string
  name: string
  description: string
}

interface UseDepartmentsReturn {
  departments: Department[]
  loading: boolean
  error: string | null
  page: number
  setPage: (page: number) => void
  perPage: number
  totalPages: number
  refetch: () => void

  createDepartment: (payload: {
    name: string
    description: string
  }) => Promise<void>
  creating: boolean

  deleteDepartment: (id: string) => Promise<void>
  deleting: boolean
}

export default function useDepartments(): UseDepartmentsReturn {
  const [page, setPage] = useState(1)
  const perPage = 10

  // --- Query all departments ---
  const { data, loading, error, refetch } = useQuery<Query>(
    FIND_ALL_DEPARTMENTS,
    {
      variables: { page, perPage },
      fetchPolicy: 'cache-and-network',
    }
  )

  // --- Create ---
  const [createDepartmentMutation, { loading: creating }] =
    useMutation<Mutation>(CREATE_DEPARTMENT)

  const createDepartment = async (payload: {
    name: string
    description: string
  }) => {
    try {
      const res = await createDepartmentMutation({ variables: { payload } })
      toast.success(res.data?.createDepartment?.message ?? 'Department created')
      refetch()
    } catch {
      toast.error('Failed to create department')
    }
  }

  // --- Delete ---
  const [deleteDepartmentMutation, { loading: deleting }] =
    useMutation<Mutation>(DELETE_DEPARTMENT)

  const deleteDepartment = async (id: string) => {
    try {
      await deleteDepartmentMutation({ variables: { deleteDepartmentId: id } })
      toast.success('Department deleted')
      refetch()
    } catch {
      toast.error('Failed to delete department')
    }
  }

  // --- Data + Meta ---
  const departments = data?.findAllDepartments?.data ?? []
  const totalPages = data?.findAllDepartments?.meta?.lastPage ?? 1

  return {
    departments,
    loading,
    error: error ? (error as ApolloError).message : null,
    page,
    setPage,
    perPage,
    totalPages,
    refetch: () => refetch({ page, perPage }),

    createDepartment,
    creating,

    deleteDepartment,
    deleting,
  }
}
