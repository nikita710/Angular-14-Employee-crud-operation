import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Employee } from "../models/Employee";
import { EmployeesServiceService } from "../services/employees-service.service";

@Component({
  selector: "app-employee-update",
  templateUrl: "./employee-update.component.html",
  styleUrls: ["./employee-update.component.css"],
})
export class EmployeeUpdateComponent implements OnInit {
  id!: number;
  form!: FormGroup;
  employee!: Employee;

  constructor(
    public empService: EmployeesServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params["id"];
    this.empService.find(this.id).subscribe((data: Employee) => {
      this.employee = data;
    });

    this.form = new FormGroup({
      name: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required]),
      phone: new FormControl("", [Validators.required]),
    });
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    console.log(this.form.value);
    this.empService.update(this.id, this.form.value).subscribe((res: any) => {
      console.log("Employee updated successfully!");
      alert("Employee updated successfully!");
      this.router.navigateByUrl("employee-list");
      this.employee = res;
    });
  }
}
