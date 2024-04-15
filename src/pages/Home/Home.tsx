import "./Home.css";
import { useContext, useEffect, useState } from "react";
import Graphic from "../../components/Graphic/Graphic";
import ExpressionContext from "../../context/ExpressionContext";
import { compile, derivative } from "mathjs";
import { navigate } from "wouter/use-browser-location";
import { IoCalculator } from "react-icons/io5";



export default function Home() {
  const { expression, setExpression } = useContext(ExpressionContext);
  const [method, setMethod] = useState(null);

  const derivate = (fn: string) => {
    try {
      return derivative(fn, "x").toString();
    } catch (e: any) {
      return "";
    }
  };

  const evaluateFunction = (fn: string) => {
    let auxfn;
    try {
      compile(fn);
      auxfn = fn;
    } catch (e: any) {
      auxfn = "";
    } finally {
      return auxfn;
    }
  };

  const setFunction = (e: any) => {
    const string = e.target.value;
    const newFn = {
      fn: evaluateFunction(string),
      derivative: derivate(string),
    };
    setExpression(newFn);
  };

  const selectMethod = ({ target }: any) => {
    const { value } = target;
    setMethod(value);
  };

  const submitMethodData = (e: any) => {
    e.preventDefault();
    const inputa = document.querySelector("#a") as HTMLInputElement;
    if (method !== "newton") {
      const inputb = document.querySelector("#b") as HTMLInputElement;
      const a = Number.parseFloat(inputa.value);
      const b = Number.parseFloat(inputb.value);
      expression.interval = [a, b];
    } else {
      expression.interval = [Number.parseFloat(inputa.value), 0];
      expression.compiledDerivative = compile(expression.derivative);
    }
    expression.compiledFn = compile(expression.fn);
    console.log(expression);
    setExpression(expression);
    navigate(`/${method}`);
  };

  useEffect(() => {
    console.log(expression);
  }, [expression]);

  return (
    <section className="home" style={{textAlign:"center" , alignItems:"center" , justifyContent:"center"}}>
      <h1 style={{ fontSize:"35pt" , color:"black" , textAlign:"center" ,alignItems:"center" , justifyContent:"center", marginLeft:"90%"}}> Metodos numericos:</h1>
      <form
        className="selection-method"
        aria-required
        onSubmit={submitMethodData}
        style={{justifyContent:"center" , alignItems:"cneter"}}
      >
        {/* <Expressions expression={expression} SetExpression={SetExpression}/> */}
        <input
          type="text"
          id="funcion"
          onInput={setFunction}
          placeholder="Ingrese la funcion"
          required
          style={{background:"#A6F0FA", borderRadius:"15px" , color:"black"}}
        />

        <fieldset
          className="interval-input"
          style={{ display: "flex", alignItems: "center" }}
        >
          <h2 style={{fontSize:"25pt", marginRight:"20px"}}>Ingrese el intervalo</h2>
          <label style={{ marginRight: "90px" , color:"black" , fontSize:"25pt" }}>
            a: <input type="number" id="a" required step="0.1" style={{fontSize:"25pt"}}/>
          </label>
          <label style={{color:"black" , fontSize:"25pt"}}>
            b: <input type="number" id="b" required step="0.1" style={{fontSize:"25pt"}}  />
          </label>
        </fieldset>

        <Graphic expression={expression} />

        <h1 style={{color:"black"}}>Seleciona una opcion y luego preciona calcular</h1>
        <div  style={{justifyContent:"center" , alignItems:"cneter" , fontSize:"20pt" , fontWeight:"700" , borderRadius:"20px" , padding:"0px"}}>
          <input
            id="biseccion"
            type="radio"
            name="metodo"
            value="biseccion"
            onInput={selectMethod}
          />
          <label htmlFor="biseccion">Biseccion</label>
          <input
            id="falsa"
            type="radio"
            name="metodo"
            value="falsa-posicion"
            onInput={selectMethod}
          />
          <label htmlFor="falsa">Falsa posicion</label>
          <input
            id="secante"
            type="radio"
            name="metodo"
            value="secante"
            required
            onInput={selectMethod}
          />
          <label htmlFor="secante">Secante</label>
          <input
            id="newton"
            type="radio"
            name="metodo"
            value="newton"
            onInput={selectMethod}
          />
          <label htmlFor="newton">Newton Raphson</label>


        </div>
        <button value={"Calcular"} style={{marginLeft:"0%" , height:"60px" , textAlign:"center" , color:"white"}}>
          <svg
            width="128"
            height="128"
            viewBox="0 0 128 128"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="128" height="128" fill="url(#pattern0_320_2)" />
            <defs>
              <pattern
                id="pattern0_320_2"
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1"
              >
                <use href="#image0_320_2" transform="scale(0.0078125)" />
              </pattern>
            </defs>
          </svg>

          <h1>Calcular <IoCalculator size={40} style={{alignContent:"center" , justifyContent:"center"}} /></h1>
        </button>
      </form>
    </section>
  );
}
