export type User = {
    id: string,
    firstName: string,
    lastName: string,
    fullName: string,
    role: 'student' | 'teacher',
    picture: string,
    username: string
}

export type Classroom = {
    id: string,
    name: string,
    studentsCount: number,
    createdBy: User
}

export type AssignmentStudent = {
    user: User,
    completed: boolean,
    completedAt: string | null
}

export type Assignment = {
    id: string,
    title: string,
    studentsCount: number,
    completedCount: number,
    completed: boolean,
    createdAt: string,
    createdBy: User,
    students?: AssignmentStudent[]
}