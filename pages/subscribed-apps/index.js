import useSWR from 'swr';
import AppList from '../../components/AppList/AppList';
import Window from '../../components/Window/Window';

const apps1 = [
    {
      "name": "Fiszkoteka: fiszki język nauka",
      "icon": "https://is2-ssl.mzstatic.com/image/thumb/Purple116/v4/ad/15/4e/ad154e7b-91cf-0714-4cdd-92bc86624208/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg",
      "price": "19,99",
      "currency": "PLN",
      "startDate": "29 lis 2022",
      "startDate": "10 lis 2022",
      "startDate": "18 cze 2022",
      "startDate": "18 kwi 2022",
      "startDate": "11 kwi 2022",
      "endDate": "",
      "renewPeriod": "yearly",
      "category": "Education",
      "_id": {
        "$oid": "647744f0ea38453bb41d99b0"
      }
    },
    {
      "name": "Remote Mouse",
      "icon": "https://is3-ssl.mzstatic.com/image/thumb/Purple126/v4/5c/f7/66/5cf76668-0044-8e34-e14a-a18a39560e1b/AppIcon-1x_U007emarketing-0-10-0-sRGB-85-220.png/512x512bb.jpg",
      "price": "4,99",
      "currency": "PLN",
      "startDate": "27 lut 2022",
      "endDate": "",
      "renewPeriod": "monthly",
      "category": "Productivity",
      "_id": {
        "$oid": "647744f0ea38453bb41d99b1"
      }
    },
    {
      "name": "Peak - Brain Training",
      "icon": "https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/fb/23/d4/fb23d4c0-7359-b9c3-1c8e-0c93d2330b7b/AppIcon-1x_U007emarketing-0-10-0-85-220.png/512x512bb.jpg",
      "price": "164,99",
      "currency": "PLN",
      "startDate": "11 sty 2022",
      "endDate": "",
      "renewPeriod": "yearly",
      "category": "Education",
      "_id": {
        "$oid": "647744f0ea38453bb41d99b2"
      }
    },
    {
      "name": "AdBlock Pro for Safari",
      "icon": "https://is2-ssl.mzstatic.com/image/thumb/Purple116/v4/99/33/ab/9933abde-e210-22cd-91d9-f9b1228dad72/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-P3-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg",
      "price": "39,99",
      "currency": "PLN",
      "startDate": "15 gru 2021",
      "endDate": "",
      "renewPeriod": "yearly",
      "category": "Utilities",
      "_id": {
        "$oid": "647744f0ea38453bb41d99b3"
      }
    },
    {
      "name": "Netflix",
      "icon": "https://is3-ssl.mzstatic.com/image/thumb/Purple116/v4/b7/87/da/b787da3a-41f8-95eb-0055-f924da695654/AppIcon-0-0-1x_U007emarketing-0-0-0-10-0-0-0-85-220.png/512x512bb.jpg",
      "price": "40",
      "currency": "PLN",
      "startDate": "2023-01-01",
      "endDate": "",
      "renewPeriod": "monthly",
      "category": "Entertainment",
      "_id": {
        "$oid": "64774545ea38453bb41d99b8"
      }
    },
    {
      "name": "Disney+",
      "icon": "https://is3-ssl.mzstatic.com/image/thumb/Purple116/v4/50/48/9f/50489feb-a3bd-1776-0ca0-396ad9550bf3/AppIcon-0-1x_U007emarketing-0-7-0-0-85-220.png/512x512bb.jpg",
      "price": "29",
      "currency": "PLN",
      "startDate": "2023-02-05",
      "endDate": "",
      "renewPeriod": "monthly",
      "category": "Entertainment",
      "_id": {
        "$oid": "64774e2fa7af41d617683157"
      }
    }
  ]

export default function SubscribedAppsPage() {
    const { data, isLoading } = useSWR('/api/subscribed-apps');

    const apps = data?.apps

    if (isLoading) return <div>Loading...</div>;

    if (!data) return <div>Please log in.</div>;


    if(data.apps.length === 0) return <div>You have no subscribed apps.</div>
    
    return (
        <Window ClosePath='/'>
            <AppList apps={apps1}/>
        </Window>
    );
}