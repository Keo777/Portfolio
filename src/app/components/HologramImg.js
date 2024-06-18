import Image from "next/image"

const const scale1 = {100 * 0.}

export default function Home() {

    return (
        <>
        <Image alt="avatarimg" ref={avatar} id="avatar" src={'/images/keoniis-59.webp'} height={1473} width={1400} className='translate-x-[60%] opacity-0 w-[clamp(30rem,48vw,47rem)] absolute bottom-[0%] 2xl:bottom-[0%] top-0 right-0 xl:right-[-40%] 2xl:right-[-30%]  left-[0] m-auto z-[4]' />
        </>
    )

}