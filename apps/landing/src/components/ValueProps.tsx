import { FileAudio, ListChecks, MessagesSquare } from "lucide-react"

export default function ValueProps() {
    return (
        <section className="max-w-4xl mx-auto grid gap-12 sm:grid-cols-3 text-center mb-20">
            <div className="flex flex-col items-center justify-center">
                <FileAudio className="size-16 mb-[20px]"/>
                <h2 className="text-xl font-semibold mb-2">Share files instantly</h2>
                <p className="text-gray-400">Upload stems, samples, or full mixes in seconds.</p>
            </div>
            <div className="flex flex-col items-center justify-center">
                <ListChecks className="size-16 mb-[20px]"/>
                <h2 className="text-xl font-semibold mb-2">Track credits</h2>
                <p className="text-gray-400">See who did what on each track and give proper credit.</p>
            </div>
            <div className="flex flex-col items-center justify-center">
                <MessagesSquare className="size-16 mb-[20px]"/>
                <h2 className="text-xl font-semibold mb-2">Collaborate freely</h2>
                <p className="text-gray-400">Comment on each other&apos;s ideas and keep the project moving.</p>
            </div>
        </section>
    )
}