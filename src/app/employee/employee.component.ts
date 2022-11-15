import { Component, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Employee } from "../models/Employee";
import { EmployeesServiceService } from "../services/employees-service.service";

@Component({
  selector: "app-employee",
  templateUrl: "./employee.component.html",
  styleUrls: ["./employee.component.css"],
})
export class EmployeeComponent {
  id!: number;
  employee!: Employee;
  constructor(
    public empService: EmployeesServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];

    this.empService.find(this.id).subscribe((data: Employee) => {
      this.employee = data;
    });
  }
}
