import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ColumnChart from '../ColumnChart'
import DonutChart from '../DonutChart'

export default function LabTabs({data}) {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1', paddingTop:'2vh' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="All apps" value="1" />
            <Tab label="Average monthly spending" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1"><ColumnChart data={data}/></TabPanel>
        <TabPanel value="2"><DonutChart data={data}/></TabPanel>
      </TabContext>
    </Box>
  );
}