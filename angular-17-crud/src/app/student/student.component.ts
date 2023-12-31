// student.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements OnInit {
  students: any[] = [];
  stname: string = '';
  course: string = '';
  fee: number = 0;
  currentStudentID: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getAllStudents();
  }

  getAllStudents() {
    this.http.get('http://localhost:9002/api/students').subscribe(
      (resultData: any) => {
        this.students = resultData.data;
      },
      (error) => {
        console.error('Error fetching students', error);
      }
    );
  }

  register() {
    const bodyData = {
      stname: this.stname,
      course: this.course,
      fee: this.fee,
    };

    this.http.post('http://localhost:9002/api/students/add', bodyData).subscribe(
      (resultData: any) => {
        console.log(resultData);
        alert('Student Registered Successfully');
        this.getAllStudents();
        this.resetForm();
      },
      (error) => {
        console.error('Error registering student', error);
      }
    );
  }

  updateRecord() {
    const bodyData = {
      stname: this.stname,
      course: this.course,
      fee: this.fee,
    };

    this.http
      .put(`http://localhost:9002/api/students/update/${this.currentStudentID}`, bodyData)
      .subscribe(
        (resultData: any) => {
          console.log(resultData);
          alert('Student Updated Successfully');
          this.getAllStudents();
          this.resetForm();
        },
        (error) => {
          console.error('Error updating student', error);
        }
      );
  }

  save() {
    if (this.currentStudentID === '') {
      this.register();
    } else {
      this.updateRecord();
    }
  }

  setUpdate(data: any) {
    this.stname = data.stname;
    this.course = data.course;
    this.fee = data.fee;
    this.currentStudentID = data.id;
  }

  deleteRecord(data: any) {
    this.http.delete(`http://localhost:9002/api/students/delete/${data.id}`).subscribe(
      (resultData: any) => {
        console.log(resultData);
        alert('Student Deleted Successfully');
        this.getAllStudents();
        this.resetForm();
      },
      (error) => {
        console.error('Error deleting student', error);
      }
    );
  }

  resetForm() {
    this.stname = '';
    this.course = '';
    this.fee = 0;
    this.currentStudentID = '';
  }
}
