import { FooterComponent } from "../components/footer/footer.component";
import { NavbarComponent } from "../components/navbar/navbar.component";
import { LayoutProps } from "../interfaces/props.interface";



export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <NavbarComponent />
            <main>
                {children}
            </main>
            <FooterComponent />
        </div>
    ); 
};
