import React,{useState,useEffect} from 'react'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAppContext } from '../../context/AppContext';
import { useSelector} from "react-redux";
import { Chart } from '../../store/authSlice';





const WeeklyChart = () => {
    const data = useSelector(Chart);
 
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
      
            </div>  }
    </div>
  )
}

export default WeeklyChart
