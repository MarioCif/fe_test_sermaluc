import './App.css'
import { FooterComponent } from './components/footer/footer.component'
import { NavbarComponent } from './components/navbar/navbar.component'
import { TableDataComponent } from './components/table-data/table-data.component'

function App() {

  return (
    <>
      <NavbarComponent />
      <TableDataComponent />
      <FooterComponent />
    </>
  )
}

export default App
