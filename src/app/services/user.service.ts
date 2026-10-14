import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../entities';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    protected http = inject(HttpClient);

    list(role?: 'student' | 'teacher') {
        let params = new HttpParams();
        if (role) {
            params = params.set('role', role);
        }

        return this.http.get<User[]>('/api/user', { params });
    }
}