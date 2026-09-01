import { useNavigate } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.css';

function ErrorPage()
{
    const navigate = useNavigate();


    const handleNavigate = () =>
    {
        navigate("/");
    };

    return (
        <div>
            <h1>Error Page ...!</h1>
            <button className="btn btn-primary" onClick={handleNavigate}>GO HOME</button>
      </div>
  );
}

export default ErrorPage;