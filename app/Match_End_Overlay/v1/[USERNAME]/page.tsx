import {Stats} from "@/app/Match_End_Overlay/v1/[USERNAME]/Stats";


interface Props {
    params: Promise<{ USERNAME: string}>
}

const Overlay = async ({params}: Props) => {
    const {USERNAME} = await params;
    return (
        <Stats name={USERNAME}/>
    )
}

export default Overlay;
