import { Component, inject, input, signal } from '@angular/core';
import { Classroom } from '../../entities';
import { ClassroomService } from '../../services/classroom.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-classroom-card',
  imports: [RouterLink],
  templateUrl: './classroom-card.component.html',
  styleUrl: './classroom-card.component.css',
})
export class ClassroomCardComponent {
  protected classroomSrv = inject(ClassroomService);
  classroom = input.required<Classroom>();

  classrooms = signal<Classroom[]>([]);
}
