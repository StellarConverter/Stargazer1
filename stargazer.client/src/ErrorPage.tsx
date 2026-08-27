import { useNavigate } from "react-router-dom";

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
            <button onClick={handleNavigate}>GO HOME</button>
      </div>
  );
}

export default ErrorPage;