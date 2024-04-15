import functionPlot from "function-plot"
import { compile } from "mathjs"
import { useContext, useEffect } from "react"
import ExpressionContext from "../../context/ExpressionContext"
import { BsGraphDown } from "react-icons/bs";


type Props = {
    expression: any,
}

export default function Graphic ({expression}: Props){

    const evaluateFunction = (argument: number) => {
        try{
            const compiled = compile(expression.fn)
            return compiled.evaluate({
                x: argument
            })
        } catch (e:any){
            return NaN
        }
    }

    useEffect( () => {
        if(expression.fn){
            try{
                functionPlot({
                    target: "#graphic",
                    width: 1000,
                    height: 600,
                    disableZoom: false,
                    yAxis: { domain: [-10,10]},
                    xAxis: {domain: [-10,10]},
                    grid: true,
                    data: [
                        {
                            fn: expression.fn,
                            derivative: {
                                fn: expression.derivative,
                                updateOnMouseMove: true
                            }
                        }
                    ]
                })

            } catch (e:any){

            }
        }
    }, [expression])

    try {
       
    } catch (e:any) {
        console.log(e)
        
    }

    return (
        <>
            <h2 style={{fontSize:"30pt"}}>Grafica <BsGraphDown/></h2>
            <h2 style={{fontSize:"25pt"}}>Derivada: {expression.derivative}</h2>
            <h2 style={{fontSize:"25pt"}}>Evaluado con 5 es igual a {evaluateFunction(5)}</h2>
            <figure id="graphic">

            </figure>
        </>

    )
}