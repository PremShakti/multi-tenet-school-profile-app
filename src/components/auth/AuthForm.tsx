"use client";
import React, { useEffect } from "react";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  useLoginMutation,
  useLogoutMutation,
  useSignupMutation,
  useUserDataQuery,
} from "@/store/api/auth";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { isChecked } from "@/store/fetures/buttons/providerButton";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export function AuthForm() {
  const { data, isLoading, refetch, isSuccess } = useUserDataQuery();
  const [open, setOpen] = useState<boolean>(false);
  const [registerForm, setRegisterForm] = useState<boolean>(false);
  const [roll, setRoll] = useState<string>("");
  const [userData, setUserData] = useState<any>(null);
  const router = useRouter();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [logout] = useLogoutMutation();

  const isCheckedValue = useSelector(
    (state: RootState) => state.cart.isChecked
  );
  const dispatch = useDispatch();
  useEffect(() => {
    setOpen(isCheckedValue);
  }, [isCheckedValue]);

  useEffect(() => {
    dispatch(isChecked(open));
  }, [open]);

  const handleLogout = async () => {
    const res = await logout().unwrap();
console.log("logout res", res);
    if (res.success) {
      toast.success(res.message);
      refetch();
      router.push("/");
    }
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log("user data", data);
  if (isSuccess) {
    return (
      <div>
        {" "}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className=" bg-transparent border-0  ">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className=" hidden md:block">{data?.user?.name}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem onClick={handleLogout}>
              Log out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={'/admin'}>Admin</Link> 
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        {/* <DialogTrigger asChild>
          <Button
            variant="outline"
            className="text-black"
            onClick={() => {
              setRegisterForm(false);
              setRoll("hr");
            }}
          >
            Login HR
          </Button>
        </DialogTrigger> */}
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="py-2 px-6 rounded-full text-sm transition text-black"
            onClick={() => {
              setRegisterForm(false);
              setRoll("user");
            }}
          >
            Login
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]  ">
          <DialogHeader>
            <DialogTitle>{registerForm ? "Register" : "Login"}</DialogTitle>
            <DialogDescription>
              {registerForm
                ? "  Create an account and start your journey with us."
                : "Log in to access your account."}
            </DialogDescription>
          </DialogHeader>
          <ProfileForm
            registerForm={registerForm}
            setRegisterForm={setRegisterForm}
            roll={roll}
            refetch={refetch}
            setOpen={setOpen}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      {/* <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="text-black text-xs px-1.5 py-0"
          onClick={() => {
            setRegisterForm(false);
            setRoll("hr");
          }}
        >
          Login HR
        </Button>
      </DrawerTrigger> */}
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="  py-2 px-6 rounded-full text-sm transition text-black"
          onClick={() => {
            setRegisterForm(false);
            setRoll("user");
          }}
        >
          Login
        </Button>
      </DrawerTrigger>
      <DrawerContent className=" ">
        <DrawerHeader className="text-left">
          <DrawerTitle className=" ">
            {registerForm ? "Register" : "Login"}
          </DrawerTitle>
          <DrawerDescription>
            {" "}
            {registerForm
              ? "  Create an account and start your journey with us."
              : "Log in to access your account."}
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm
          className="px-4 "
          registerForm={registerForm}
          setRegisterForm={setRegisterForm}
          roll={roll}
          refetch={refetch}
          setOpen={setOpen}
        />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button
              variant="outline"
              className=""
              onClick={() => setRegisterForm(false)}
            >
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

interface ProfileFormProps {
  className?: string;
  registerForm: boolean;
  setRegisterForm: (value: boolean) => void;
  roll: string;
  refetch: () => void;
  setOpen?: (value: boolean) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  className,
  registerForm,
  setRegisterForm,
  roll,
  refetch,
  setOpen,
}) => {
  const router = useRouter();
  const form = useForm<{
    name?: string;
    email: string;
    password: string;
    confirmPassword?: string;
  }>({
    resolver: zodResolver(registerForm ? registerSchema : loginSchema),
    defaultValues: registerForm
      ? { name: "", email: "", password: "", confirmPassword: "" }
      : { email: "", password: "" },
  });

  const [signUp, { isLoading, isSuccess }] = useSignupMutation();
  const [login] = useLoginMutation();

  const onSubmit = async (data: any) => {
    if (registerForm) {
      const { confirmPassword, ...rest } = data;
      const restData = { ...rest, role: roll };
      console.log(restData);
      const res = await signUp(restData).unwrap();

      if (res.success) {
        toast.success(res.message);
        form.reset();
        setOpen && setOpen(false);
      } else {
        toast.error(res.message);
      }
    } else {
      const withRollData = { ...data, role: roll };
      const res = await login(withRollData).unwrap();
      if (res.success) {
        toast.success(res.message);
        form.reset();

        refetch();
        if (roll === "hr") {
          router.push("/recruiter");
        }
        setOpen && setOpen(false);
      } else {
        toast.error(res.message);
      }
    }
  };
  return (
    <div className="w-full mx-auto px-4 ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          {registerForm && (
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <Label>Name</Label>
                  <FormControl>
                    <Input {...field} placeholder="Enter your name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <Label>Email</Label>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="Enter your email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <Label>Password</Label>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="Enter your password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {registerForm && (
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <Label>Confirm Password</Label>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Confirm your password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <Button type="submit">{registerForm ? "Register" : "Login"}</Button>
        </form>
      </Form>
      {registerForm ? (
        <Button
          variant="link"
          className="mt-2"
          onClick={() => setRegisterForm(false)}
        >
          Already have an account? Login
        </Button>
      ) : (
        <Button
          variant="link"
          className="mt-2"
          onClick={() => setRegisterForm(true)}
        >
          "Don't have an account? Register
        </Button>
      )}
    </div>
  );
};
