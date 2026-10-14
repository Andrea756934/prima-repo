import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Assignment } from '../entities';

@Injectable({
    providedIn: 'root',
})
export class AssignmentService {
    protected http = inject(HttpClient);

    list(classroomId: string) {
        return this.http.get<Assignment[]>(`/api/classroom/${classroomId}/assignment`);
    }

    add(classroomId: string, title: string) {
        return this.http.post<Assignment>(`/api/classroom/${classroomId}/assignment`, { title });
    }

    complete(classroomId: string, assignmentId: string) {
        return this.http.put<Assignment>(`/api/classroom/${classroomId}/assignment/${assignmentId}`, {});
    }
}