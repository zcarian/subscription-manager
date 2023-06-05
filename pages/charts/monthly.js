// import Window from "../../components/Window";
// import useSWR from 'swr'
// import ColumnChart from "../../components/ColumnChart";
// import { useRouter } from 'next/router'

// export default function (){
//     const {push} = useRouter();
    
//     const buttons =[
//         {
//           name:'Previous',
//           icon:'/previous1.png',
//           onClick(){
//             push('/charts/summary')
//           }
//         },
//         {
//           name:'Next',
//           icon:'/next1.png',
//           onClick(){
//             push('/charts/total')
//           }
//         },
//       ]

//     const { data, isLoading } = useSWR('/api/subscribed-apps');    

//     if (isLoading) return <div>Loading...</div>;

//     return (
//         <Window areButtons={true} isMirrored={true} buttons={buttons} >
//             <ColumnChart data={data}/>
//         </Window>
//     )
// }