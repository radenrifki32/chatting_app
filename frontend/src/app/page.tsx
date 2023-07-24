"use client";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { BiLogoFacebook } from "react-icons/bi";
import { AiOutlineMail, AiFillLock } from "react-icons/ai";
import Image from "next/image";
import authSerive from "../service/Authservice";
import { LoginResponse, RegisterResponse } from "../types/ResponseType/Auth";
import { HttpStatusCode } from "axios";
import { useRouter } from "next/navigation";
import Logo from "../../public/54.jpg";
import { motion } from "framer-motion";
import * as z from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


export default function Home() {
  
  const schema = z.object({
    username: z
      .string()
      .min(4, { message: "Masukan Email" })
      .email("Email Tidak Valid"),
    password: z
      .string()
      .min(8, { message: "Minimal 8 Karakter" })
      .nonempty()
      .max(20, { message: "Maksimal 20 Karaketer" }),
  });
  type ValidationSchema = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();
  const [typeInput, setTypeInput] = useState<string>("password");
  const [pageRegister, setPageRegister] = useState<boolean>(false);
  const [textRegister, setTextRegister] = useState<boolean>(true);
  const [visible, setVisible] = useState<boolean>(false);
  const [scale, setScale] = useState<number>(1);
  const goToRegister = () => {
    setScale(0);
    setTextRegister(false);
    setTimeout(() => {
      setScale(5);
    }, 1000);
    setTimeout(() => {
      setVisible(true);
    }, 2000);
  };
  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    if(!pageRegister) {
      try {
        const respponse: RegisterResponse = await authSerive.Register(data);
        if (respponse.code === HttpStatusCode.Created) {
          setPageRegister(true);
          reset();
          toast.success(respponse.data.message ,{
            position : toast.POSITION.TOP_RIGHT,
            pauseOnHover : true,
            progress : 0,
         })
          
        }
  
      } catch (error) {
        toast.error(error as string ,{
           position : toast.POSITION.TOP_RIGHT,
           pauseOnHover : true,
           progress : 0,
        })
      }
    }
    try {
      const respponse: LoginResponse = await authSerive.Login(data);
      console.log(respponse.data.message)
      if (respponse.code === HttpStatusCode.Ok) {
        reset();
        toast.success(respponse.data.message ,{
          position : toast.POSITION.TOP_RIGHT,
          pauseOnHover : true,
          progress : 0,
       })
        
      }

    } catch (error) {
      toast.error(error as string ,{
         position : toast.POSITION.TOP_RIGHT,
         pauseOnHover : true,
         progress : 0,
      })
    }
   
  };
  return (
    <>
      <div
        className={`${
          visible ? "hidden" : "block"
        } w-screen h-screen bg-[#8BC5D9] flex items-center justify-center z-10`}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: scale }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{
            duration: 1,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="w-[400px] h-[400px] bg-white rounded-full relative"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={goToRegister}
            className="absolute bottom-[50%] left-[27%]   text-2xl font-light cursor-pointer transition-all"
          >
            {!textRegister ? "" : "Go to register "}
          </motion.button>
        </motion.div>
      </div>
      <motion.div className={`${visible ? "block" : "hidden"}`}>
        <section className="flex flex-col w-screen h-screen md:flex-row">
          <motion.div
            initial={{ translateX: 0 }}
            animate={{ translateX: pageRegister ? "70%" : 0 }}
            transition={{
              duration: 1,
              delay: 0.5,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            className="hidden md:flex "
            style={{ flexBasis: "60%" }}
          >
            <Image src={Logo} alt="Image-Main" className="object-cover" />
          </motion.div>

          <motion.div
            initial={{ translateX: 0 }}
            animate={{ translateX: pageRegister ? "-110vh" : 0 }}
            transition={{
              duration: 1,
              delay: 0.5,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            className="flex basis-[40%]"
          >
            <div className="flex items-center justify-center w-full">
              <div className="w-3/4 h-full px-5 pt-12 shadow-md md:h-2/3">
                <div>
                  <h1 className="mt-8 text-2xl font-semibold text-[#252525]">
                    Get`s Started.
                  </h1>
                  <h2
                    onClick={() => setPageRegister((prev) => !prev)}
                    className="pt-2 text-xs text-slate-500"
                  >
                    {!pageRegister
                      ? "Already have an Account?"
                      : "Not Have Account?"}{" "}
                    <span className="text-blue-400 underline">
                      {!pageRegister ? "Log in" : "Register"}
                    </span>
                  </h2>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center w-1/2 gap-2 px-4 py-2 border-2 rounded-md border-slate-300">
                    <h1 className="text-xl font-bold">
                      <FcGoogle />
                    </h1>
                    <p className="text-xs font-bold">
                      {pageRegister ? "Sign In" : "SignUp"} With Google
                    </p>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 border-2 rounded-md bg-[#039BE5]    ">
                    <h1 className="text-xl font-bold text-white">
                      <BiLogoFacebook />
                    </h1>
                    <p className="text-xs font-bold text-white">
                      {pageRegister ? "Sign In" : "Sign Up"} With Facebook
                    </p>
                  </div>
                </div>
                <div className="flex flex-row items-center w-full mt-4">
                  <hr className="w-1/2" />
                  <p className="px-2 text-slate-400">or</p>
                  <hr className="w-1/2" />
                </div>
                <div className="flex flex-col w-full mt-4">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="relative flex flex-col">
                      <label htmlFor="username" className="text-sm font-light">
                        Email Adress
                      </label>
                      <AiOutlineMail className="absolute bottom-3 left-2" />
                      <input
                        {...register("username")}
                        name="username"
                        placeholder="Type Your Email"
                        className={`w-full px-2 py-2 mt-2 border-2 rounded-md  text-md placeholder:text-gray-500 pl-[30px] text-sm${
                          errors.username
                            ? "border-red-500"
                            : "border-slate-200"
                        } `}
                      />
                      {errors.username && (
                        <span className="text-sm text-red-500">
                          {errors.username.message}
                        </span>
                      )}
                    </div>
                    <div className="relative flex flex-col mt-4">
                      <label htmlFor="password" className="text-sm font-light">
                        Password
                      </label>
                      <AiFillLock className="absolute bottom-3 left-2" />
                      <input
                        type={typeInput}
                        {...register("password")}
                        placeholder="Type Your Password"
                        className="w-full px-2 py-2 mt-2 border-2 rounded-md border-slate-200 text-md placeholder:text-gray-500 pl-[30px] text-sm"
                      />
                      {errors.password && (
                        <span className="text-sm text-red-500">
                          {errors.password.message}
                        </span>
                      )}
                    </div>
                    <div className="mt-5">
                      <button
                        className="flex items-center justify-center w-full text-center bg-[#8BC5D9] px-2 py-2 text-white font-semibold rounded-md"
                        type="submit"
                      >
                        {!pageRegister ? "Register" : "Login"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </motion.div>
      <ToastContainer/>
    </>
  );
}
