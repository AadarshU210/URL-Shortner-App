import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { useState } from "react"
import { useNavigate } from "react-router-dom"


const LandingPage = () => {

    const [longURL, setLongURL] = useState();
    const navigate = useNavigate()

    const handleShorten = (e) => {
        e.preventDefault()
        if(longURL)navigate(`/auth?createNew=${longURL}`)
    }
    return (
        <div className="flex flex-col items-center">
            <h2 className="my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-white text-center font-extrabold">
                Ready to shorten your first link?
            </h2>
            <form onSubmit={handleShorten} className="sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-2">
                <Input type="url" placeholder="Enter your long URL" value={longURL} onChange={(e) => setLongURL(e.target.value)} className="h-full flex-1 py-4 px-4" />
                <Button className="h-full" type="submit" variant="destructive" >Shorten!</Button>
            </form>
            <img src="/ziplink_banner.svg" alt="banner" className="w-full my-11 md:px-11" />
            <Accordion type="multiple" collapsible className="w-full md:px-11">
                <AccordionItem value="item-1">
                    <AccordionTrigger>How does the ZipLink URL shortener works?</AccordionTrigger>
                    <AccordionContent>
                        When you enter a long URL, our system generates a shorted version
                        of that URL. This shortened URL redirects to the original long URL
                        when accessed.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Can I customize the short URL?</AccordionTrigger>
                    <AccordionContent>
                        Yes, we offer the option to create a custom alias instead of a random string.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>Will the original link owner know I'm using their URL?</AccordionTrigger>
                    <AccordionContent>
                        No. We do not notify original site owners when someone shortens or clicks their URL through our service.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default LandingPage