import { Component, Input } from '@angular/core';
import { StudentAnswer } from '../interface';

@Component({
  selector: 'app-resultdetail-modal',
  standalone: true,
  imports: [],
  templateUrl: './resultdetail-modal.component.html',
  styleUrl: './resultdetail-modal.component.scss',
})
export class ResultdetailModalComponent {
  @Input() data!: StudentAnswer[];
  ngOnInit(): void {
  }
}
