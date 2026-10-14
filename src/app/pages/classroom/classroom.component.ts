import { Component, inject, signal } from '@angular/core';
import { ClassroomService } from '../../services/classroom.service';
import { Classroom } from '../../entities';
import { ClassroomCardComponent } from '../../components/classroom-card/classroom-card.component';
import { NavbarComponent } from '../../components/nav-bar/nav-bar.component';
import { ClassroomModalComponent } from '../../components/classroom-modal/classroom-modal.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-classroom',
  imports: [ClassroomCardComponent, NavbarComponent, ClassroomModalComponent],
  templateUrl: './classroom.component.html',
  styleUrl: './classroom.component.css',
})
export class ClassroomComponent {
  protected classroomSrv = inject(ClassroomService);
  protected authSrv = inject(AuthService);

  classrooms = signal<Classroom[]>([]);
  errorMessage = signal<string | null>(null);

  ngOnInit() {
    this.fetch();
  }

  fetch() {
    this.classroomSrv.list().subscribe({
      next: (classrooms) => this.classrooms.set(classrooms),
      error: (response) => this.errorMessage.set(response.error?.message ?? 'Si è verificato un errore')
    });
  }

  isteacher() {
    return this.authSrv.currentUser()?.role === 'teacher';
  }
}
