import { useState } from "react";
import "./App.css";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

function App() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const [validationErrors, setValidationErrors] = useState({
    email: "",
    password: "",
  });

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const validateInput = (name, value) => {
    switch (name) {
      case "email":
        if (value === "") return "Email is required";
        else if (!value.includes("@")) return "Email must include @";
        else return "";
      case "password":
        if (value === "") return "Password is required";
        else if (value.length < 8)
          return "Password must be at least 8 characters long";
        else return "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // name: email/password
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setValidationErrors((prev) => ({
      ...prev,
      [name]: validateInput(name, value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("form submitted!");

    setIsLoading(true);

    try {
      const response = await axios.post("/login", form);
      setSuccess("Successfull Login...");
    } catch (error) {
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-[300px] mt-10 mx-auto w-full"
      >
        <input
          type="email"
          name="email"
          placeholder="Enter Email..."
          value={form.email}
          onChange={handleChange}
          // onChange={(e) => handleChange(e)}
          className="border border-stone-400 rounded-md px-3 w-full"
        />
        {validationErrors.email && (
          <p className="text-red-500 rounded-sm">{validationErrors.email}</p>
        )}
        <div className="relative">
          <input
            type={isPasswordShown ? "text" : "password"}
            name="password"
            placeholder="Enter Password..."
            value={form.password}
            onChange={handleChange}
            className="border border-stone-400 rounded-md px-3 w-full"
          />
          <div className=" absolute top-[0px] right-[10px]">
            {isPasswordShown ? (
              <EyeOff
                color="#000000"
                onClick={() => setIsPasswordShown(false)}
              />
            ) : (
              <Eye color="#000000" onClick={() => setIsPasswordShown(true)} />
            )}
          </div>
        </div>

        {validationErrors.password && (
          <p className="text-red-500 rounded-sm">{validationErrors.password}</p>
        )}
        {isLoading && <p>Loading...</p>}
        {error && (
          <p className="border border-red-500 px-3 text-red-500 rounded-sm">
            {error}
          </p>
        )}
        {success && (
          <p className="border border-green-500 px-3 text-green-500 rounded-sm">
            {success}
          </p>
        )}
        <button
          // type="submit"
          // onClick={handleSubmit}
          className="text-white bg-blue-400 rounded-md px-4 py-1 cursor-pointer"
        >
          Send
        </button>
        {/* <button
          type="button"
          className="text-white bg-blue-400 rounded-md px-4 py-1 cursor-pointer"
        >
          cancel
        </button> */}
        {console.log("form data:", form)}
      </form>
    </>
  );
}

export default App;
