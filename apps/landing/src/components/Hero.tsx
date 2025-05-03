import WaitlistForm from "./WaitlistForm";

export default function Hero() {
    return (
        <section className="max-w-3xl mx-auto text-center space-y-6 mb-20">
            <h1 className="text-4xl sm:text-5xl font-bold">
                Collaborate on music like it’s a group chat.
            </h1>
            <p className="text-lg text-gray-300 max-w-xl mx-auto">
                Cadence helps indie artists share ideas, send files, and finish tracks — together.
            </p>
            <WaitlistForm />
        </section>
    )
}