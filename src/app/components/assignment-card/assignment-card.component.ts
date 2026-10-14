import { Component, inject, input, output, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AssignmentService } from '../../services/assignment.service';
import { AuthService } from '../../services/auth.service';
import { Assignment } from '../../entities';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assignment-card',
  imports: [DatePipe],
  templateUrl: './assignment-card.component.html',
  styleUrl: './assignment-card.component.css',
})
export class AssignmentCardComponent {
  protected assignmentSrv = inject(AssignmentService);
  protected authSrv = inject(AuthService);
  protected router = inject(Router);

  assignment = input.required<Assignment>();
  classroomId = input.required<string>();
  assignmentUpdated = output<Assignment>();

  completing = signal(false);
  errorMessage = signal<string | null>(null);

  complete() {
    this.completing.set(true);
    this.assignmentSrv.complete(this.classroomId(), this.assignment().id).subscribe({
      next: (updated) => {
        this.completing.set(false);
        this.assignmentUpdated.emit(updated);
      },
      error: (response) => {
        this.completing.set(false);
        this.errorMessage.set(response.error?.message ?? 'Si è verificato un errore');
      }
    });
  }

  open() {
    if (this.isTeacher()) {
      this.router.navigate(['/classroom', this.classroomId(), 'assignment', this.assignment().id]);
    }
  }

  isStudent() {
    return this.authSrv.currentUser()?.role === 'student';
  }

  isTeacher() {
    return this.authSrv.currentUser()?.role === 'teacher';
  }
}