import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

function BookForm({ book, onSubmit }) {
  const [error, setError] = useState("");
  const [vertinimasColor, setVertinimasColor] = useState("bg-gray-200");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      pavadinimas: book?.pavadinimas || "",
      kaina: book?.kaina || "",
      data1: book?.data1 || "",
      data2: book?.data2 || "",
      trukme: book?.trukme || "",
      nuotrauka: book?.nuotrauka || "",
      aprasymas: book?.aprasymas || "",
      // tinkaVaikams pašalinta
    },
  });

  useEffect(() => {
    if (book) {
      setValue("pavadinimas", book.pavadinimas, { shouldValidate: true });
      setValue("kaina", book.kaina, { shouldValidate: true });
      setValue("data1", book.data1, { shouldValidate: true });
      setValue("data2", book.data2, { shouldValidate: true });
      setValue("trukme", book.trukme, { shouldValidate: true });
      setValue("nuotrauka", book.nuotrauka, { shouldValidate: true });
      setValue("aprasymas", book.aprasymas, { shouldValidate: true });
      // setValue("tinkaVaikams", ...) pašalinta
    }
  }, [book, setValue]);

  const updateVertinimasColor = (vertinimas) => {
    if (!vertinimas) setVertinimasColor("bg-gray-200");
    else if (Number(vertinimas) >= 8) setVertinimasColor("bg-green-200");
    else if (Number(vertinimas) >= 5) setVertinimasColor("bg-yellow-200");
    else setVertinimasColor("bg-red-200");
  };

  const handleVertinimasChange = (event) => {
    const value = event.target.value;
    updateVertinimasColor(value);
  };

  const formSubmitHandler = async (data) => {
    // tinkaVaikams pašalinta
    try {
      await onSubmit(data);
      if (!book) reset();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(formSubmitHandler)} className="book-form">
      <h2>{book ? "Redaguoti knygą" : "Sukurti knygą"}</h2>
      {error && <p className="text-red-600 font-bold">{error}</p>}

      <div className="form-group">
        <label htmlFor="pavadinimas">Pavadinimas</label>
        <input
          className="bg-gray-200 rounded p-1 m-2 w-full"
          type="text"
          id="pavadinimas"
          name="pavadinimas"
          {...register("pavadinimas", { required: "Pavadinimas yra privalomas" })}
        />
        {errors.pavadinimas && <p className="error">{errors.pavadinimas.message}</p>}
      </div>

      {/* tinkaVaikams laukas pašalintas */}

      <div className="form-group">
        <label htmlFor="kaina">Kaina (EUR)</label>
        <input
          className="bg-gray-200 rounded p-1 m-2 w-full"
          type="number"
          id="kaina"
          name="kaina"
          {...register("kaina", { required: "Kaina yra privaloma" })}
        />
        {errors.kaina && <p className="error">{errors.kaina.message}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="data1">Data nuo</label>
        <input
          className="bg-gray-200 rounded p-1 m-2"
          placeholder="YYYY-MM-DD"
          type="date"
          id="data1"
          name="data1"
          {...register("data1", { required: "Pradžios data yra privaloma" })}
        />
        {errors.data1 && <p className="error">{errors.data1.message}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="data2">Data iki</label>
        <input
          className="bg-gray-200 rounded p-1 m-2"
          placeholder="YYYY-MM-DD"
          type="date"
          id="data2"
          name="data2"
          {...register("data2", { required: "Pabaigos data yra privaloma" })}
        />
        {errors.data2 && <p className="error">{errors.data2.message}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="trukme">Trukmė</label>
        <input
          className="bg-gray-200 rounded p-1 m-2 w-full"
          type="text"
          id="trukme"
          name="trukme"
          {...register("trukme", { required: "Trukmė yra privaloma" })}
        />
        {errors.trukme && <p className="error">{errors.trukme.message}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="nuotrauka">Nuotraukos URL</label>
        <input
          className="bg-gray-200 rounded p-1 m-2 w-full"
          type="text"
          id="nuotrauka"
          name="nuotrauka"
          {...register("nuotrauka", { required: "Nuotraukos URL yra privalomas" })}
        />
        {errors.nuotrauka && <p className="error">{errors.nuotrauka.message}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="aprasymas">Aprašymas</label>
        <textarea
          className="bg-gray-200 rounded p-1 m-2 w-full"
          id="aprasymas"
          name="aprasymas"
          rows={3}
          {...register("aprasymas", { required: "Aprašymas yra privalomas" })}
        />
        {errors.aprasymas && <p className="error">{errors.aprasymas.message}</p>}
      </div>

      <button
        className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
        type="submit"
      >
        {book ? "Atnaujinti" : "Sukurti"}
      </button>
    </form>
  );
}

export default BookForm;