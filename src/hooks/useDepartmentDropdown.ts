import { FIND_ALL_DEPARTMENTS_IN_DROPDOWN } from '@/graphql/operation/query/department'
import { useQuery } from '@apollo/client'

export interface Department {
  id: string
  name: string
  description?: string
}

export default function useDepartments() {
  const { data, loading, error } = useQuery(FIND_ALL_DEPARTMENTS_IN_DROPDOWN, {
    fetchPolicy: 'cache-first',
  })

  const departments: Department[] = data?.findAllForDropdown || []

  return { departments, loading, error }
}
