import { Component, inject, signal, TemplateRef, WritableSignal, OnInit, output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal';
import { ClassroomService } from '../../services/classroom.service';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { User } from '../../entities';

@Component({
  selector: 'app-classroom-modal',
  imports: [FormsModule],
  templateUrl: './classroom-modal.component.html',
  styleUrl: './classroom-modal.component.css'
})
export class ClassroomModalComponent implements OnInit {
  protected classroomSrv = inject(ClassroomService);
  protected userSrv = inject(UserService);

  private modalService = inject(NgbModal);
  closeResult: WritableSignal<string> = signal('');

  created = output<void>();
  name: string = '';
  students = signal<User[]>([]);
  selectedStudents: string[] = [];

  ngOnInit() {
    this.userSrv.list('student').subscribe(students => this.students.set(students));
  }

  open(content: TemplateRef<any>) {
    this.name = '';
    this.selectedStudents = [];

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      () => {
        if (this.name === '' || this.selectedStudents.length === 0) {
          this.closeResult.set('Classe non creata: nome mancante o nessuno studente selezionato');
        }
        else {
          this.saveClassroom();
          this.closeResult.set(`Classe creata`);
        }
      },
      () => {
        this.closeResult.set('Classe non creata: sei uscito');
      },
    );
  }

  toggleStudent(studentId: string, checked: boolean) {
    if (checked) {
      this.selectedStudents.push(studentId);
    } else {
      this.selectedStudents = this.selectedStudents.filter(id => id !== studentId);
    }
  }

  private saveClassroom() {
    if (!this.name || this.selectedStudents.length === 0) return;

    this.classroomSrv.add(this.name, this.selectedStudents).subscribe(() => this.created.emit());
  }
}