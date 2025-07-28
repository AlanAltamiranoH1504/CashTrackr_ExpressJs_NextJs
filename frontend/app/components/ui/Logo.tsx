import Image from "next/image";
const Logo = () => {
    return (
        <>
            <Image src="/logo.svg" alt="Logo CashTrackr" width={700} height={100} priority={true} />
        </>
    );
}
export default Logo;