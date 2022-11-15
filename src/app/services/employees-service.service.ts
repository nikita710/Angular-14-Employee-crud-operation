import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, map, retry } from "rxjs/operators";
import { Employee } from "../models/Employee";

@Injectable({
  providedIn: "root",
})
export class EmployeesServiceService {
  // private apiURL = "https://dummy.restapiexample.com/api/v1";
  private apiURL = "https://jsonplaceholder.typicode.com";

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  constructor(private http: HttpClient) {}

  // Get All Employee Details
  getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiURL + "/users").pipe(
      retry(2),
      map((res) => {
        return res;
      }),
      catchError(this.errorHandler)
    );
  }

  //Create new Employee
  create(employee: Employee): Observable<any> {
    return this.http
      .post(this.apiURL + "/users", JSON.stringify(employee), this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  //Update Employee
  update(id: number, employee: Employee): Observable<any> {
    return this.http
      .put(
        this.apiURL + "/users/" + id,
        JSON.stringify(employee),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  //View Employee
  find(id: number): Observable<any> {
    return this.http
      .get(this.apiURL + "/users/" + id)
      .pipe(catchError(this.errorHandler));
  }

  //Delete Employee
  delete(id: number) {
    return this.http
      .delete(this.apiURL + "/users/" + id, this.httpOptions)
      .pipe(retry(2), catchError(this.errorHandler));
  }

  errorHandler(error: any) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
