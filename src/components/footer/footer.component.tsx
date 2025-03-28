import './footer.style.css'

export const FooterComponent = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content">
            <p>© 2025 Sermaluc. Todos los derechos reservados.</p>
                <div className="footer-links">
                    <a href="/privacy-policy">Politicas de Privacidad</a>
                    <a href="/terms-of-service">Terminos de Servicio</a>
                </div>
            </div>
        </footer>
    )
}