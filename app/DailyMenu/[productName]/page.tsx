"use client"

import { Tart, tartList } from '../data/DailyMenu'
import { useState } from 'react';
import { useSearchParams } from 'next/navigation'
import { HomeIcon, EnvelopeOpenIcon } from "@radix-ui/react-icons"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { AspectRatio } from "@radix-ui/react-aspect-ratio"
import Image from "next/image"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { zhTW } from "date-fns/locale"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

export default function OrderDate({ params }: { params: { productName: string } }) {
  const boxes = Array.from({ length: 100 }, (_, index) => index + 1);
  const [date, setDate] = useState<Date | undefined>();
  const searchParams = useSearchParams();
  const product: Tart = searchParams.get('product') ?
    tartList.filter((item) => item.id === String(searchParams.get('product')))[0]:
    tartList[0];

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
                <BreadcrumbLink href="/DailyMenu">Daily Menu</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{(product.name)}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>


        <div className='flex flex-col items-center justify-center gap-3'>{/* 最大圈的Container */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-screen overflow-hidden px-4">
              <Carousel
                plugins={[
                  Autoplay({
                    delay: 3000,
                  }),
                ]}>
                <CarouselContent>
                  <CarouselItem>
                    <AspectRatio ratio={1 / 1} className="z-0">
                      <Image
                        src="/frontpage.jpg"
                        className="rounded-md"
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                        alt="image"
                      />
                    </AspectRatio></CarouselItem>
                  <CarouselItem>
                    <AspectRatio ratio={1 / 1} className="z-0">
                      <Image
                        src="/logo.jpg"
                        className="rounded-md"
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                        alt="image"
                      />
                    </AspectRatio></CarouselItem>
                  <CarouselItem>...</CarouselItem>
                </CarouselContent>
                {/* <CarouselPrevious />
              <CarouselNext /> */}
              </Carousel>
            </div>
            <h1 className="pt-6 pb-2">{(product.name)}</h1>
          </div>

          {/* 數量＆日期挑選 */}
          <div className="flex flex-row items-center justify-center gap-3">
            <Select>
              <SelectTrigger className="w-[6em]">
                <SelectValue placeholder="數量" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} 個
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "ustify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP", { locale: zhTW }) : <span>選擇取貨日期</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* 加入購物車按鈕 */}
          <div className='w-full px-4'>
            <Button className='w-full'>
              <EnvelopeOpenIcon className="mr-2 h-4 w-4" /> 加入購物車
            </Button>
          </div>

          <Separator className='m-2' />

          {/* 商品介紹 */}
          <h1>{(product.name)}口味的商品介紹</h1>

        </div>{/* 最大圈的Container */}
      </div>{/* 手機頁面 */}

      {/* 電腦頁面 */}
      <div className="hidden md:block">
      </div>
    </>
  )
}