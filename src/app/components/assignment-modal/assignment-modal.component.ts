import { Component, inject, input, output, signal, TemplateRef, WritableSignal } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { AssignmentService } from '../../services/assignment.service';

@Component({
  selector: 'app-assignment-modal',
  imports: [FormsModule],
  templateUrl: './assignment-modal.component.html',
  styleUrl: './assignment-modal.component.css'
})
export class AssignmentModalComponent {
  protected assignmentSrv = inject(AssignmentService);
  private modalService = inject(NgbModal);

  classroomId = input.required<string>();
  created = output<void>();

  closeResult: WritableSignal<string> = signal('');

  title: string = '';

  open(content: TemplateRef<any>) {
    this.title = '';
    this.closeResult.set('');

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      () => {
        if (this.title.trim() === '') {
          this.closeResult.set('Attività non creata: titolo mancante');
        }
        else {
          this.saveAssignment();
        }
      },
      () => {
        this.closeResult.set('Attività non creata: sei uscito');
      },
    );
  }

  private saveAssignment() {
    this.assignmentSrv.add(this.classroomId(), this.title.trim()).subscribe({
      next: () => {
        this.closeResult.set('Attività creata');
        this.created.emit();
      },
      error: (response) => this.closeResult.set(response.error?.message ?? 'Si è verificato un errore')
    });
  }
}