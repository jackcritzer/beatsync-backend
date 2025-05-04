import WaitlistForm from "./WaitlistForm";

export default function Hero() {
    return (
        <div className="flex flex-col flex-nowrap items-center justify-center content-center max-w-3xl mx-auto text-center mb-20 mt-4">
            <h1 className="text-4xl sm:text-5xl font-bold ">
                Collaborate on music like it’s a group chat.
            </h1>
            <p className="text-lg text-gray-300 max-w-xl mx-auto mt-8 mb-6">
                Cadence helps indie artists share ideas, send files, and finish tracks — together.
            </p>
            <WaitlistForm />
        </div>
    )
}