import useSWR from 'swr';
import AppList from '../../components/AppList';
import Window from '../../components/Window';
import { useRouter } from 'next/router';
import styled from 'styled-components';


const StyledP = styled.p`
  font-size: 1.5rem;
  text-align: center;
  margin-top: 2rem;
  `


export default function SubscribedAppsPage() {
    const {push} = useRouter();

    const buttons =[
      {
        name:'Add new app',
        icon:'/type.png',
        onClick(){
          push('/add/form')
        }
      },
      {
        name:'Check your emails',
        icon:'/scan1.png',
        onClick(){
          push('/add/email')
        }
      }
    ]

    const { data, isLoading } = useSWR('/api/subscribed-apps');

    const apps = data?.apps
    
    if(isLoading){
      <Window>
        <StyledP>Loading...</StyledP>
      </Window>
    }

    if(!isLoading){      
      return (
        <Window 
         areButtons={true}
         isMirrored={false} 
         buttons={buttons}
         name='Subscribed Apps'
         linkBack='/start'
        >
          {apps.length > 0 ? 
            (<AppList apps={apps}/>):
            (<StyledP>You have no subscribed apps yet.</StyledP>)
          }
        </Window>
      );
    }

}