import { object, string } from "yup";

export const schema = object({
  email: string("ეს ველი უნდა იყოს ტექსტური სახის")
    .required("იმეილი არის სავალდებულო ველი")
    .email("იმეილის ველი არავალიდურია"),

  password: string("ეს ველი უნდა იყოს ტექსტური სახის")
    .required("პაროლი არის სავალდებულო ველი")
    .min(8, "პაროლი უნდა იყოს მინიმუმ 8 სიმბოლო"),
});
