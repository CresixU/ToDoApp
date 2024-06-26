import { Link } from "react-router-dom"
import "../css/ToDoList.css"
const WelcomePageView = () => {
	return (
		<div>
            <div>
                <h1>ToDo Application</h1>
                <h3>Witaj na stronie naszej aplikacji do zarządzania zadaniami! Zaprojektowana z myślą o wydajności, nasza aplikacja pozwala na łatwe dodawanie, organizowanie i śledzenie zadań. Dzięki wykorzystaniu nowoczesnej technologii React, oferujemy szybkie, intuicyjne i responsywne środowisko, które dopasowuje się do Twoich indywidualnych potrzeb. Niezależnie od tego, czy jesteś studentem, profesjonalistą, czy po prostu szukasz sposobu na zorganizowanie swojego dnia, nasza aplikacja jest dla Ciebie idealnym narzędziem. Zacznij korzystać już dziś i zobacz, jak łatwo możesz zapanować nad swoimi zadaniami!</h3>
                <h4>Aplikacja zaprojektowana przez Krystiana Wawrucha, Jakuba Walaska, Bartka Tomaszewskiego, Wojciecha Kuskę</h4>
            </div>
            <div className="d-flex mt-5">
                <Link className={`button center`} to={`todo-list`}>Przejdź do ToDo</Link>
            </div>
            
		</div>
	)
}

export default WelcomePageView
