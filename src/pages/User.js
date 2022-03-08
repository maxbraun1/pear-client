import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "../components/layout/navBar";
import MainContent from "../components/layout/main-content";
import PageContainer from "../components/layout/page-container";
import UserProfile from "../components/profile/userProfile";
import PublicProfile from "../components/profile/publicProfile";

function User() {
    const [userID, setUserID] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        if(searchParams.get("id") !== null && searchParams.get("id").length > 0){
            setUserID(searchParams.get("id"));
        }
    }, [searchParams]);

    return (
        <div>
            <NavBar />
            <PageContainer>
                <MainContent>
                    { userID !== null ? <PublicProfile userID={userID}/> : null }
                </MainContent>
            </PageContainer>
        </div>
  );
}

export default User;