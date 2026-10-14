import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class JwtService {

    // TOKEN

    setToken(token: string) {
        localStorage.setItem('authToken', token);
    }

    getToken(): string | null {
        return localStorage.getItem('authToken');
    }

    hasToken(): boolean {
        return !!this.getToken();
    }

    removeToken() {
        localStorage.removeItem('authToken');
    }


    // FIRSTNAME

    setfirstName(firstName: string) {
        localStorage.setItem('firstName', firstName);
    }

    getfirstName(): string | null {
        return localStorage.getItem('firstName');
    }

    removefirstName() {
        localStorage.removeItem('firstName');
    }


    // LASTNAME

    setlastName(lastName: string) {
        localStorage.setItem('lastName', lastName);
    }

    getlastName(): string | null {
        return localStorage.getItem('lastName');
    }

    removelastName() {
        localStorage.removeItem('lastName');
    }
}