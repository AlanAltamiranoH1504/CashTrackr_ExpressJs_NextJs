import ProfileTabs from "../../components/perfil/ProfileTabs";

export default async function ProfileLayout({children,}: Readonly<{children: React.ReactNode;}>) {
    return (
        <>
            <ProfileTabs />
            {children}
        </>
    );
}