import { FIND_ALL_DEPARTMENTS_IN_DROPDOWN } from '@/graphql/operation/query/department'
import { useQuery } from '@apollo/client'

export interface Department {
  id: string
  name: string
  description?: string
  isSupport?: boolean
}

export default function useDepartments({ onlySupport = false } = {}) {
  const { data, loading, error } = useQuery(FIND_ALL_DEPARTMENTS_IN_DROPDOWN, {
    fetchPolicy: 'cache-first',
  })

  let departments: Department[] = data?.findAllForDropdown || []

  // For Departments such as MIS, Engineering, HR etc.
  if (onlySupport) {
    departments = departments.filter((dept) => dept.isSupport)
  }

  return { departments, loading, error }
}
