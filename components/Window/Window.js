import styled from 'styled-components'

const ExplorerContainer = styled.div`
    border: 2px solid #7f9db9;
    width: 80%;
    height: 80%;
    margin: 5% auto;
    background-color: #fff;
`;

const TitleBar = styled.div`
    height: 30px;
    background: #0a246a; 
    background: -webkit-linear-gradient(to right, #a0c1ff, #0a246a); 
    background: linear-gradient(to right, #a0c1ff, #0a246a);
    color: #fff;
    padding: 5px;
    display: flex;
    justify-content: space-between;
`;

const Buttons = styled.div`
  display: flex;
  gap: 5px;
  justify-content: flex-end;
`;

const Button = styled.div`
  width: 16px;
  height: 16px;
  border: 1px solid #fff;
  background-color: #c3c3c3;
`;

const FilePaneContainer = styled.div`
    display: flex;
    height: 90%;
`;

const FilePane = styled.div`
    flex: 1;
    border: 1px solid #000;
    padding: 10px;
    box-sizing: border-box;
    overflow: auto;
`;

const StatusBar = styled.div`
    height: 20px;
    background-color: #c3c3c3;
    border-top: 1px solid #000;
    padding: 5px;
`;

const Window = () => (
    <ExplorerContainer>
        <TitleBar>
            <div>My Computer</div>
            <Buttons>
                <Button />  {/* Minimize Button */}
                <Button />  {/* Maximize Button */}
                <Button />  {/* Close Button */}
            </Buttons>
        </TitleBar>
        <FilePaneContainer>
            <FilePane>
                {/* Directory list */}
                <h3>Directories</h3>
                {/* Directory items will go here */}
            </FilePane>
            <FilePane>
                {/* File list */}
                <h3>Files</h3>
                {/* File items will go here */}
            </FilePane>
        </FilePaneContainer>
        <StatusBar>
            {/* Status Bar Info */}
        </StatusBar>
    </ExplorerContainer>
)

export default Window
