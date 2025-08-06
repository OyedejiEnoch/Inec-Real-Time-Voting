"use client"
import Image from "next/image";
import inecLogo from "@/assets/og-logo.jpg"
import inecLogo1 from "@/assets/inecLogo1.jpg"
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { useRef } from "react";

export default function AuthLayout({children}:Readonly<{children: React.ReactNode}>){

    const plugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

    return(
        <div className="w-full h-auto bg-white md:p-2">
            <div className="w-full h-full flex flex-col md:flex-row items-center justify-center gap-10 md:gap-4 p-4">
                <div className="w-full md:w-1/2 h-full flex items-center justify-center ">
                    <Carousel
                        plugins={[plugin.current]}
                        className="w-full max-w-xs"
                        onMouseEnter={plugin.current.stop}
                        onMouseLeave={plugin.current.reset}
                        >
                        <CarouselContent>

                            <CarouselItem>
                            <Image src={inecLogo} alt="" className="object-cover w-[450px]" />
                            </CarouselItem>

                            <CarouselItem>
                            <Image src={inecLogo1} alt="" className="object-cover w-[450px]" />
                            </CarouselItem>
                        </CarouselContent>
                    </Carousel>
                </div>

                <div className=" w-full md:w-1/2 h-full flex items-center justify-center">
                    {children}
                </div>
            </div>
        </div>
    )
}