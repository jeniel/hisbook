export interface Ticket {
  id: string
  subject: string
  message: string
  status: string
  statusFormatted: string
  createdAt: string
  updatedAt: string
  missedAt?: string
  remarks?: string
  screenshot?: string
  floor?: string
  createdBy: {
    username: string
    profile: {
      firstName: string
      middleName?: string
      lastName: string
    }
  }
  createdById: string
  updatedBy?: string
  departmentId: string
  department: {
    id: string
    name: string
    description?: string
  }
}

export interface PaginationMeta {
  currentPage: number
  lastPage: number
  next?: number
  prev?: number
  perPage: number
  total: number
}

export interface CreateTicketPayload {
  subject: string
  floor: string
  screenshot?: string | null
  status: string | null
  message?: string | null
  departmentId: string
  createdById: string
}
