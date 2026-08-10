import { Loader2 } from "lucide-react";

export default function Loader() {
    return (
        <div className="h-[calc(50vh-10px)] flex items-center justify-center">
            <span className="animate-spin duration-300 ease-in-out">
                <Loader2 className="h-5 w-5" color="brown" />
            </span>
        </div>
    )
}
