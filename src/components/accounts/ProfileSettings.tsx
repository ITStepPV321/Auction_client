import { useNavigate } from "react-router-dom";
import { AuthService } from "../../services/auth.service";
import { removeToken } from "../../helpers/localStorage.helper";

export default function ProfileSettings() {
    const navigate = useNavigate();

    const onChangeUsername = () => {
        navigate("/change-username");
    };

    const onChangeEmail = () => {
        navigate("/change-email");
    };

    const onChangePassword = () => {
        navigate("/change-password");
    };

    const onDelete = () => {
        AuthService.delete();
        removeToken();

        navigate("/login");
    };

    return (
        <>
            <div className="danger-zone">
                <h3>Danger Zone:</h3>
                <div>
                    <h4>Change Username</h4>
                    <button onClick={onChangeUsername}>Change</button>
                </div>
                <div>
                    <h4>Change Email</h4>
                    <button onClick={onChangeEmail}>Change</button>
                </div>
                <div>
                    <h4>Change Password</h4>
                    <button onClick={onChangePassword}>Change</button>
                </div>
                <div>
                    <h4>Delete Profile</h4>
                    <button onClick={onDelete}>Delete</button>
                </div>
            </div>
        </>
    );
}
