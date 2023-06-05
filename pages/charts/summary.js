// import Window from "../../components/Window";
// import useSWR from 'swr'
// import DonutChart from "../../components/DonutChart";
// import { useRouter } from 'next/router'

// export default function (){
//     const {push} = useRouter();
//     const { data, isLoading } = useSWR('/api/subscribed-apps');    
    
//     const buttons =[
//         {
//           name:'Previous',
//           icon:'/previous1.png',
//           onClick(){
//             push('/charts/total')
//           }
//         },
//         {
//           name:'Next',
//           icon:'/next1.png',
//           onClick(){
//             push('/charts/monthly')
//           }
//         },
//       ]

//     if (isLoading) return <div>Loading...</div>;

//     return (
//         <Window areButtons={true} isMirrored={true} buttons={buttons} >
//             <DonutChart data={data}/>
//         </Window>
//     )
// }