export enum OccurenceStatus {
  OPEN = 'OPEN',
  UNDER_ANALYSIS = 'UNDER_ANALYSIS',
  IN_PROGRESS = 'IN_PROGRESS',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
}

export enum OccurencePriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export enum OccurenceRating {
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
}

export enum OccurenceRequestStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export enum OccurenceRequestType {
  COMPLETION = 'COMPLETION',
  CANCELLATION = 'CANCELLATION',
}