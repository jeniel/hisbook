import { Mutation } from '@/graphql/codegen/graphql'
import {
  CREATE_USER,
  DELETE_USER,
  UPDATE_USER,
} from '@/graphql/operation/mutation/user'
import { useMutation } from '@apollo/client'
import { toast } from 'sonner'

type UserPayload = {
  username: string
  password: string
  role: string[]
  departmentId: string
}

export default function useUserMutation(refetch?: () => void) {
  //   Create
  const [createUserMutation, { loading: creating }] =
    useMutation<Mutation>(CREATE_USER)
  const createUser = async (payload: UserPayload) => {
    try {
      await createUserMutation({ variables: { payload } })
      toast.success('User Created Successfully!')
      refetch?.()
    } catch {
      toast.error('Failed to create user')
    }
  }

  //   Update
  const [updateUserMutation, { loading: updating }] =
    useMutation<Mutation>(UPDATE_USER)
  const updateUser = async (id: string, payload: UserPayload) => {
    try {
      await updateUserMutation({ variables: { updateUserId: id, payload } })
      toast.success('User Updated Successfully!')
      refetch?.()
    } catch {
      toast.error('Failed to update user')
    }
  }

  //   Delete
  const [deleteUserMutation, { loading: deleting }] =
    useMutation<Mutation>(DELETE_USER)
  const deleteUser = async (id: string) => {
    try {
      await deleteUserMutation({ variables: { deleteUserId: id } })
      toast.success('User deleted')
      refetch?.()
    } catch {
      toast.error('Failed to delete user')
    }
  }

  return { createUser, creating, updateUser, updating, deleteUser, deleting }
}
