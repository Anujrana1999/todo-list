import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  myNotes: string[] = [];
  totalNotes: number = 0;
  edit: boolean = false;
  editIndex: number = 0;
  error: string = '';

  constructor() { }
  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      let allNotes = localStorage.getItem('my-notes');
      if (allNotes) {
        this.myNotes = JSON.parse(allNotes);
        this.totalNotes = this.myNotes.length;
      }
    } else {
      console.warn('localStorage is not available.');
    }
  }

  addNote(note: string) {
    if (note.length) {
      this.myNotes.push(note);
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('my-notes', JSON.stringify(this.myNotes));
        this.totalNotes = this.myNotes.length;
      } else {
        console.warn('localStorage is not available.');
      }
    }
    else {
      this.error = '*Field can\'t be empty!'
    }
  }

  removeNote(noteIndex: number) {
    this.myNotes.splice(noteIndex, 1);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('my-notes', JSON.stringify(this.myNotes));
      this.totalNotes = this.myNotes.length;
    } else {
      console.warn('localStorage is not available.');
    }
  }

  editNote(noteIndex: number, note: string) {
    if (note.length) {
      this.editIndex = noteIndex;
      this.myNotes[noteIndex] = note;
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('my-notes', JSON.stringify(this.myNotes));
      } else {
        console.warn('localStorage is not available.');
      }
      this.edit = false;
    }
    else {
      this.error = '*Field can\'t be empty!'
    }
  }
  openEditNote(noteIndex: number) {
    this.editIndex = noteIndex;
    this.edit = true;
  }
}
