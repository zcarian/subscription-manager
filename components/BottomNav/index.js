import * as React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const Navbar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 3vh;
  background: linear-gradient(to bottom, #5499f5 0%, #0078D7 15%, #0078D7 100%);
  color: white;
  /* padding: 0 15px; */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  z-index: 2000;
`;

const StartButton = styled.button`
  background: linear-gradient(to bottom, #248421 0%, #279a25 100%);
  border: none;
  color: white;
  height: 100%;
  padding: 5px 20px 5px 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  /* margin: 4px 2px; */
  cursor: pointer;
  border-top-right-radius: 7px;
  border-bottom-right-radius: 7px;
  /* border-radius: 3px; */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  box-shadow: inset -2px -2px 6px rgba(0, 0, 0, 0.5);
`;

export default function LabelBottomNavigation() {
  const { push } = useRouter();

  return (
    <Navbar>
      <StartButton onClick={()=>{push('/start')}}>Start</StartButton>
    </Navbar>
  );
}