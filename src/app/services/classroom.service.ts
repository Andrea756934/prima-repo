import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Classroom } from '../entities';

@Injectable({
    providedIn: 'root',
})
export class ClassroomService {
    protected http = inject(HttpClient);

    list() {
        return this.http.get<Classroom[]>('/api/classroom');
    }

    add(name: string, students: string[]) {
        return this.http.post<Classroom>('/api/classroom', { name, students });
    }
}