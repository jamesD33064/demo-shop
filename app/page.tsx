"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [isVisible, setIsVisible] = useState(Array.from({ length: 3 }, () => false));

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;

      const elementPositions = Array.from({ length: 3 }, (_, index) => {
        const element = document.getElementById(`box-${index + 1}`);
        if (element) {
          return element.offsetTop;
        }
        return 0;
      });

      const newVisibility = elementPositions.map((position) => scrollPosition > position);

      setIsVisible(newVisibility);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className="min-h-screen flex z-0 items-center justify-center">
        <Image
          src={`/frontpage.jpg`}
          alt=""
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </div>
      <div className="w-full flex flex-col align-middle justify-center gap-8 py-16">
        {Array.from({ length: 3 }, (_, index) => (
          <div
            key={index + 1}
            id={`box-${index + 1}`}
            className={`transition-transform duration-1000 transform ${isVisible[index] ? 'translate-x-0' : 'translate-x-full'}`}
          >
            <Link href="/DailyMenu">
              <Card>
                <CardHeader>
                  <CardTitle>Daily Menu</CardTitle>
                  <CardDescription>每天可預定的口味不一樣喔！</CardDescription>
                </CardHeader>
                <CardContent></CardContent>
                <CardFooter>
                  <Button variant="outline">去看看！</Button>
                </CardFooter>
              </Card>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}