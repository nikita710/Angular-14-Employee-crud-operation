import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { EmployeesServiceService } from "../services/employees-service.service";

@Component({
  selector: "app-employee-create",
  templateUrl: "./employee-create.component.html",
  styleUrls: ["./employee-create.component.css"],
})
export class EmployeeCreateComponent implements OnInit {
  form!: FormGroup;

  constructor(
    public empService: EmployeesServiceService,
    private router: Router
  ) {}

  ngOnInit() {
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
    this.empService.create(this.form.value).subscribe((res: any) => {
      console.log("Employee created successfully!");
      alert("Employee created successfully!");
      this.router.navigateByUrl("employee-list");
    });
  }
}
