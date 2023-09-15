import React,{useState,useEffect} from 'react'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAppContext } from '../../context/AppContext';






const WeeklyChart = () => {

    const { initLoading: isInitLoading, showNavbar, toggleNavbar, setEscapeOverflow } =
    useAppContext();



    const [data, setData] = useState(null)
    function isoStringToDate(s) {
      var b = s.split(/\D/);
      return new Date(Date.UTC(b[0], --b[1], b[2], b[3]||0, b[4]||0, b[5]||0, b[6]||0));
    }
const handleMonth = async()=>{
   setEscapeOverflow(true)
   try {
    const token = JSON.parse(localStorage.getItem("Token"))
    const response = await fetch(`${process.env.REACT_APP_PROXY}/weeklychart`, {
        method: "POST",
  
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({month:"08",token:token }),
      });
  
      const json = await response.json();
      const invoices = json.invoices
       let Sunday = []
       let Monday = []
       let Tuesday = []
       let Wednesday = []
       let Thursday = []
       let Friday = []
       let Saturday = []
       for (const key in invoices) {
         if (invoices.hasOwnProperty(key) && invoices[key].data) {
           if (isoStringToDate( invoices[key].createdAt).getDay()===0) {
              const day = {name:"Sun",Sale: invoices[key].data[0].totalAmount}
              Sunday.push(day)
           } 
           else if (isoStringToDate( invoices[key].createdAt).getDay()===1) {
            const day = {name:"Mon",Sale: invoices[key].data[0].totalAmount}
            Monday.push(day)
           }
           else if (isoStringToDate( invoices[key].createdAt).getDay()===2) {
            const day = {name:"Tue",Sale: invoices[key].data[0].totalAmount}
            Tuesday.push(day)
           }
           else if (isoStringToDate( invoices[key].createdAt).getDay()===3) {
            const day = {name:"Wed",Sale: invoices[key].data[0].totalAmount}
            Wednesday.push(day)
           }
           else if (isoStringToDate( invoices[key].createdAt).getDay()===4) {
            const day = {name:"Thu",Sale: invoices[key].data[0].totalAmount}
            Thursday.push(day)
           }
           else if (isoStringToDate( invoices[key].createdAt).getDay()===5) {
            const day = {name:"Fri",Sale: invoices[key].data[0].totalAmount}
            Friday.push(day)
           }
           else if (isoStringToDate( invoices[key].createdAt).getDay()===6) {
            const day = {name:"Sat",Sale: invoices[key].data[0].totalAmount}
            Saturday.push(day)
           }

         }
        }
        const Sundayresult = Sunday.reduce((accumulator, currentValue) => {
          // Check if the accumulator already has a property with the name
          if (!accumulator[currentValue.name]) {
            accumulator[currentValue.name] = {
              name: currentValue.name,
              Sale: 0,
            };
          }
        
          // Add the current price to the accumulator
          accumulator[currentValue.name].Sale += currentValue.Sale;
        
          return accumulator;
        }, {});
        const   SunadyResult = Object.values(Sundayresult);
        const Mondayresult = Monday.reduce((accumulator, currentValue) => {
          // Check if the accumulator already has a property with the name
          if (!accumulator[currentValue.name]) {
            accumulator[currentValue.name] = {
              name: currentValue.name,
              Sale: 0,
            };
          }
        
          // Add the current price to the accumulator
          accumulator[currentValue.name].Sale += currentValue.Sale;
        
          return accumulator;
        }, {});
        const   MondayResult = Object.values(Mondayresult);
        const Tuesdayresult = Tuesday.reduce((accumulator, currentValue) => {
          // Check if the accumulator already has a property with the name
          if (!accumulator[currentValue.name]) {
            accumulator[currentValue.name] = {
              name: currentValue.name,
              Sale: 0,
            };
          }
        
          // Add the current price to the accumulator
          accumulator[currentValue.name].Sale += currentValue.Sale;
        
          return accumulator;
        }, {});
        const   TuesdayResult = Object.values(Tuesdayresult);
        const Wednesdayresult = Wednesday.reduce((accumulator, currentValue) => {
          // Check if the accumulator already has a property with the name
          if (!accumulator[currentValue.name]) {
            accumulator[currentValue.name] = {
              name: currentValue.name,
              Sale: 0,
            };
          }
        
          // Add the current price to the accumulator
          accumulator[currentValue.name].Sale += currentValue.Sale;
        
          return accumulator;
        }, {});
        const   WednesdayResult = Object.values(Wednesdayresult);
        const Thursdayresult = Thursday.reduce((accumulator, currentValue) => {
          // Check if the accumulator already has a property with the name
          if (!accumulator[currentValue.name]) {
            accumulator[currentValue.name] = {
              name: currentValue.name,
              Sale: 0,
            };
          }
        
          // Add the current price to the accumulator
          accumulator[currentValue.name].Sale += currentValue.Sale;
        
          return accumulator;
        }, {});
        const   ThursdayResult = Object.values(Thursdayresult);
        const Fridayresult = Friday.reduce((accumulator, currentValue) => {
          // Check if the accumulator already has a property with the name
          if (!accumulator[currentValue.name]) {
            accumulator[currentValue.name] = {
              name: currentValue.name,
              Sale: 0,
            };
          }
        
          // Add the current price to the accumulator
          accumulator[currentValue.name].Sale += currentValue.Sale;
        
          return accumulator;
        }, {});
        const   FridayResult = Object.values(Fridayresult);
        const Saturdayresult = Saturday.reduce((accumulator, currentValue) => {
          // Check if the accumulator already has a property with the name
          if (!accumulator[currentValue.name]) {
            accumulator[currentValue.name] = {
              name: currentValue.name,
              Sale: 0,
            };
          }
        
          // Add the current price to the accumulator
          accumulator[currentValue.name].Sale += currentValue.Sale;
        
          return accumulator;
        }, {});
        const   SaturdayResult = Object.values(Saturdayresult);
        const ChartData = []
        ChartData.push(SunadyResult[0],MondayResult[0],TuesdayResult[0],WednesdayResult[0],ThursdayResult[0],FridayResult[0],SaturdayResult[0])
        setData(ChartData)
      setEscapeOverflow(false)
    } catch (error) {
        console.log(error)
        setEscapeOverflow(false)
    }
    }
    useEffect(() => {
    handleMonth();
    }, [])
    
  return (
    <div>
     { data &&   <div className=" my-4 rounded-xl bg-white sm:hidden md:hidden lg:hidden xl:block 2xl:block">
                          <h1 className="text-center text-gray-400 font-bold pt-8 text-2xl">Weekly Sale Chart</h1>
                          <BarChart className="w-full mx-auto"
         width={650}
          height={500}
          data={data}
       barSize={30}
       cy={10}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
         
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Sale" fill="#2B8DFC" widths={20} />
        </BarChart>
            </div>}
    </div>
  )
}

export default WeeklyChart
