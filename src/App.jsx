import "./App.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./Validations/LoginValidation";

function App() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });
  // console.log(form);

  const onSubmit = (data) => {
    console.log("Submitted!", data);
    reset({
      email: "",
      password: "",
    });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-8 max-w-[300px] mt-10 mx-auto w-full"
      >
        <div className="relative">
          <input
            type="email"
            placeholder="Enter Email..."
            {...register("email")}
            //  {...register("email", {
            //   required: "იმეილი არის სავალდებულო ველი",
            //   validate: (value) => {
            //     if (!value.includes("@")) {
            //       return "იმეილი უნდა შეიცავდეს @ სიმბოლოს";
            //     }
            //     return true;
            //   },
            // })}
            className="border border-stone-400 rounded-md px-4 py-2 w-full"
          />
          {errors.email && (
            <p className="text-red-500 text-[12px] px-2 absolute top-[-10px] left-5 bg-white">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="relative">
          <input
            type={"password"}
            placeholder="Enter Password..."
            {...register("password")}
            // {...register("password", {
            //   required: "პაროლი არის სავალდებულო ველი",
            // })}
            className="border border-stone-400 rounded-md px-4 py-2 w-full"
          />
          {errors.password && (
            <p className="text-red-500 text-[12px] px-2 absolute top-[-10px] left-5 bg-white">
              {errors.password.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="text-white bg-blue-400 rounded-md px-4 py-1 cursor-pointer"
        >
          Send
        </button>
      </form>
    </>
  );
}

export default App;
