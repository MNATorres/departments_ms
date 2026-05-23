export interface Employee {
  emp_no: number;
  birth_date: Date | string;
  first_name: string;
  last_name: string;
  gender: "M" | "F";
  hire_date: Date | string;
}
