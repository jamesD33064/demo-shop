"use client"
import Image from "next/image"
import { useEffect, useState } from 'react';
import { PlusCircledIcon, HomeIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { AlbumArtwork } from "./components/album-artwork"
import { Menu } from "./components/menu"
import { PodcastEmptyPlaceholder } from "./components/podcast-empty-placeholder"
import { Sidebar } from "./components/sidebar"
import { listenNowAlbums, madeForYouAlbums } from "./data/albums"
import { playlists } from "./data/playlists"
import { dailyMenu, tartList } from "./data/DailyMenu"
import Link from "next/link";
import { Badge } from "@/components/ui/badge"

export default function Home() {
  const boxes = Array.from({ length: 100 }, (_, index) => index + 1);
  const [isVisible, setIsVisible] = useState(Array.from({ length: tartList.length }, () => false));

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;

      const elementPositions = tartList.map((_, index) => {
        const element = document.getElementById(`tart-${index}`);
        if (element) {
          return element.offsetTop;
        }
        return 0;
      });

      const newVisibility = elementPositions.map((position) => scrollPosition > position);

      setIsVisible(newVisibility);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* 手機頁面 */}
      <div className="md:hidden">
        <div className="w-screen">
          <Breadcrumb className="m-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">
                  <HomeIcon /></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Daily Menu</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="w-screen overflow-hidden">
          <Carousel
            plugins={[
              Autoplay({
                delay: 3000,
              }),
            ]}>
            <CarouselContent>
              <CarouselItem>
                <AspectRatio ratio={16 / 9} className="z-0">
                  <Image
                    src="/frontpage.jpg"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    alt="image"
                  />
                </AspectRatio></CarouselItem>
              <CarouselItem>
                <AspectRatio ratio={16 / 9} className="z-0">
                  <Image
                    src="/logo.jpg"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    alt="image"
                  />
                </AspectRatio></CarouselItem>
            </CarouselContent>
          </Carousel>
        </div>

        <div className="w-full flex flex-col align-middle justify-center gap-10 py-10">
          <div className="w-full flex flex-col align-middle justify-center gap-4 px-10">
            {dailyMenu.map((item) => (
              <div
                key={item.date}
                className="w-full">
                <div className="flex flex-wrap gap-4">
                  <Badge variant="outline" className="text-sm">{item.date}</Badge>
                  {item.remark !== '' ?
                    <Badge variant="secondary" className="text-sm">{item.remark}</Badge> :
                    item.tartList.map((tart) => (
                      <Badge key={tart.id} variant="secondary" className="bg-orange-50 py-1 px-2 rounded-md font-normal text-sm">
                        <Link href={`/DailyMenu/` + tart.engName + '?product=' + tart.id}>
                          {tart.name}
                        </Link>
                      </Badge>
                    ))}
                </div>
                <Separator className="mt-4" />
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center align-middle justify-center gap-4">
            {tartList.map((tart, index) => (
              <Card
                key={tart.name}
                id={`tart-${index}`}
                className={`flex flex-col z-0 items-center align-middle justify-center transition-transform duration-500 transform ${isVisible[index] ? 'scale-100' : 'scale-0'}`}
              >
                <CardHeader className="flex flex-col items-center align-middle justify-center">
                  <CardTitle>{tart.name}</CardTitle>
                  <CardDescription>{}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Image
                    src={tart.cover}
                    alt="tart"
                    className="shadow-lg"
                    width={300}
                    height={24}
                    priority
                  />
                </CardContent>
                <CardFooter>
                  <Button variant="outline"><Link href={`/DailyMenu/` + tart.engName + '?product=' + tart.id}>前往訂購</Link></Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* 電腦頁面 */}
      <div className="hidden md:block">
        <Menu />
        <div className="border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              <Sidebar playlists={playlists} className="hidden lg:block" />
              <div className="col-span-3 lg:col-span-4 lg:border-l">
                <div className="h-full px-4 py-6 lg:px-8">
                  <Tabs defaultValue="music" className="h-full space-y-6">
                    <div className="space-between flex items-center">
                      <TabsList>
                        <TabsTrigger value="music" className="relative">
                          當季商品
                        </TabsTrigger>
                        <TabsTrigger value="podcasts">過季商品</TabsTrigger>
                        <TabsTrigger value="live" disabled>
                          過過過季商品
                        </TabsTrigger>
                      </TabsList>
                      <div className="ml-auto mr-4">
                        <Button>
                          <PlusCircledIcon className="mr-2 h-4 w-4" />
                          查看購物車
                        </Button>
                      </div>
                    </div>
                    <TabsContent
                      value="music"
                      className="border-none p-0 outline-none"
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight">
                            當季商品
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            現在四到六月會有什麼呢？
                          </p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <div className="relative">
                        <ScrollArea>
                          <div className="flex space-x-4 pb-4">
                            {listenNowAlbums.map((album) => (
                              <AlbumArtwork
                                key={album.name}
                                album={album}
                                className="w-[250px]"
                                aspectRatio="portrait"
                                width={250}
                                height={330}
                              />
                            ))}
                          </div>
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                      </div>
                      <div className="mt-6 space-y-1">
                        <h2 className="text-2xl font-semibold tracking-tight">
                          也可以看看這些！
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          這些也很好吃喔！
                        </p>
                      </div>
                      <Separator className="my-4" />
                      <div className="relative">
                        <ScrollArea>
                          <div className="flex space-x-4 pb-4">
                            {madeForYouAlbums.map((album) => (
                              <AlbumArtwork
                                key={album.name}
                                album={album}
                                className="w-[150px]"
                                aspectRatio="square"
                                width={150}
                                height={150}
                              />
                            ))}
                          </div>
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                      </div>
                    </TabsContent>
                    {/* ---------------- 過季商品 ---------------- */}
                    <TabsContent
                      value="podcasts"
                      className="h-full flex-col border-none p-0 data-[state=active]:flex"
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight">
                            過季商品
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            這裡有什麼過季商品呢？
                          </p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <PodcastEmptyPlaceholder />
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}