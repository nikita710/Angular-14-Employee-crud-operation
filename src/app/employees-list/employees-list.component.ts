import { Component, Input, OnInit } from '@angular/core';
import { Employee } from '../models/Employee';
import { EmployeesServiceService } from '../services/employees-service.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css'],
})
export class EmployeesListComponent implements OnInit {
  myEmployees: Employee[] = [];
  constructor(public empService: EmployeesServiceService) {}

  ngOnInit(): void {
    this.empService.getAll().subscribe((response: Employee[]) => {
      this.myEmployees = response;
      console.log(this.myEmployees);
      // if (response && response["data"]) {
      //   this.myEmployees = response["data"];
      //   console.log(this.myEmployees);
      // }
    });
  }

  deletePost(id: number) {
    this.empService.delete(id).subscribe((res) => {
      this.myEmployees = this.myEmployees.filter((item) => item.id !== id);
      alert(`Employee ${id} Details deleted successfully!`);
      console.log(`Employee ${id} Details deleted successfully!`);

      // if (res && res["data"]) {
      //   this.myEmployees = this.myEmployees.filter((item) => item.id !== id);
      //   alert(`Employee ${id} Details deleted successfully!`);
      //   console.log(`Employee ${id} Details deleted successfully!`);
      // }
    });
  }
}
