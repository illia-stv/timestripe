import React from 'react';
import styled from 'styled-components';

const SidebarStyled = styled.div`
  width: 300px;
  height: 100vh;
  background: #fafafa;
  box-shadow: 0px 0px 13px -1px rgba(66, 68, 90, 1);
  position: absolute;
  z-index: 10;
`;

const Sidebar = () => {
  return (
    <SidebarStyled>
      <h1> $ </h1>
    </SidebarStyled>
  );
};

export default Sidebar;
