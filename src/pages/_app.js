import "@/styles/globals.css";
import { useState,useEffect } from "react";
import Loader from "@/components/loader";

export default function App({ Component, pageProps }) {
   const [loading, setLoading] = useState(true);

   useEffect(() => {
     const timer = setTimeout(() => {
       setLoading(false);
     }, 2000); // Simulate a loading delay

     return () => clearTimeout(timer);
   }, []);

   if (loading) {
     return <Loader />;
   }

  return <Component {...pageProps} />;
}
