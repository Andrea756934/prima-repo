import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AssignmentService } from '../../services/assignment.service';
import { AuthService } from '../../services/auth.service';
import { Assignment } from '../../entities';
import { NavbarComponent } from '../../components/nav-bar/nav-bar.component';
import { AssignmentCardComponent } from '../../components/assignment-card/assignment-card.component';
import { AssignmentModalComponent } from '../../components/assignment-modal/assignment-modal.component';

@Component({
  selector: 'app-assignment',
  imports: [
    RouterLink,
    NavbarComponent,
    AssignmentCardComponent,
    AssignmentModalComponent
  ],
  templateUrl: './assignment.component.html',
  styleUrl: './assignment.component.css',
})
export class AssignmentComponent {
  protected assignmentSrv = inject(AssignmentService);
  protected authSrv = inject(AuthService);
  private route = inject(ActivatedRoute);

  classroomId = signal<string>('');
  assignments = signal<Assignment[]>([]);
  errorMessage = signal<string | null>(null);
  expandedAssignmentId = signal<string | null>(null);

  ngOnInit() {
    const classroomId = this.route.snapshot.paramMap.get('classroomId');
    if (classroomId) {
      this.classroomId.set(classroomId);
      this.fetch();
    }
  }

  fetch() {
    this.assignmentSrv.list(this.classroomId()).subscribe({
      next: (assignments) => this.assignments.set(assignments),
      error: (response) => this.errorMessage.set(response.error?.message ?? 'Si è verificato un errore')
    });
  }

  complete(assignmentId: string) {
    this.assignmentSrv.complete(this.classroomId(), assignmentId).subscribe({
      next: () => this.fetch(),
      error: (response) => this.errorMessage.set(response.error?.message ?? 'Si è verificato un errore')
    });
  }

  assignmentUpdated(updated: Assignment) {
    this.assignments.update(list =>
      list.map(a => a.id === updated.id ? updated : a)
    );
  }

  isteacher() {
    return this.authSrv.currentUser()?.role === 'teacher';
  }
}