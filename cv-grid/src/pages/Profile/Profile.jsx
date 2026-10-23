import { useCallback, useEffect, useState } from "react";
import { getCurrentUser } from "../../services/authService";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Profile.css";

function Profile() {
    const [user, setUser] = useState(null);

    const loadUser = useCallback(async () => {
        try {
            const data = await getCurrentUser();
            setUser(data);
        } catch {
            // Keep the profile page available if the user details cannot load.
        }
    }, []);

    useEffect(() => {
        // This starts an async API request; state updates happen after the request resolves.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadUser();
    }, [loadUser]);

    return (
        <div className="dashboard">

        <Sidebar />

        <main className="dashboard-content">

            <div className="profile-header">
            <h1>My Profile</h1>
            <p>Manage your account information.</p>
            </div>

            <div className="profile-card">

            <div className="profile-avatar">
                {user?.username?.charAt(0).toUpperCase()}
            </div>

            <div className="profile-info">

                <div className="profile-item">
                <span>Username</span>
                <h3>{user?.username}</h3>
                </div>

                <div className="profile-item">
                <span>Email</span>
                <h3>{user?.email || "Not Added"}</h3>
                </div>

                <div className="profile-item">
                <span>First Name</span>
                <h3>{user?.first_name || "-"}</h3>
                </div>

                <div className="profile-item">
                <span>Last Name</span>
                <h3>{user?.last_name || "-"}</h3>
                </div>

            </div>

            </div>

        </main>

        </div>
    );
}

export default Profile;
