"use client";
import InputEx from "@/components/input";
import Image from "next/image";
import { useState } from "react";
import { GrRadial, GrRadialSelected } from "react-icons/gr";
import { FaRegCheckCircle } from "react-icons/fa";

import { set, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";

enum QueryType {
  General = "General",
  Support = "Support",
  Empty = "",
}
const formSchema = z.object({
  firstName: z.string().min(1, { message: "This field is required" }),
  lastName: z.string().min(1, { message: "This field is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  queryType: z.enum([QueryType.General, QueryType.Support], {
    message: "Please select a query type",
  }),
  message: z.string().min(1, { message: "This field is required" }),
  consent: z.boolean().refine((value) => value === true, {
    message: "To submit this form, please consent to being contacted",
  }),
});

export default function Home() {
  const [queryType, setQueryType] = useState<QueryType>(QueryType.Empty);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
      consent: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: (
        <div className="flex flex-row  items-center ">
          <FaRegCheckCircle className="text-white" />
          <span className="ml-2 text-white">Message Sent!</span>
        </div>
      ),
      description: (
        <div className="text-white text-xs">
          Thanks for completing the form. We&apos;ll be in touch soon!
        </div>
      ),
      //Delete the toast after 5 seconds
      duration: 5000,
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-background-prim h-screen w-screen"
      >
        <div className=" h-full w-full flex lg:flex-row flex-col justify-center items-center">
          <div className="bg-white gap-y-4 p-8 lg:p-10 flex flex-col rounded-2xl w-5/12">
            <div className="text-2xl font-semibold">Contact Us</div>
            <div className="flex flex-col lg:flex-row gap-y-3 lg:gap-x-3 justify-between">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className=" w-full max-w-sm items-center ">
                    <FormLabel
                      className="text-xs font-semibold text-texts-color  "
                      htmlFor="firstName"
                    >
                      First Name <span className="text-button-prim">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className=""
                        type="text"
                        id="firstName"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs mt-0" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="w-full max-w-sm items-center gap-1.5">
                    <FormLabel
                      className="text-xs font-semibold text-texts-color "
                      htmlFor="lastName"
                    >
                      LastName <span className="text-button-prim">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input type="text" id="lastName" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs mt-0" />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex  flex-col w-full">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full   ">
                    <FormLabel
                      className="text-xs font-semibold text-texts-color "
                      htmlFor="email"
                    >
                      Email Address <span className="text-button-prim">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        className="flex w-full flex-col"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs mt-0" />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex  flex-col w-full">
              <FormField
                control={form.control}
                name="queryType"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full">
                    <FormLabel
                      className="text-xs font-semibold text-texts-color "
                      htmlFor="queryType"
                    >
                      Query Type <span className="text-button-prim">*</span>
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        defaultValue={QueryType.Empty}
                        onValueChange={field.onChange}
                      >
                        <div className=" flex flex-col gap-y-3 lg:flex-row lg:gap-x-3 justify-between  cursor-pointer">
                          <div
                            className={`
                            flex items-center space-x-2 
                            p-2  w-full text-sm
                           bg-opacity-10 border-1 border-texts-color2  h-10  rounded-lg
                            ${
                              field.value === QueryType.General
                                ? "bg-button-prim border-18 border-button-prim"
                                : ""
                            }
                            `}
                          >
                            <RadioGroupItem
                              value={QueryType.General}
                              id="op1"
                              className={`
                              col font-normal
                             
                              `}
                            />
                            <Label
                              className="font-normal text-texts-color"
                              htmlFor="op1"
                            >
                              General Query
                            </Label>
                          </div>
                          <div
                            className={`
                            flex items-center space-x-2 
                            p-2  w-full text-sm
                           bg-opacity-10 border-1 border-texts-color2  h-10  rounded-lg
                            ${
                              field.value === QueryType.Support
                                ? "bg-button-prim  border-button-prim border-18"
                                : ""
                            }
                            `}
                          >
                            <RadioGroupItem
                              value={QueryType.Support}
                              id="op2"
                            />
                            <Label
                              className="font-normal text-texts-color"
                              htmlFor="op2"
                            >
                              Support Request
                            </Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage className="text-xs mt-0" />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold text-texts-color">
                    Message <span className="text-button-prim">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="resize-none outline-none border-texts-color2 border-1 focus:border-button-prim focus:border-18 "
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="flex text-xs justify-start " />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="consent"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start  rounded-md py-1  lg:py-3">
                  <FormControl>
                    <div className=" flex flex-row gap-x-4 items-center">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="rounded-none "
                      />
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70   text-texts-color"
                      >
                        I consent to being contacted by the team{" "}
                        <span className="text-button-prim">*</span>
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage className="flex text-xs justify-start " />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="bg-button-prim py-2 text-white rounded-lg hover:bg-green-800 "
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
