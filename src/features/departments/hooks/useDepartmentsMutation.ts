import { Mutation } from '@/graphql/codegen/graphql'
import {
  CREATE_DEPARTMENT,
  DELETE_DEPARTMENT,
  UPDATE_DEPARTMENT,
} from '@/graphql/operation/mutation/department'
import { useMutation } from '@apollo/client'
import { toast } from 'sonner'

export interface DepartmentPayload {
  name: string
  description: string
  isSupport?: boolean
}

export default function useDepartmentsMutation(refetch?: () => void) {
  // --- Create ---
  const [createDepartmentMutation, { loading: creating }] =
    useMutation<Mutation>(CREATE_DEPARTMENT)

  const createDepartment = async (payload: DepartmentPayload) => {
    try {
      const res = await createDepartmentMutation({ variables: { payload } })
      toast.success(
        res.data?.createDepartment?.message ?? 'Department created successfully'
      )
      refetch?.()
    } catch {
      toast.error('Failed to create department')
    }
  }

  // --- Update ---
  const [updateDepartmentMutation, { loading: updating }] =
    useMutation<Mutation>(UPDATE_DEPARTMENT)

  const updateDepartment = async (id: string, payload: DepartmentPayload) => {
    try {
      await updateDepartmentMutation({
        variables: { updateDepartmentId: id, payload },
      })
      toast.success('Department updated successfully')
      refetch?.()
    } catch {
      toast.error('Failed to update department')
    }
  }

  // --- Delete ---
  const [deleteDepartmentMutation, { loading: deleting }] =
    useMutation<Mutation>(DELETE_DEPARTMENT)

  const deleteDepartment = async (id: string) => {
    try {
      await deleteDepartmentMutation({ variables: { deleteDepartmentId: id } })
      toast.success('Department deleted successfully')
      refetch?.()
    } catch {
      toast.error('Failed to delete department')
    }
  }

  return {
    // Create
    createDepartment,
    creating,
    // Update
    updateDepartment,
    updating,
    // Delete
    deleteDepartment,
    deleting,
  }
}
