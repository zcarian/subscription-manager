import StartMenu from "../components/StartMenu";
import LoginButton from "../components/LoginButton";
import NavList from "../components/NavList/NavList";

export default function StartPage(){
    return(
        <StartMenu>
            <NavList/>
            <LoginButton/>
        </StartMenu>
    )
}