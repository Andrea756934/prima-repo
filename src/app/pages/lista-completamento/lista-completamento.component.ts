import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AssignmentService } from '../../services/assignment.service';
import { AssignmentStudent } from '../../entities';
import { NavbarComponent } from '../../components/nav-bar/nav-bar.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-lista-completamento',
  imports: [
    NavbarComponent,
    RouterLink,
    DatePipe
  ],
  templateUrl: './lista-completamento.component.html',
  styleUrl: './lista-completamento.component.css',
})
export class ListaCompletamentoComponent {
  protected assignmentSrv = inject(AssignmentService);
  private route = inject(ActivatedRoute);

  classroomId = signal<string>('');
  students = signal<AssignmentStudent[]>([]);
  errorMessage = signal<string | null>(null);

  ngOnInit() {
    const classroomId = this.route.snapshot.paramMap.get('classroomId');
    const assignmentId = this.route.snapshot.paramMap.get('assignmentId');

    if (classroomId && assignmentId) {
      this.classroomId.set(classroomId);
      this.assignmentSrv.list(classroomId).subscribe({
        next: (assignments) => {
          const assignment = assignments.find(a => a.id === assignmentId);
          this.students.set(assignment?.students ?? []);
        },
        error: (response) => this.errorMessage.set(response.error?.message ?? 'Si è verificato un errore')
      });
    }
  }
}