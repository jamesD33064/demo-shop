"use client";

import { Order, OrderProduct, Tart, tartList } from "../data/DailyMenu";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { HomeIcon, EnvelopeOpenIcon } from "@radix-ui/react-icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { zhTW } from "date-fns/locale";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import useLocalStorage from "@/CustomHook/localstorage";

export default function OrderDate({
  params,
}: {
  params: { productName: string };
}) {
  const { toast } = useToast()
  // 取得商品
  const searchParams = useSearchParams();
  const productId = searchParams.get("product");
  const product: Tart = productId
    ? tartList.filter((item) => item.id === String(productId))[0]
    : tartList[0];

  // 日期選擇器
  const [date, setDate] = useState<Date | undefined>();
  // 數量選擇器
  const [selectedValue, setSelectedValue] = useState<Number>(0);
  function handleSelectChange(e: Number) {
    setSelectedValue(e);
  }

  // localstorage中的訂單
  const [orders, setOrders] = useLocalStorage("order", "");

  // 按下加入購物車按鈕會觸發的事件
  async function addP2Order() {
    // TODO 加上驗證
    if (selectedValue == 0 || date == undefined){
      toast({
        variant: "destructive",
        title: "要選擇數量跟日期！"
      })

      return;
    } 

    // 取得選擇的日期的面交單
    const dateOrder = orders
      ? orders.filter(
        (item: Order) =>
          item.date === (date ? format(date, "yyyy-MM-dd") : "")
      )
      : [];

    // 如果已經有選擇的日期的面交單
    if (dateOrder.length > 0) {
      const updatedOrders = orders.map((order: Order) => {
        if (order.date === (date ? format(date, "yyyy-MM-dd") : "")) {
          // 檢查是否已經有存在一樣的產品
          const existingProductIndex = order.order.findIndex((product) => product.id === productId);
          if (existingProductIndex !== -1) {
            // 如果已存在選擇的產品就將數量上去
            return {
              ...order,
              order: order.order.map((product) => {
                if (product.id === productId) {
                  return {
                    ...product,
                    count: Number(product.count) + Number(selectedValue),
                  };
                }
                return product;
              }),
            };
          } else {
            // 如果選擇的產品不在就加入陌生產品
            return {
              ...order,
              order: [
                ...order.order,
                { id: productId, count: Number(selectedValue) },
              ],
            };
          }
        }
        return order;
      });
      setOrders(updatedOrders);
    } else {
      // 如果選擇的日期的面交單還沒被建立
      setOrders([
        ...orders,
        {
          date: date ? format(date, "yyyy-MM-dd") : "",
          order: [{ id: productId, count: Number(selectedValue) }],
        },
      ]);
    }

    toast({
      title: "加入購物車成功！",
      description: product.name,
      action: <ToastAction altText="Try again">取消加入</ToastAction>,
    })

    return;
  }

  // 加入購物車

  return (
    <>
      {/* 手機頁面 */}
      <div className="md:hidden">
        <div className="w-screen">
          <Breadcrumb className="m-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">
                  <HomeIcon />
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/DailyMenu">Daily Menu</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{product.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="flex flex-col items-center justify-center gap-3">
          {/* 最大圈的Container */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-screen overflow-hidden px-4">
              <Carousel
                plugins={[
                  Autoplay({
                    delay: 3000,
                  }),
                ]}
              >
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
                    </AspectRatio>
                  </CarouselItem>
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
                    </AspectRatio>
                  </CarouselItem>
                  <CarouselItem>...</CarouselItem>
                </CarouselContent>
                {/* <CarouselPrevious />
              <CarouselNext /> */}
              </Carousel>
            </div>
            <h1 className="pt-6 pb-2">{product.name}</h1>
          </div>

          {/* 數量＆日期挑選 */}
          <div className="flex flex-row items-center justify-center gap-3">
            <Select onValueChange={(e) => handleSelectChange(Number(e))}>
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
                  {date ? (
                    format(date, "PPP", { locale: zhTW })
                  ) : (
                    <span>選擇取貨日期</span>
                  )}
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
          <div className="w-full px-4">
            <Button className="w-full" onClick={addP2Order}>
              <EnvelopeOpenIcon className="mr-2 h-4 w-4" /> 加入購物車
            </Button>
          </div>

          <Separator className="m-2" />

          {/* 商品介紹 */}
          <h1>{product.name}口味的商品介紹</h1>
        </div>
        {/* 最大圈的Container */}
      </div>
      {/* 手機頁面 */}

      {/* 電腦頁面 */}
      <div className="hidden md:block"></div>
    </>
  );
}
