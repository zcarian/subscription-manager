// import Window from "../../components/Window";
// import useSWR from 'swr'
// import BarChartComponent from "../../components/BarChart";
// import { useRouter } from 'next/router'

// export default function (){
//     const {push} = useRouter();
//     const buttons =[
//         {
//           name:'Previous',
//           icon:'/previous1.png',
//           onClick(){
//             push('/charts/monthly')
//           }
//         },
//         {
//           name:'Next',
//           icon:'/next1.png',
//           onClick(){
//             push('/charts/summary')
//           }
//         },
//       ]

//     const { data, isLoading } = useSWR('/api/subscribed-apps');    

//     if (isLoading) return <div>Loading...</div>;

//     return (
//         <Window areButtons={true} isMirrored={true} buttons={buttons} >
//             <BarChartComponent data={data}/>
//         </Window>
//     )
// }