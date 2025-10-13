import { FIND_ALL_DEPARTMENTS_IN_DROPDOWN } from '@/graphql/operation/query/department'
import { useLazyQuery } from '@apollo/client'

export interface Department {
  id: string
  name: string
  description?: string
  isSupport?: boolean
}

export default function useDepartments({ onlySupport = false } = {}) {
  const [fetchDepartments, { data, loading, error }] = useLazyQuery(
    FIND_ALL_DEPARTMENTS_IN_DROPDOWN,
    { fetchPolicy: 'cache-first' }
  )

  let departments: Department[] = data?.findAllForDropdown || []

  if (onlySupport) {
    departments = departments.filter((dept) => dept.isSupport)
  }

  return { fetchDepartments, departments, loading, error }
}
